const connection = require('../database/connection');
const camelcaseKeysDeep = require('camelcase-keys-deep');

module.exports = {


   async getById(request, response) {
      try {
         const { fornecedorId } = request.params;

         const supplier = await connection('fornecedor')
            .where('id', fornecedorId)
            .select('*')
            .first();

         if (!supplier) {
            return response.status(404).json({
               error: 'Fornecedor não encontrado com ID fornecido.',
            });
         }

         return response.json(camelcaseKeysDeep(supplier));
      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async getByCnpj(request, response) {
      try {
         const { cnpj } = request.query;

         const supplier = await connection('fornecedor')
            .where('cnpj', cnpj)
            .select('*')
            .first();

         if (!supplier) {
            return response.status(404).json({
               error: 'Fornecedor não encontrado com CNPJ fornecido.',
            });
         }

         return response.json(camelcaseKeysDeep(supplier));
      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async create(request, response) {
      try {
         const { razaoSocial, cnpj, responsavel, telefone, email, enderecoId } = request.body;

         await connection('fornecedor').insert({
            cnpj,
            email,
            id_endereco: enderecoId,
            razao_social: razaoSocial,
            telefone,
            responsavel,
         });

         const supplier = await connection('fornecedor')
            .where('cnpj', cnpj)
            .first();

         if (!supplier) {
            return response.status(404).json({
               error: 'Não foi possível confirmar o cadastro do fornecedor.',
            });
         }

         return response.json('Fornecedor cadastrado com sucesso.');
      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async update(request, response) {
      try {
         const { fornecedorId } = request.params;
         const { razaoSocial, cnpj, responsavel, telefone, email, enderecoId } = request.body;

         const supplier = await connection('fornecedor')
            .where('id', fornecedorId)
            .select('id')
            .first();

         if (supplier) {
            await connection('fornecedor').update({
               cnpj,
               email,
               id_endereco: enderecoId,
               razao_social: razaoSocial,
               telefone,
               responsavel,
            }).where('id', supplier.id);;

            return response.json('Cadastro de fornecedor atualizado com sucesso.');
         }

         return response.status(404).json({
            error: 'Fornecedor não encontrado com ID fornecido.',
         });

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async delete(request, response) {
      try {
         const { fornecedorId } = request.params;

         const supplier = await connection('fornecedor')
            .where('id', fornecedorId)
            .select('*')
            .first();

         if (!supplier) {
            return response.status(404).json({
               error: 'Fornecedor não encontrado com ID fornecido.',
            });
         }

         await connection('fornecedor')
            .where('id', supplier.id)
            .del();

         return response.status(202).json('Fornecedor deletado com sucesso.');

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },
};
