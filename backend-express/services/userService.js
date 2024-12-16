const {countAllUsers} = require('../repositories/userRepository')

const getUserCount = async function(){
    return await countAllUsers();
};

module.exports = {getUserCount};