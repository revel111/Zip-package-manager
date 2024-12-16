const {countAllZips, create} = require('../repositories/zipRepository')
const {HandlingError} = require("../handlers/errorHandler");
const {getCountTypes} = require('../services/typesService');
const {saveAll} = require('../services/zipTypesService');

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

module.exports = {
    getZipCount,
    createZip,
};