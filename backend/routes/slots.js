var express = require("express");
var router = express.Router();

var pool = require("./pool");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/doctors", function (req, res) {
  const data = req.body;
  console.log(data);
  query = `SELECT doctorname FROM availableslots WHERE department=$1 AND appointmenttype=$2 AND (proceduretype = $3 OR proceduretype IS NULL)`;
  
  // Prepare the values array based on the data
    const values = [
      data.department,
      data.appointmentType,
      data.selectedProcedure
    ];
  
  // Example database query to retrieve doctors
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      res.status(500).json({ error: 'Error fetching doctors' });
    } else {
      const docs = result.rows; // Assuming the query returns slots data
	  console.log('Rows:', result.rows);
      // Now, send the slots data in the response
      res.status(200).json({ docs });
    }
  });
});

router.post("/times", function (req, res) {
  const data = req.body;
  console.log(data);
  query = `SELECT timeslot FROM availableslots WHERE department=$1 AND appointmenttype=$2 AND (proceduretype = $3 OR proceduretype IS NULL) AND doctorname = $4`;
  
  // Prepare the values array based on the data
    const values = [
      data.department,
      data.appointmentType,
      data.selectedProcedure,
	  data.selectedDoctor
    ];
  
  // Example database query to retrieve slots for a specific doctor
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error fetching slots:', err);
      res.status(500).json({ error: 'Error fetching slots' });
    } else {
      const slots = result.rows; // Assuming the query returns slots data
	  console.log('Rows:', result.rows);
      // Now, send the slots data in the response
      res.status(200).json({ slots });
    }
  });
});

module.exports = router;
