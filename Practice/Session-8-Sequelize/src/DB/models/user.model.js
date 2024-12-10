import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../connectionDB.js";


const userModel = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 8]
        }
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            checkName() {
                if (this.lName == 'ayman') {
                    throw new Error(" invalid ayman")
                }
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Please enter your email address",
        validate: {
            isEmail: true
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 18,
            max: 60
        }
    },
    gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    timestamps: true,
    // freezeTableName:true,
    // tableName:"blh"
})


export default userModel