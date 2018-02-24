const request = require('request');
const http = require('http');
const fs = require('fs');

const apiConfig = require('../config/api');

const SchoolService = require('../services/SchoolService');

/**
 * GET /api/school/pre
 * Get pre schools
 */
exports.getPreSchools = (request, response) => {
  return SchoolService.listAllPreSchools()
    .then((names) => response.json(names))
    .catch(err => response.status(501).send());
};

/**
 * POST /api/school/pre
 * Set a pre school
 */
exports.setPreSchool = (request, response) => {
    var body = request.body;
    if (!body) {
      response.status(400).send(`Body must be provided`);
    }

    return SchoolService.setPreSchool(body)
      .then(_ => response.send())
      .catch(err => {
        console.log('[mydb.insert] ', err.message);
        response.status(501).send('[mydb.insert] ' + err.message);
      });
};


/**
 * GET /api/school/primary
 * Get pre schools
 */
exports.getPrimarySchools = (request, response) => {
  return SchoolService.listAllPrimarySchools()
    .then((names) => response.json(names))
    .catch(err => response.status(501).send());
};

/**
 * POST /api/school/primary
 * Set a pre school
 */
exports.setPrimarySchool = (request, response) => {
    var body = request.body;
    if (!body) {
      response.status(400).send(`Body must be provided`);
    }

    return SchoolService.setPrimarySchool(body)
      .then(_ => response.send())
      .catch(err => {
        console.log('[mydb.insert] ', err.message);
        response.status(501).send('[mydb.insert] ' + err.message);
      });
};