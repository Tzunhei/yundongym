import Sequelize from 'sequelize';

const {
  DATABASE_USERNAME: username,
  DATABASE_PASSWORD: password,
} = process.env;

const sequelize = new Sequelize('yundongym', username, password, {
  host: 'localhost',
  dialect: 'postgres',
});

export { sequelize };
