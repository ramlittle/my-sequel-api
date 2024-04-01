const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const server  = express();
const port = process.env.PORT || 8080;
const path = require('path');

// Middlewares
server.use( morgan('tiny') );
server.use( cors() );
server.use( bodyParser.json() );
server.use( helmet() );

// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));
// server.use('/', express.static(path.join(__dirname, '/public')));// folder to upload files

global.__basedir = __dirname; // very important to define base directory of the project. this is useful while creating upload scripts

// Routes

const ActivityRouter = require('./routes/activityRoute.js');
const EmployeeRouter = require('./routes/employeeRoute.js');

server.get('/', ( request, response ) => {
    response.send(`Welcome to Uplifting API`);
});


// endpoints
server.use('/api/v1/activity', ActivityRouter );
server.use('/api/v1/employee', EmployeeRouter );

//404 error if unable to find a page or route
server.get('*', function (req, res) {
	res.status(404).json({
		message: 'Sorry page not found?? 🙅',
	});
});

//An error handling middleware
server.use((err, req, res, next) => {
	console.log('🐞 Error Handler');

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		err: err,
	});
});

server.listen(port, () => {
        console.log(`Server running on port ${ port }`);
    }
);
