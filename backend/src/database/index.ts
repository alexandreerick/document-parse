import { Sequelize, Options } from 'sequelize';
const dbConfig = require('../config/database.js');

const connection = new Sequelize(dbConfig as Options);

export { connection };
