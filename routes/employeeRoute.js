const express = require('express');
const router = express.Router();
const {
    createEmployee,
    readAllEmployees,
    readEmployee,
    updateEmployee,
    restoreEmployee,
    permanentDeleteEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

router.get('/', readAllEmployees);
router.post('/create/', createEmployee);

router.get('/:employee_id', readEmployee);

router.put('/update/:employee_id', updateEmployee);
router.delete('/delete/:employee_id', deleteEmployee);
router.delete('/restore/:employee_id', restoreEmployee);
router.delete('/perma/delete/:employee_id', permanentDeleteEmployee);

module.exports = router;