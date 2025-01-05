import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("node", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 4306
})

export const checkConnectionDB = () => {
  sequelize.authenticate().then(() => {
    console.log("Authentication  successful for database connection");

  }).catch(err => {
    console.log('Authentication failed for database connection', err);

  });
}

export const checkSyncDB = () => {
  sequelize.sync({ alter: false, force: false }).then(() => {
    console.log("sync  successful for database connection");

  }).catch(err => {
    console.log('sync failed for database connection', err);

  });
}