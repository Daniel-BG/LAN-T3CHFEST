
const { getPreSchools, setPreSchools } = require('../model/PreSchoolDAO');
const { getPrimarySchools, setPrimarySchool } = require('../model/PrimarySchoolDAO');

const airService = require('./AirService');

exports.listAllPreSchools = () => {
    var preSchools = getPreSchools();

    return preSchools.then( function (preSchoolList) {
        return  airService.listAllStations().then((stationList) => Promise.resolve({stationList, preSchoolList}))
    }).then(
        function ({preSchoolList, stationList}){
            return new Promise((resolve, reject) => {
                const getCloserStation = getCloser(stationList);
                for (let i = 0; i < preSchoolList.length; i++) {
                    var preSchool = preSchoolList[i];
                    let schoolInfo = '';
                    // search the near station
                    const station = getCloserStation(preSchool);
                    // for each pollutant, search the effect
                    for (let j = 0; j < station.pollutants.length; j++) {
                        const pollutant = station.pollutants[j];
                        // get the effect
                        const effect = airService.getEffectById(pollutant.effect_id);
                        if (effect) {
                            const applyEffects = effect.effects.filter(e => e.threshold <= pollutant.avg).map(e => e.alert);
                            if (applyEffects.length) {
                                schoolInfo = schoolInfo.concat(`
                                    <div>
                                    <h3>El producto contaminante: ${effect.name} </h3>
                                    Según el umbral ${Math.round(pollutant.avg * 100) / 100}, tiene los efectos: \n
                                    ${applyEffects.map(e => {
                                        return `
                                        <li>
                                            ${e}
                                        </li>
                                        `
                                    }).join('\n')}
                                    </div>
                                `
                                );
                            }
                        }

                        if (schoolInfo) {
                            preSchool.info = schoolInfo;
                        } else {
                            preSchool.info = 'El colegio tiene un ambiente favorable.';
                        }
                    }
                }
                resolve(preSchoolList);
            });
    });
}

exports.setPreSchool = (name) => {
    return setPreSchools(name);
}

exports.listAllPrimarySchools = () => {
    var primarySchools = getPrimarySchools();

    return primarySchools.then( function (primarySchoolList) {
        return  airService.listAllStations().then((stationList) => Promise.resolve({stationList, primarySchoolList}))
    }).then(
        function ({primarySchoolList, stationList}){
            return new Promise((resolve, reject) => {
                const getCloserStation = getCloser(stationList);
                for (let i = 0; i < primarySchoolList.length; i++) {
                    var primarySchool = primarySchoolList[i];
                    let schoolInfo = '';
                    // search the near station
                    const station = getCloserStation(primarySchool);
                    // for each pollutant, search the effect
                    for (let j = 0; j < station.pollutants.length; j++) {
                        const pollutant = station.pollutants[j];
                        // get the effect
                        const effect = airService.getEffectById(pollutant.effect_id);
                        if (effect) {
                            const applyEffects = effect.effects.filter(e => e.threshold <= pollutant.avg).map(e => e.alert);
                            if (applyEffects.length) {
                                schoolInfo = schoolInfo.concat(`
                                    <div>
                                    <h3>El producto contaminante: ${effect.name} </h3>
                                    Según el umbral ${Math.round(pollutant.avg * 100) / 100}, tiene los efectos: \n
                                    ${applyEffects.map(e => {
                                        return `
                                        <li>
                                            ${e}
                                        </li>
                                        `
                                    }).join('\n')}
                                    </div>
                                `
                                );
                            }
                        }

                        if (schoolInfo) {
                            primarySchool.info = schoolInfo;
                        } else {
                            primarySchool.info = 'El colegio tiene un ambiente favorable.';
                        }
                    }
                }
                resolve(primarySchoolList);
            });
    });
}

exports.setPrimarySchools = (name) => {
    return setPrimarySchool(name);
}

const getCloser = (stations) => ({lat, lng}) => {
    var closer = stations[0];
    var minDist = 99999;
    for ( st of stations) {
      var y = st.lat - lat;
      var x = st.lng - lng;
      if( x*x + y*y < minDist) {
        closer = st;
        minDist = x*x + y*y;
      } 
    }
    return closer;
}