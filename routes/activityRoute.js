const express = require('express');
const router = express.Router();
const {
    createActivity,
    readAllActivities,
    readActivity,
    updateActivity,
    restoreActivity,
    permanentDeleteActivity,
    deleteActivity,
    readActivityByEmployeeId,
    readRawActivityByEmployeeId,
    readAllDeletedActivities
} = require('../controllers/activityController');

router.get('/', readAllActivities);
router.get('/deleted/activities',readAllDeletedActivities)
router.post('/create/', createActivity);

router.get('/:activity_id', readActivity);
router.get('/employee/:employee_id', readActivityByEmployeeId);
router.get('/employee/raw/:employee_id',readRawActivityByEmployeeId)

router.put('/update/:activity_id', updateActivity);

router.delete('/delete/:activity_id', deleteActivity);
router.delete('/restore/:activity_id', restoreActivity);
router.delete('/perma/delete/:activity_id', permanentDeleteActivity);

module.exports = router;
