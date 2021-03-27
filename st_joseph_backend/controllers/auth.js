const Student = require("../models/student");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

//SIGNUP THE USER/ADMIN
exports.signup = (req, res) => {
  const errors = validationResult(req);

  //CHECKING ANY ERRORS IN SUBMITTED FORM
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //DESTRUCTURING TO CHECK DUPLICATION
  const { RegisterNumber, RollNumber, PrimaryEmailID } = req.body;

  //CHECKING FOR DUPLICATION
  Student.findOne({ RegisterNumber }, (err, user) => {
    if (err || user) {
      return res.status(406).json({
        error: "Register Number already exists",
      });
    }
    Student.findOne({ RollNumber }, (err, user) => {
      if (err || user) {
        return res.status(406).json({
          error: "Roll Number already exists",
        });
      }
      Student.findOne({ PrimaryEmailID }, (err, user) => {
        if (err || user) {
          return res.status(406).json({
            error: "Email ID already exists",
          });
        }

        //SAVING IN DB OCCURS HERE
        const signup = new Student(req.body);
        signup.save((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "NOT able to save user in DB",
            });
          }

          //SENDING RESPONSE BACK TO FRONTEND
          res.json({
            RegisterNumber: user.RegisterNumber,
            RollNumber: user.RollNumber,
            PrimaryEmailID: user.email,
            YearOfAdmission: user.YearOfAdmission,
            _id: user._id,
          });
        });
      });
    });
  });
};

//SIGNIN THE USER/ADMIN
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { PrimaryEmailID, password } = req.body;

  //CHECKING FOR ERRORS
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //FINDING THE USER IN DB
  Student.findOne({ PrimaryEmailID }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User doesn't exists",
      });
    }

    //authenticate method is declared in models => signup
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, PrimaryEmailID, role, RegisterNumber, YearOfAdmission } = user;
    return res.json({
      token,
      student: { _id, PrimaryEmailID, role, RegisterNumber, YearOfAdmission },
    });
  });
};

//LOGOUT THE USER/ADMIN
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

//CHECK ADMIN OR NOT
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({
      error: "You are not an ADMIN",
    });
  }
  next();
};
