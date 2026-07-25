require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/database");


const path = require("path");
const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
const webhookRoute = require("./Routes/webhookRoute");
app.use("/api/webhook", webhookRoute);

app.use(express.json());
app.use(cookieParser());

sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));


const userRoutes = require("./Routes/userRouter"); 
app.use("/api/users", userRoutes);
const reminderRoutes = require("./Routes/reminderRoute"); 
app.use("/api/reminders", reminderRoutes);
const contactRouter = require("./Routes/contactRouter"); 
app.use("/api/contacts", contactRouter);
const employeeRoutes = require("./Routes/employeeRouter"); 
app.use("/api/employees", employeeRoutes);
const categoryRoutes = require("./Routes/categoriesRouter"); 
app.use("/api/categories", categoryRoutes);


const supplierRouter = require("./Routes/supplierRouter"); 
app.use("/api/suppliers", supplierRouter);

const workRputer = require("./Routes/workScheduleRouter"); 
app.use("/api/work-Schedules", workRputer);


const revRoutes = require("./Routes/reviewRouter"); 
app.use("/api/reviews", revRoutes);

const product = require("./Routes/productRouter"); 
app.use("/api/products", product);

const discounts = require("./Routes/discountRoute"); 
app.use("/api/discounts", discounts);

const favorite = require("./Routes/FavoriteRouter"); 
app.use("/api/favorites", favorite);

const cart = require("./Routes/cartRoute"); 
app.use("/api/cart", cart);

const orderRoutes = require("./Routes/orderRouter");
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});