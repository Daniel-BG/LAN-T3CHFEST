var express = require("express");
var app = express();
var bodyParser = require('body-parser')

// ## Controllers ##
const schoolController = require('./controllers/SchoolController');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//////////////////////////
// ## School Controller ##
//////////////////////////

/* Endpoint to greet and add a new pre-school to database.
* Send a POST request to localhost:3000/api/school/preschool with body
* {
* 	"name": "Bob"
* }
*/
app.post("/api/school/pre", schoolController.setPreSchool);

/**
 * Endpoint to get a JSON array of all the visitors in the database
 * REST API example:
 * <code>
 * GET http://localhost:3000/api/school/preschool
 * </code>
 *
 * Response:
 * [ "Bob", "Jane" ]
 * @return An array of all the visitor names
 */
app.get("/api/school/pre", schoolController.getPreSchools);

/* Endpoint to greet and add a new pre-school to database.
* Send a POST request to localhost:3000/api/school/preschool with body
* {
* 	"name": "Bob"
* }
*/
app.post("/api/school/primary", schoolController.setPrimarySchool);

/**
 * Endpoint to get a JSON array of all the visitors in the database
 * REST API example:
 * <code>
 * GET http://localhost:3000/api/school/preschool
 * </code>
 *
 * Response:
 * [ "Bob", "Jane" ]
 * @return An array of all the visitor names
 */
app.get("/api/school/primary", schoolController.getPrimarySchools);


//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/../src'));



var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
