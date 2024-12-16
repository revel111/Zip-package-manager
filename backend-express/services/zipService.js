const {countAllZips, create, getById, deleteById} = require('../repositories/zipRepository')
const {HandlingError} = require("../handlers/errorHandler");
const {getCountTypes, getAllZipTypesInList} = require('../services/typesService');
const {saveAll, getAllZipTypesByZipId, deleteAllZipTypesByZipId} = require('../services/zipTypesService');

const getZipCount = async function () {
    return await countAllZips();
};

const createZip = async (name, fileName, zip, types) => {
    if (!name || name.length > 20 || name.length < 2)
        throw new HandlingError(400, 'Bad name was provided.');

    if (!zip || !zip.buffer || zip.size > 209715200)
        throw new HandlingError(400, 'File size is too large or empty.');

    if (types && await getCountTypes(types) !== types.length)
        throw new HandlingError(400, 'Types are invalid.');

    if (types)
        await saveAll(types);

    return create(zip, fileName, zip);
};

const getZipById = async (id) => {
    const zip = await getById(id);

    if (!zip)
        throw new HandlingError(404, 'File does not exist.')

    const zipTypes = await getAllZipTypesByZipId(id);
    // const types = await getAllZipTypesInList(zipTypes);
    //TODO when fetch?

    zip.types = zipTypes;

    return zip;
};

const deleteZipById = async (id) => {
    await deleteById(id);
    await deleteAllZipTypesByZipId(id);
};

module.exports = {
    getZipCount,
    createZip,
    getZipById,
    deleteZipById
};