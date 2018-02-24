const request = require('request');
const http = require('http');
const fs = require('fs');

const apiConfig = require('../config/api');

const AirService = require('../services/AirService');

/**
 * GET /api/air
 * Get the air info
 */
exports.getAir = (request, response) => {
  return AirService.listAllStations()
    .then((names) => response.json(names))
    .catch(err => response.status(501).send());
};

/**
 * POST /api/air
 * Set the air info
 */
exports.setAir = (request, response) => {
    var airInfo = request.body;
    if (!airInfo) {
      response.status(400).send(`Body is not provided`);
    }

    return AirService.setAir(airInfo)
      .then(_ => response.send("Inserted"))
      .catch(err => {
        console.log('[mydb.insert] ', err.message);
        response.status(501).send('[mydb.insert] ' + err.message);
      });
};