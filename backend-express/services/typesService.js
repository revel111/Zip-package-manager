const {getAll, getByName, deleteById, create, update, countTypes} = require("../repositories/typesRepository");
const {HandlingError} = require('../handlers/errorHandler');

const getAllZipTypes = async function () {
    return await getAll();
};

const createZipType = async function (name) {
    await validateName(name)

    return await create(name);
};

const deleteZipType = async function (id) {
    //TODO delete all record from zip_types (many-to-many)
    await deleteById(id);
};

const updateZipType = async function (id, name) {
    await validateName(name);

    return await update(id, name);
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

module.exports = {
    getAllZipTypes,
    createZipType,
    deleteZipType,
    updateZipType,
    getCountTypes
}