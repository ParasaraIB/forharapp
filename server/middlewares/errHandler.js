"use strict";

function errHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = statusCode !== 500 ? err.message : "Internal server error";
  res.status(statusCode).json({message});
}

module.exports = errHandler;