const { DataTypes, Model } = require("sequelize");

class Contact extends Model {
    static associate(models) { }
}

module.exports = (sequelize) => {
    Contact.init(
        {
            contact_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "contact_id",
            },

            fullname: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "fullname",
            },

            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "email",
            },

            phone_number: {
                type: DataTypes.STRING(20),
                allowNull: true,
                field: "phone_number",
            },

            message: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: "message",
            },
        },
        {
            sequelize,
            tableName: "contact",
            timestamps: false,
        },
    );

    return Contact;
};