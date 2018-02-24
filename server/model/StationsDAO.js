
const dbName = 'stations';
const vCAPLocal = require('./VCAPLocal');

const mydb = vCAPLocal.getCloudant().db.use(dbName);

exports.getStations = () => {
    return new Promise((resolve, reject) => {
        var names = [];
        if(!mydb) {
            resolve(names);
        }
        mydb.list({ include_docs: true }, function(err, body) {
            if (!err) {
                body.rows.forEach(function(row) {
                if(row.doc)
                    names.push(row.doc);
                });
                resolve(names);
            } else {
                reject(err);
            }
        });
    });
};

exports.setStation = (info) => {
    return new Promise((resolve, reject) => {
        if(!mydb) {
            console.log("No database.");
            throw new Error(`Database is not connected`);
        }
        // insert the username as a document
        mydb.insert(info, function(err, body, header) {
        if (err) {
            return reject();
        }
        resolve();
        });
    });
};