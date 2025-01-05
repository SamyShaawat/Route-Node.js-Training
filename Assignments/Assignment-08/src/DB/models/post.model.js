import { DataTypes, Sequelize, Model } from "sequelize";
import { sequelize } from "../connectionDB.js";

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
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
        sequelize,
        modelName: "posts",
        paranoid: true,
        timestamps: true,
    }
);

export default Post;