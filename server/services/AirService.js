
const { getAirQuality, setAirQuality } = require('../model/AirDAO');

exports.listAllAirQuality = () => {
    return getAirQuality();
}

exports.setAir = (info) => {
    return setAirQuality(info);
}