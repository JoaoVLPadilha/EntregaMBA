const connection = require('../database/connection');
const camelcaseKeysDeep = require('camelcase-keys-deep');

module.exports = {
   async index(request, response) {
      try {

         const types = await connection('tipo_chamado')
            .select('*');

         return response.json(camelcaseKeysDeep(types));

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async getById(request, response) {
      try {
         const { tipoChamadoId } = request.params;

         const ticketType = await connection('tipo_chamado')
            .where('id', tipoChamadoId)
            .select('*')
            .first();

         if (!ticketType) {
            return response.status(404).json({
               error: 'Tipo de categoria não encontrado com ID fornecido.',
            });
         }

         return response.json(camelcaseKeysDeep(ticketType));

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },
};
