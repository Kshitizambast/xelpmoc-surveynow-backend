const sequelize = require("../database");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const uuid = require("uuid");
const validation = require("../validation/surveyerValidation");

// import { generateToken } from '../utils/jwtUtils'

const generateToken = require("../utils/jwtUtils").generateToken;

module.exports = {
  surveyerController: async (req, res) => {
    res.send("surveyerController");
  },
  surveyerCreate: async (req, res) => {
    const { name, email, password, phone } = req.body;
    const { error, isValid } = validation.surveyerSignupValidation(
      email,
      phone,
      name,
      password
    );
    if (!isValid) {
     
      return res.status(400).json({
        error,
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const _uuid = uuid.v4();

    await sequelize.models.Surveyer.findOne({ where: { email } })
      .then(async (surveyer) => {
        if (surveyer) {
          res.status(400).send({
            error: "Email already exists",
          });
        } else {
          await sequelize.models.Surveyer.create({
            uuid: _uuid,
            name,
            email,
            phone,
            password: hash,
          })
            .then((surveyer) => {
              res.status(200).json(surveyer);
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  surveyerLogin: async (req, res) => {
    const { email, password } = req.body;

    const { error, isValid } = validation.surveyerLoginValidation(
      email,
      password
    );
    if (!isValid) {
      
      return res.status(400).json({
        error,
      });
    }

    await sequelize.models.Surveyer.findOne({ where: { email } })
      .then((surveyer) => {
        if (surveyer) {
          if (bcrypt.compareSync(password, surveyer.password)) {
            const token = generateToken(surveyer);
            res.status(200).json({
              token,
            });
          } else {
            res.status(400).json({
              error: "Invalid password",
            });
          }
        } else {
          res.status(400).json({
            error: "Record not found",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  surveyerLogout: async (req, res) => {

    res.status(200).json({
      message: "Logged out successfully",
    });
  }
};
