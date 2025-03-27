// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const myroutes = require('./Routes/authroutes.js')
const fs = require('fs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATING APPLICATION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADDING APPLICATION REQUIRMENT / DEPENDNCY 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ✅ Serve static files with caching and set headers for PNGs
app.use(express.static("public", {
  maxAge: "1y",
  immutable: true
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'docs'))); // this is not working 

app.use(express.static(path.join(__dirname, 'public')));

module.exports.filepath = path.join(__dirname, 'docs');

app.use(myroutes);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE AND IMPORTANT FUNCTION FOR API'S
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MIDDLEWARE FOR TOKEN AUTHENTICATION 
module.exports.authenticateToken = (req, res, next) => {
  const token = req.headers.Authorization
  if (token !== "abc123") {
    res.redirect("/login")
    return;
  }
  next();
}

// FUNCTION FOR GENERATE TOKEN
module.exports.generateToken = (name) => {
  const payload = {
    username: name
  };
  const secretKey = 'q2w5e';

  const token = jwt.sign(payload, secretKey);
  return token;
}

// ERROR HANDLING FUNCTION
module.exports.handleError = (res, error) => {
  console.log("error", error);
  if (error.code === 'ER_DUP_ENTRY') {
    const duplicateValue = error.sqlMessage.match(/'([^']+)'/)[1];
    return res.status(422).json({
      status_code: 422,
      status: false,
      message: `${duplicateValue} Is Already Registered`,
    });
  }
  const errorMessage = error.message || "Internal Server Error";
  const statusCode = error.statusCode || 501;
  return res.status(statusCode).json({
    status_code: statusCode,
    status: false,
    message: errorMessage,
  });
}

// FUNCTION FOR ENCRYPT A PASSWORD
module.exports.hashmypassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt)
  return hashpassword;
}

// FUNCTION WHICH CHAKE DATA IS A JSON OR NOT 
module.exports.isValidJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return false;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

port = 1000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


