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
  response.json([
    {
      name: "Cole 1",
      info: "Este cole es guay",
      lat: 40.416247,
      lng: -3.725031
    },
    {
      name: "Cole 2",
      info: "Este cole no es tan guay",
      lat: 40.413241,
      lng: -3.697736
    }
  ]);
  // return SchoolService.listAllPreSchools()
  //   .then((names) => response.json(names))
  //   .catch(err => response.status(501).send());
};

/**
 * POST /api/school/pre
 * Set a pre school
 */
exports.setPreSchool = (request, response) => {
    var userName = request.body.name;
    if (!userName) {
      response.status(400).send(`Name must be provided`);
    }

    return SchoolService.setPreSchool(userName)
      .then(_ => response.send("Hello " + userName + "! I added you to the database."))
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
    var userName = request.body.name;
    if (!userName) {
      response.status(400).send(`Name must be provided`);
    }

    return SchoolService.setPrimarySchool(userName)
      .then(_ => response.send("Hello " + userName + "! I added you to the database."))
      .catch(err => {
        console.log('[mydb.insert] ', err.message);
        response.status(501).send('[mydb.insert] ' + err.message);
      });
};