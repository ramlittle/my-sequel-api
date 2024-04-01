const { Employee } = require('../db.js');

// CREATE YOUR CRUD HERE

const createEmployee = async (request, response) => {
    try {
        const result = await Employee.create({ ...request.body });
        response.status(201).json({ message: "hooray created", result });
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const readAllEmployees = async (request, response) => {
    try {
        const results = await Employee.findAll()
        response.status(200).json({ message: "showing all Employee success", results });
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const readEmployee = async (request, response) => {
    try {
        const {employee_id}=request.params;
        const queryString={ where: { employee_id: employee_id } };
        const results = await Employee.findOne(queryString);
        if (!results) {
            throw new Error(`No item found`)
        }
        response.status(200).json({ message: "showing one record employee", results });        
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const updateEmployee = async (request, response) => {
    const { employee_id } = request.params;
    const condition = {
      where: {
        employee_id: employee_id,
      },
    };
    const queryString = {
      ...request.body,
      employee_id: employee_id
    };
  
    try {
      const results = await Employee.update(queryString, condition)
      await response.status(200).send(results);
    } catch (error) {
      response.status(500).send({ message: 'Updating failed', error: error });
    }
}

const deleteEmployee=async (request,response)=>{
    try {
        const {employee_id}=request.params;
        const queryString={ where: { employee_id: employee_id } };
        const results = await Employee.destroy(queryString);
        if (!results) {
            throw new Error(`No item found`)
        }
        response.status(200).json({ message: "deleted one record", results });        
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const permanentDeleteEmployee=async (request,response)=>{
    try {
        const {employee_id}=request.params;
        const queryString={ where: { employee_id: employee_id }, force: true };
        const results = await Employee.destroy(queryString);
        if (!results) {
            throw new Error(`No item found`)
        }
        response.status(200).json({ message: "permanently deleted one record", results });        
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const restoreEmployee=async (request,response)=>{
    try {
        const {employee_id}=request.params;
        const queryString={ where: { employee_id: employee_id } };
        const results = await Employee.restore(queryString);
        if (!results) {
            throw new Error(`No item found`)
        }
        response.status(200).json({ message: "restored one record", results });        
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

module.exports = {
    createEmployee,
    readAllEmployees,
    readEmployee,
    updateEmployee,
    restoreEmployee,
    permanentDeleteEmployee,
    deleteEmployee
}