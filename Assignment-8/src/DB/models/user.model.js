import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../connectionDB.js";


const userModel = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            checkPasswordLength(value) {
                if (value.length <= 6) {
                    throw new Error("Password must be longer than 6 characters.");
                }
            },
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
},
    {
        timestamps: true
    }
);

userModel.addHook("beforeCreate", (user) => {
    if (user.name.length <= 2) {
        throw new Error("Name must be longer than 2 characters.");
    }
});

export default userModel;
