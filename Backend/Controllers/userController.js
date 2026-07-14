const userService = require("../Services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../Models/index");

const { RefreshToken, Customer, Employee } = db;

const ACCESS_TOKEN_TIME = "30m";
const ACCESS_COOKIE_TIME =30 * 60 * 1000;
const isProduction = process.env.NODE_ENV === "production";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
     
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const roles = user.Roles ? user.Roles.map(r => r.role_name) : [];
        
        const customer = Customer ? await Customer.findOne({ where: { user_id: user.user_id } }) : null;
        const employee = Employee ? await Employee.findOne({ where: { user_id: user.user_id } }) : null;

        const accessToken = jwt.sign(
            { user_id: user.user_id, email: user.email, roles },
            process.env.JWT_SECRET,
            { expiresIn: ACCESS_TOKEN_TIME }
        );

        const refreshToken = jwt.sign(
            { user_id: user.user_id }, 
            process.env.REFRESH_SECRET, 
            { expiresIn: "1d" }
        );

        if (RefreshToken) {
            await RefreshToken.create({
                user_id: user.user_id,
                token: refreshToken,
                expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
        }

        res.cookie("token", accessToken, { 
            httpOnly: true, 
            secure: isProduction, 
            sameSite: "lax", 
            path: "/", 
            maxAge: ACCESS_COOKIE_TIME 
        });
        
        res.cookie("refreshToken", refreshToken, { 
            httpOnly: true, 
            secure: isProduction, 
            sameSite: "lax", 
            path: "/", 
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.json({ 
            message: "Login successful", 
            user: {
                user_id: user.user_id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                roles,
                isCustomer: !!customer,
                isEmployee: !!employee
            } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const signup = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const result = await userService.createUser(first_name, last_name, email, hashedPassword);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (token && RefreshToken) {
            await RefreshToken.update({ revoked: new Date() }, { where: { token } });
        }
        res.clearCookie("token", { httpOnly: true, secure: isProduction, sameSite: "lax", path: "/" });
        res.clearCookie("refreshToken", { httpOnly: true, secure: isProduction, sameSite: "lax", path: "/" });
        res.json({ message: "Logged out" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ error: "No refresh token" });
        }
        
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const storedToken = await RefreshToken.findOne({ where: { token } });
     
        if (!storedToken || storedToken.revoked) {
            return res.status(403).json({ error: "Invalid or revoked refresh token" });
        }
const user = await userService.findUserById(decoded.user_id);

        if (!user) {
            return res.status(403).json({ error: "User not found" });
        }

        await storedToken.update({ revoked: new Date() });

        const roles = user.Roles ? user.Roles.map(r => r.role_name) : [];

        const accessToken = jwt.sign(
            { user_id: user.user_id, email: user.email, roles },
            process.env.JWT_SECRET,
            { expiresIn: ACCESS_TOKEN_TIME }
        );

        const newRefreshToken = jwt.sign(
            { user_id: user.user_id },
            process.env.REFRESH_SECRET,
            { expiresIn: "1d" }
        );

        await RefreshToken.create({
            user_id: user.user_id,
            token: newRefreshToken,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        res.cookie("token", accessToken, { httpOnly: true, secure: isProduction, sameSite: "lax", path: "/", maxAge: ACCESS_COOKIE_TIME });
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: isProduction, sameSite: "lax", path: "/", maxAge: 24 * 60 * 60 * 1000 });

        return res.json({ message: "Token refreshed successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Refresh failed" });
    }
};

const getAllUsers = async (req, res) => { try { res.json(await userService.getAllUsers()); } catch (err) { res.status(500).json({ error: err.message }); } };
const getUserById = async (req, res) => { try { res.json(await userService.findUserById(req.params.id)); } catch (err) { res.status(500).json({ error: err.message }); } };
const updateUser = async (req, res) => { try { res.json(await userService.updateUser(req.params.id, req.body)); } catch (err) { res.status(500).json({ error: err.message }); } };
const deleteUser = async (req, res) => { try { res.json(await userService.deleteUser(req.params.id)); } catch (err) { res.status(500).json({ error: err.message }); } };
const getMe = async (req, res) => {
    try {
        const user = await userService.findUserById(req.user.user_id);
        res.json(user); 
    } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = { login, signup, getAllUsers, getUserById, updateUser, deleteUser, logout, refresh, getMe };