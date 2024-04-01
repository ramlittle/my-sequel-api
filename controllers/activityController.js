const { Activity } = require('../db.js');
const {Sequelize}=require('@sequelize/core') 
// CREATE YOUR CRUD HERE

const createActivity = async (request, response) => {
    try {
        const result = await Activity.create({ ...request.body });
        response.status(201).json({ message: "hooray created", result });
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const readAllActivities = async (request, response) => {
    try {
        const results = await Activity.findAll()
        response.status(200).json({ message: "showing all Activity success", results });
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const readActivity = async (request, response) => {
    try {
        const {activity_id}=request.params;
        const queryString={ where: { activity_id: activity_id } };
        const results = await Activity.findOne(queryString);
        if (!results) {
            throw new Error(`No item found`)
        }
        response.status(200).json({ message: "showing one record Activity", results });        
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const readActivityByEmployeeId=async (request, response) => {
    try {
        const {employee_id}=request.params;
        const queryString={ where: { employee_id: employee_id } };
        const results = await Activity.findAll(queryString);
        if (!results) {
            throw new Error(`No item found`)
        }
        response.status(200).json({ message: "showing one record Activity", results });        
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const readRawActivityByEmployeeId=async (request, response) => {
    try {
        const {employee_id}=request.params;
        const results = await Activity.sequelize.query(`
            SELECT *
            FROM activity
            WHERE employee_id = :fk_employee_id;
        `,
        {replacements: {
            fk_employee_id: employee_id
        },
        type: Sequelize.QueryTypes.SELECT
    }) 
        if (!results) {
            throw new Error(`No item found`)
        }
        await response.status(200).json({ message: "showing one record Activity", results });        
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const updateActivity = async (request, response) => {
    const { activity_id } = request.params;
    const condition = {
      where: {
        activity_id: activity_id,
      },
    };
    const queryString = {
      ...request.body,
      activity_id: activity_id
    };
  
    try {
      const results = await Activity.update(queryString, condition)
      await response.status(200).send(results);
    } catch (error) {
      response.status(500).send({ message: 'Updating failed', error: error });
    }
}

const deleteActivity=async (request,response)=>{
    try {
        const {activity_id}=request.params;
        const queryString={ where: { activity_id: activity_id } };
        const results = await Activity.destroy(queryString);
        if (!results) {
            throw new Error(`No item found`)
        }
        response.status(200).json({ message: "deleted one record", results });        
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const permanentDeleteActivity=async (request,response)=>{
    try {
        const {activity_id}=request.params;
        const queryString={ where: { activity_id: activity_id }, force: true };
        const results = await Activity.destroy(queryString);
        if (!results) {
            throw new Error(`No item found`)
        }
        response.status(200).json({ message: "permanently deleted one record", results });        
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const restoreActivity=async (request,response)=>{
    try {
        const {activity_id}=request.params;
        const queryString={ where: { activity_id: activity_id } };
        const results = await Activity.restore(queryString);
        if (!results) {
            throw new Error(`No item found`)
        }
        response.status(200).json({ message: "restored one record", results });        
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

module.exports = {
    createActivity,
    readAllActivities,
    readActivity,
    updateActivity,
    restoreActivity,
    permanentDeleteActivity,
    deleteActivity,
    readActivityByEmployeeId,
    readRawActivityByEmployeeId
}