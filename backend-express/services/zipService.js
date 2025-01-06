const {
    countAllZips,
    create,
    getById,
    deleteById,
    getAllByName,
    getAllByUserId,
    getAll,
    getAllByZipType
} = require('../repositories/zipRepository')
const {HandlingError} = require("../handlers/errorHandler");
const {getCountTypes} = require('../services/typesService');
const {saveAll, deleteAllZipTypesByZipId} = require('../services/zipTypesService');
const {getPaginatedByName} = require('../repositories/zipRepository');

const getZipCount = async function () {
    return await countAllZips();
};

const createZip = async (name, fileName, zip, types, userId, description) => {
    validateName(name);

    validateZip(zip);

    await validateTypes(types);

    const {nameD, id, fileNameD} = await create(name, fileName, zip, userId, description);

    if (types)
        await saveAll(types, id);

    return {nameD, id, fileNameD};
};

const validateName = (name) => {
    if (!name || name.length > 20 || name.length < 2)
        throw new HandlingError(400, 'Bad name was provided.');
};

const validateZip = (zip) => {
    if (!zip || !zip.buffer || zip.size > 209715200)
        throw new HandlingError(400, 'File size is too large or empty.')
};

const validateTypes = async (types) => {
    if (types && await getCountTypes(types) !== types.length)
        throw new HandlingError(400, 'Types are invalid.');
}

const getZipById = async (id) => {
    const zip = await getById(id);

    if (!zip)
        throw new HandlingError(404, 'File does not exist.')

    return zip;
};

const deleteZipById = async (id) => {
    await deleteById(id);
    await deleteAllZipTypesByZipId(id);
};

const getPaginatedZips = async (name, page, pageSize) => {
    const count = await getZipCount();
    const offset = (page - 1) * pageSize;
    const rows = await getPaginatedByName(name, pageSize, offset);
    const totalPages = Math.ceil(count / pageSize);

    return {
        rows: rows,
        totalPages: totalPages,
        totalElements: count,
        page: page
    };
};

const getZipsByName = async (name) => {
    return await getAllByName(name);
};

const getZipsByUserId = async (id) => {
    return await getAllByUserId(id);
};

const getAllZips = async () => {
    return await getAll();
}

const getAllZipsByZipType = async (zipTypeId) => {
    return getAllByZipType(zipTypeId);
};

const download = async (id) => {
    const zip = await getZipById(id);

    return {zip_file: zip.zip_file, file_name: zip.file_name};
};

module.exports = {
    getZipCount,
    createZip,
    getZipById,
    deleteZipById,
    getPaginatedZips,
    getZipsByName,
    getZipsByUserId,
    getAllZips,
    getAllZipsByZipType,
    download
};