
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");

// connect to database
mongoose.connect(
    "mongodb://localhost:27017/management",
    { 
      useCreateIndex: true,
      useNewUrlParser: true, 
      useUnifiedTopology:true
    }
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const providers = require("./routes/api/v1/providers");
const clients = require("./routes/api/v1/clients");

app.use("/api/providers", providers);
app.use("/api/clients", clients);

// Handle 
if (process.env.NODE_ENV === 'production') {
  const publicFolder = __dirname + '/public/'
  
  app.use(express.static(publicFolder));

  app.get(/.*/, (req, res) => res.sendFile(publicFolder + 'index.html'));
}

app.use((req, res, next) => {
  const error = new Error("Method not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));