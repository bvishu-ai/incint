var express = require("express");
var router = express.Router();

var pool = require("./pool");

router.post("/save", function (req, res) {
  try {
    const data = req.body; // Assuming the data is sent in the request body
	console.log(data);
    // Construct the SQL query based on the data
    const query = `
      INSERT INTO appointments (department, appointment_date, appointment_type, selected_procedure, doctor_name, slot_timing)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    // Prepare the values array based on the data
    const values = [
      data.department,
      data.appointmentDate,
      data.appointmentType,
      data.selectedProcedure,
      data.doctorName,
      data.slotTiming,
    ];

    pool
      .query(query, values)
      .then(result => {
        res.status(200).json({
          message: "Data saved successfully",
          insertedRowCount: result.rowCount,
        });
      })
      .catch(err => {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;