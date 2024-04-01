require('dotenv').config();
const { Sequelize } = require('@sequelize/core');

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql' /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
	}
);

(async () => {
	try {
		await sequelize.authenticate();
		console.log('💾 Database connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

// Create Models
const { EmployeeModel } = require('./models/Employee');
const { ActivityModel } = require('./models/Activity');

const Activity  = ActivityModel(sequelize);
const Employee = EmployeeModel(sequelize);

if (process.env.MIGRATE_DB == 'TRUE') {
	sequelize.sync().then(() => {
		console.log(`All tables synced!`);
	});
}

module.exports = {
	Activity,
	Employee,
};
