
const dbName = 'effects';
const vCAPLocal = require('./VCAPLocal');

const mydb = vCAPLocal.getCloudant().db.use(dbName);

const effectsData = [
		{
			"id": 9,
			"name": "PM25",
			"effects": [
				{"threshold": 10, "alert": "Partículas penetran el sistema respiratorio"},
				{"threshold": 20, "alert": "Problemas respiratorios"},
				{"threshold": 30, "alert": "Esperanza de vida reducida en 1 año"}
			],
			"comment": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4740125/"
		},
		{
			"id": 10,
			"name": "PM10",
			"effects": [
				{"threshold": 20, "alert": "Provocación de asma/bronquitis"},
				{"threshold": 30, "alert": "Potenciales problemas en el desarrollo"},
				{"threshold": 50, "alert": "Posible causa de cáncer o muerte prematura"}
			],
			"comment": "https://www.marlborough.govt.nz/environment/air-quality/smoke-and-smog/health-effects-of-pm10"
		},
		{
			"id": 8,
			"name": "NO2",
			"effects": [
				{"threshold": 20, "alert": "Irritaciones respiratorias"},
				{"threshold": 30, "alert": "Especial riesgo de infección respiratoria para niños"},
				{"threshold": 40, "alert": "Lluvia ácida"}
			],
			"comment": "https://www.epa.gov/no2-pollution/basic-information-about-no2"
		},
		{
			"id": 14,
			"name": "O3",
			"effects": [
				{"threshold": 20, "alert": "Tos y garganta irritada"},
				{"threshold": 40, "alert": "Aumento de la frecuencia de ataques de asma"},
				{"threshold": 50, "alert": "Problemas respiratorios crónicos"}
			],
			"comment": "https://www.epa.gov/ozone-pollution/health-effects-ozone-pollution"
		},
		{
			"id": 6,
			"name": "CO",
			"effects": [
				{"threshold": 0.3, "alert": "Dolor de cabeza"},
				{"threshold": 0.6, "alert": "Dolores de pecho"},
				{"threshold": 0.7, "alert": "Mareos"},
				{"threshold": 0.8, "alert": "Equivalente a una cajetilla semanal"},
				{"threshold": 1, "alert": "Debilidad general"}
			],
			"comment": "https://www.detectcarbonmonoxide.com/co-health-risks/"
		},
		{
			"id": 1,
			"name": "SO2",
			"effects": [
				{"threshold": 20, "alert": "Molestias en la respiración"},
				{"threshold": 40, "alert": "Riesgo elevado para asmáticos"}
			],
			"comment": "http://www.environment.gov.au/protection/publications/factsheet-sulfur-dioxide-so2"
		}
];

exports.getEffects = () => {
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

exports.getEffectById = (id) => {
    const result = effectsData.filter(e => e.id === id);
    if (result) {
        return result[0];
    }
};

exports.setEffect = (info) => {
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