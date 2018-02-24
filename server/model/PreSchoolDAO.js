
const dbName = 'mydb';
const vCAPLocal = require('./VCAPLocal');

const mydb = vCAPLocal.getCloudant().db.use(dbName);

exports.getPreSchools = () => {
    return new Promise((resolve, reject) => {
        var names = [];
        if(!mydb) {
            resolve(names);
        }
        mydb.list({ include_docs: true }, function(err, body) {
            if (!err) {
                body.rows.forEach(function(row) {
                if(row.doc.name)
                    names.push(row.doc.name);
                });
                resolve(names);
            } else {
                reject(err);
            }
        });
    });
};

exports.setPreSchools = (name) => {
    return new Promise((resolve, reject) => {
        if(!mydb) {
            console.log("No database.");
            response.send();
            return "Hello " + name + "!";
        }
        // insert the username as a document
        mydb.insert({ "name" : name }, function(err, body, header) {
        if (err) {
            return reject();
        }
        resolve();
        });
    });
};