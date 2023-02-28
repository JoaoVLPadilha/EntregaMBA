const connection = require('../database/connection');

module.exports = {
   async create(request, response) {
      try {
         const { cnpj, senha } = request.body;

         const clientId = await connection('cliente')
            .join('senha', 'cliente.senha_id', '=', 'senha.id')
            .where({
               cnpj,
               senha,
            })
            .first('cliente.id');

         if (!clientId) {
            return response.status(403).json({
               error: 'Não foi encontrado cliente com as credenciais fornecidas.',
            });
         }

         return response.status(200).json(clientId);
      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },
};
