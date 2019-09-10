//db postgresql
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('nodeapp', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres'
});
