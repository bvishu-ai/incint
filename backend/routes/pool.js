const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgresql",
  password: "vishal",
  port: 5432,
});

// Handle shutdown event
const gracefulShutdown = () => {
  console.log('Server is shutting down...');
  
  // Perform cleanup operation (delete appointments data)
  pool.query('DELETE FROM appointments', (err, result) => {
    if (err) {
      console.error('Error deleting appointments:', err);
    } else {
      console.log('All appointments deleted successfully');
      process.exit(0); // Exit the process after cleanup
    }
  });
};
// Listen for Ctrl+C (SIGINT) event
process.on('SIGINT', gracefulShutdown);

module.exports = pool;
