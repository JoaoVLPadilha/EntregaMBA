const crypto = require('crypto'); // pacote de criptografia que vem no node 

// Usando crypto para fazer o id, é gerado 4 bytes de caracteres aleatorios em hexadecimal
module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}