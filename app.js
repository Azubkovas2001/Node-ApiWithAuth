const express = require("express");
const configureRoutes = require("./routes.js");
const app = express();

configureRoutes(app);
const port = 3000;
app.listen(port, () => console.log(`Application started on port: ${port}`));
