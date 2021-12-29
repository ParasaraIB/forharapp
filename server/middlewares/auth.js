"use strict";

const jwt = require("jsonwebtoken");
const { Pic } = require("../models");

async function authentication(req, res, next) {
  try {
    const {access_token} = req.headers;
    const picData = jwt.verify(access_token, process.env.FORHAR_SECRET);
    console.log(picData, "<<<< this is picData");

    const pic = await Pic.findOne({email: picData.email});
    if (pic) {
      req.payload = picData;
      next();
    } else {
      throw {message: "Pic is not authenticated", statusCode: 401};
    }
  } catch (err) {
    console.error(err, "<<<< error in authentication");
    return next(err);
  }
}

module.exports = authentication;