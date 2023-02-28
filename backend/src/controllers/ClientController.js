const connection = require('../database/connection');
const camelcaseKeysDeep = require('camelcase-keys-deep');

module.exports = {
   async getById(request, response) {
      try {
         const { clienteId } = request.params;

         const client = await connection('cliente')
            .join('endereco', 'cliente.endereco_id', '=', 'endereco.id')
            .where('cliente.id', clienteId)
            .select('cliente.*', 'endereco.*')
            .first();

         if (!client) {
            return response.status(404).json({
               error: 'Cliente não encontrado com ID fornecido.',
            });
         }

         return response.json(camelcaseKeysDeep(client));
      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async create(request, response) {
      try {
         const {
            razaoSocial,
            cnpj,
            responsavel,
            telefone,
            email,
            endereco,
            senha,
         } = request.body;

         var result = await connection('senha')
            .insert({
               senha,
            })
            .returning('id');

         if (!result) {
            return response.status(500).json({
               error: 'Ocorreu um erro no cadastro do cliente.',
            });
         }

         const password = result[0].id;

         result = await connection('endereco')
            .insert({
               logradouro: endereco.logradouro,
               cep: endereco.cep,
               bairro: endereco.bairro,
               cidade: endereco.cidade,
               uf: endereco.uf,
               numero: endereco.numero,
               complemento: endereco.complemento,
            })
            .returning('id');

         if (!result) {
            return response.status(500).json({
               error: 'Ocorreu um erro no cadastro do cliente.',
            });
         }

         const address = result[0].id;

         result = await connection('cliente')
            .insert({
               cnpj,
               email,
               razao_social: razaoSocial,
               telefone,
               responsavel,
               senha_id: password,
               endereco_id: address,
            })
            .returning('id');

         const client = result[0].id;

         if (!client) {
            return response.status(500).json({
               error: 'Ocorreu um erro no cadastro do cliente.',
            });
         }

         return response.status(201).json(client);
      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async update(request, response) {
      try {
         const { clienteId } = request.params;
         const { razaoSocial, cnpj, responsavel, telefone, email, enderecoId } =
            request.body;

         const client = await connection('cliente')
            .where('id', clienteId)
            .first('id');

         console.log(client);

         if (client) {
            await connection('cliente')
               .update({
                  cnpj,
                  email,
                  id_endereco: enderecoId,
                  razao_social: razaoSocial,
                  telefone,
                  responsavel,
               })
               .where('id', client.id);

            return response.json('Cadastro de cliente atualizado com sucesso.');
         }

         return response.status(404).json({
            error: 'Cliente não encontrado com ID fornecido.',
         });
      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async delete(request, response) {
      try {
         const { clienteId } = request.params;

         const client = await connection('cliente')
            .where('id', clienteId)
            .select('*')
            .first();

         if (!client) {
            return response.status(404).json({
               error: 'Cliente não encontrado com ID fornecido.',
            });
         }

         await connection('cliente').where('id', client.id).del();

         return response.status(202).json('Cliente deletado com sucesso.');
      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },
};
