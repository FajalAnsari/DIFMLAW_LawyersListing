const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const emailRoutes = require("./routes/emailRoutes");

app.use(cors()); // Use this after the variable declaration

app.use(express.json()); // tell the server to accept the json data from frontend


//Signup and login
app.use("/email", emailRoutes);
app.use("/emails", emailRoutes);
app.use("/emailss", emailRoutes);
app.use("/emailsss", emailRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
