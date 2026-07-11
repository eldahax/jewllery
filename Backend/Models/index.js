const sequelize = require('../config/database');


const User = require('../Modules/user')(sequelize);
const Role = require('../Modules/Role')(sequelize);
const UserRole = require('../Modules/UserRole')(sequelize);
const RefreshToken = require('../Modules/RefreshToken')(sequelize);

const Employee = require('../Modules/Employee')(sequelize);
const Customer = require('../Modules/costumer')(sequelize);

const Supplier = require('../Modules/Supplier')(sequelize);

const Category = require('../Modules/Category')(sequelize);
const Product = require('../Modules/Product')(sequelize);
const ProductCategory = require('../Modules/ProductCategory')(sequelize);

const Collection = require('../Modules/Collection')(sequelize);
const CollectionItem = require('../Modules/CollectionItem')(sequelize);
const Discount = require('../Modules/discounts')(sequelize);

const Inventory = require('../Modules/Inventory')(sequelize);
const InventoryTransaction = require('../Modules/InventoryTransaction')(sequelize);

const Purchase = require('../Modules/Purchase')(sequelize);
const PurchaseItem = require('../Modules/PurchaseItem')(sequelize);
const CashRegisterSession = require('../Modules/CashRegisterSession')(sequelize);
const Sale = require('../Modules/Sale')(sequelize);
const SaleItem = require('../Modules/SaleItem')(sequelize);
const Payments = require('../Modules/payments')(sequelize);
const Return = require('../Modules/return')(sequelize);
const ReturnItem = require('../Modules/returnItem')(sequelize);
const Repair = require('../Modules/Repair')(sequelize);
const Review = require('../Modules/Reviews')(sequelize);
const Reminder = require('../Modules/reminder')(sequelize);

const Warranty = require('../Modules/Warranty')(sequelize);
const WorkSchedule = require('../Modules/workSchedule')(sequelize);

const Contact = require('../Modules/contact')(sequelize);

const Favorite = require('../Modules/Favorite')(sequelize);

const Cart = require('../Modules/cart')(sequelize);
const CartItem = require('../Modules/cartItem')(sequelize);

const Order = require('../Modules/order')(sequelize);
const OrderItem = require('../Modules/orderItem')(sequelize);



const db = {

    User,
    Role,
    UserRole,
    RefreshToken,
    Employee,
    Customer,
    Supplier,
    Category,
    Product,
    ProductCategory,
    Collection,
    CollectionItem,
    Discount,
    Inventory,
    InventoryTransaction,
    Purchase,
    PurchaseItem,
    CashRegisterSession,
    Sale,
    SaleItem,
    Payments,
    Return,
    ReturnItem,
    Repair,
    Warranty,
    WorkSchedule,
    Contact,
    Review,
    Reminder,
    Favorite,
    Cart,
    CartItem,
    Order,
    OrderItem,
    sequelize
};

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        try {
            db[modelName].associate(db);
         
        } catch (err) {
          
            console.error(err);
        }
    }
});
module.exports = db;