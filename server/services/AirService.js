
const { getStations, setStation } = require('../model/StationsDAO');
const { getEffects, getEffectById, setEffect } = require('../model/EffectsDAO');

exports.listAllStations = () => {
    return getStations();
}

exports.setStation = (info) => {
    return setStation(info);
}

exports.listAllEffects = () => {
    return getEffects();
}

exports.getEffectById = (id) => {
    return getEffectById(id);
}

exports.setEffect = (info) => {
    return setEffect(info);
}