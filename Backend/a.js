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
const employeeRoutes = require("./Routes/employeeRouter"); 
app.use("/api/employees", employeeRoutes);
const categoryRoutes = require("./Routes/categoriesRouter"); 
app.use("/api/categories", categoryRoutes);

const supplierRouter = require("./Routes/supplierRouter"); 
app.use("/api/suppliers", supplierRouter);


const product = require("./Routes/productRouter"); 
app.use("/api/products", product);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});