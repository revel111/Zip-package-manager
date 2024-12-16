const {deleteAllByTypeId, saveAllTypeIds} = require('../repositories/zipTypesRepository');
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

module.exports = {
    deleteAll,
    saveAll
};