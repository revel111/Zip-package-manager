const {
    deleteAllByTypeId,
    saveAllTypeIds,
    getAllByZipId,
    deleteAllByZipId
} = require('../repositories/zipTypesRepository');
const {HandlingError} = require('../handlers/errorHandler');

const deleteAll = async (typeId) => {
    await deleteAllByTypeId(typeId);
};

const saveAll = async (typeIds, zipId) => {
    const {getCountTypes} = require('../services/typesService');
    if (typeIds.length !== await getCountTypes(typeIds))
        throw new HandlingError(404, 'Invalid type ids were provided.');

    if (typeIds && typeIds.length > 0)
        await saveAllTypeIds(typeIds, zipId);
};

const getAllTypesByZipId = async (zipId) => {
    const {getAllZipTypesInList} = require("./typesService");
    const zipTypes = await getAllByZipId(zipId);

    if (!zipTypes)
        return [];

    return await getAllZipTypesInList(zipTypes.map(x => x.type_id));
};

const deleteAllZipTypesByZipId = async (zipId) => {
    await deleteAllByZipId(zipId);
};

module.exports = {
    deleteAll,
    saveAll,
    getAllTypesByZipId,
    deleteAllZipTypesByZipId
};