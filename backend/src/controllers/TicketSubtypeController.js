const connection = require('../database/connection');
const camelcaseKeysDeep = require('camelcase-keys-deep');

module.exports = {
   async index(request, response) {
      try {

         const subtypes = await connection('subcategoria_chamado')
            .select('*');

         return response.json(camelcaseKeysDeep(subtypes));

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async getByTypeId(request, response) {
      try {
         const { tipoChamadoId } = request.params;

         const ticketSubtypes = await connection('subcategoria_chamado')
            .join('tipo_chamado', 'tipo_chamado.id', '=', 'subcategoria_chamado.tipo_chamado_id')
            .where('tipo_chamado.id', tipoChamadoId)
            .select('subcategoria_chamado.*');

         if (!ticketSubtypes) {
            return response.status(404).json({
               error: 'Subcategoria não encontrado com ID de tipo de chamado fornecido.',
            });
         }

         return response.json(camelcaseKeysDeep(ticketSubtypes));

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },
};
