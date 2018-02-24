
const { getPreSchools, setPreSchools } = require('../model/PreSchoolDAO');
const { getPrimarySchools, setPrimarySchool } = require('../model/PrimarySchoolDAO');

exports.listAllPreSchools = () => {
    return getPreSchools();
}

exports.setPreSchool = (name) => {
    return setPreSchools(name);
}

exports.listAllPrimarySchools = () => {
    return getPrimarySchools();
}

exports.setPrimarySchools = (name) => {
    return setPrimarySchool(name);
}