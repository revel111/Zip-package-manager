const {deleteAllByTypeId, saveAllTypeIds, getAllByZipId, deleteAllByZipId} = require('../repositories/zipTypesRepository');
const {getCountTypes} = require('../services/typesService');
const {HandlingError} = require('../handlers/errorHandler');

const deleteAll = async (typeId) => {
    await deleteAllByTypeId(typeId);
};

const saveAll = async (typeIds, zipId) => {
    if (typeIds.length !== await getCountTypes(typeIds))
        throw new HandlingError(404, 'Invalid type ids were provided.');

    await saveAllTypeIds(typeIds, zipId);
};

const getAllZipTypesByZipId = async (zipId) => {
    return getAllByZipId(zipId);
};

const deleteAllZipTypesByZipId = async (zipId) => {
    await deleteAllByZipId(zipId);
};

module.exports = {
    deleteAll,
    saveAll,
    getAllZipTypesByZipId,
    deleteAllZipTypesByZipId
};