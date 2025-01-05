const {
    getById,
    getAll,
    getByName,
    deleteById,
    create,
    update,
    countTypes,
    getAllInList,
    countAll,
    getAllPaginated
} = require("../repositories/typesRepository");
const {HandlingError} = require('../handlers/errorHandler');
const {deleteAll} = require('../services/zipTypesService');

const getAllZipTypes = async function () {
    return await getAll();
};

const createZipType = async function (name) {
    await validateName(name)
    return await create(name);
};

const deleteZipType = async function (id) {
    await deleteAll(id);
    await deleteById(id);
};

const updateZipType = async function (id, name) {
    if (!await getById(id))
        throw new HandlingError(404, "Type Not Found");

    await validateName(name);
    await update(id, name);

    return await getById(id);
};

const validateName = async function (name) {
    name = name.replace(/\s/g, "");
    if (!name || name.length > 20 || name.length < 2)
        throw new HandlingError(400, 'Wrong data was passed.')
    if (await getByName(name))
        throw new HandlingError(409, 'Type with such name already exists.')
};

const getCountTypes = async (typeIds) => {
    return await countTypes(typeIds);
};

const getAllZipTypesInList = async (ids) => {
    return await getAllInList(ids);
};

const countAllTypes = async () => {
    return await countAll();
};

const getPaginatedTypes = async (page, pageSize) => {
    const count = await countAllTypes();
    const offset = (page - 1) * pageSize;
    const rows = await getAllPaginated(pageSize, offset);
    const totalPages = Math.ceil(count / pageSize);

    return {
        rows: rows,
        totalPages: totalPages,
        totalElements: count,
        page: page
    };
};

module.exports = {
    getAllZipTypes,
    createZipType,
    deleteZipType,
    updateZipType,
    getCountTypes,
    getAllZipTypesInList,
    countAllTypes,
    getPaginatedTypes
}