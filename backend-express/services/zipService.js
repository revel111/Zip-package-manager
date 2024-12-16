const {countAllZips} = require('../repositories/zipRepository')

const getZipCount = async function(){
    return await countAllZips();
};

module.exports = {getZipCount};