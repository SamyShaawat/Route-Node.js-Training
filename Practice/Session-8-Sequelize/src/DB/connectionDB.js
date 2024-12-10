import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('c43sat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' 
});