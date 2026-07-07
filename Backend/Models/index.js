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
const Discount = require('../Modules/Discount')(sequelize);

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

const Warranty = require('../Modules/Warranty')(sequelize);



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
    Payment,
    Return,
    ReturnItem,
    Repair,
    Warranty,
    AuditLog,
    sequelize
};


Object.keys(db).forEach((modelName) => {

    if (db[modelName].associate) {
        db[modelName].associate(db);
    }

});


module.exports = db;