const connection = require('../database/connection');
const camelcaseKeysDeep = require('camelcase-keys-deep');

module.exports = {
   async index(request, response) {
      try {
         const { clienteId } = request.params;

         const tickets = await connection('chamado')
            .join('fornecedor', 'chamado.fornecedor_id', '=', 'fornecedor.id')
            .join('cliente', 'chamado.cliente_id', '=', 'cliente.id')
            .join('tipo_chamado', 'chamado.tipo_chamado_id', '=', 'tipo_chamado.id')
            .join('subcategoria_chamado', 'chamado.subcategoria_chamado_id', '=', 'subcategoria_chamado.id')
            .join('status_chamado', 'chamado.status_chamado_id', '=', 'status_chamado.id')
            .select('chamado.id as chamadoId',
               'chamado.descricao',
               'fornecedor.razao_social as fornecedor',
               'tipo_chamado.descricao as tipo_chamado',
               'subcategoria_chamado.descricao as subcategoria_chamado',
               'status_chamado.descricao as status_chamado',
               'cliente.id as clientId',)
            .where('chamado.cliente_id', clienteId);

         return response.json(camelcaseKeysDeep(tickets));

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async getById(request, response) {
      try {
         const { chamadoId } = request.params;

         const supplier = await connection('chamado')
            .where('id', chamadoId)
            .select('*')
            .first();

         if (!supplier) {
            return response.status(404).json({
               error: 'Chamado não encontrado com ID fornecido.',
            });
         }

         return response.json(camelcaseKeysDeep(supplier));

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async create(request, response) {
      try {
         const { clienteId, fornecedorId, tipoChamadoId, subcategoriaChamadoId, descricao } = request.body;

         const statusAtivo = 1;

         const result = await connection('chamado').insert({
            cliente_id: clienteId,
            fornecedor_id: fornecedorId,
            tipo_chamado_id: tipoChamadoId,
            subcategoria_chamado_id: subcategoriaChamadoId,
            descricao,
            status_chamado_id: statusAtivo
         }).returning('id');

         const ticketId = result[0].id;

         if (!ticketId) {
            return response.status(500).json({
               error: 'Ocorreu um erro ao cadastrar chamado.',
            });
         }
         return response.status(201).json(ticketId);

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async update(request, response) {
      try {
         const { chamadoId } = request.params;
         const { clienteId, fornecedorId, tipoChamadoId, subcategoriaChamadoId, descricao, statusChamado }
            = request.body;

         const ticket = await connection('chamado')
            .where('id', chamadoId)
            .select('id')
            .first();

         if (ticket) {
            await connection('chamado').update({
               cliente_id: clienteId,
               fornecedor_id: fornecedorId,
               tipo_chamado_id: tipoChamadoId,
               subcategoria_chamado_id: subcategoriaChamadoId,
               descricao,
               status_chamado_id: statusChamado
            }).where('id', ticket.id);;

            return response.json('Cadastro de chamado atualizado com sucesso.');
         }

         return response.status(404).json({
            error: 'Chamado não encontrado com ID fornecido.',
         });

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },

   async delete(request, response) {
      try {
         const { chamadoId } = request.params;

         const ticket = await connection('chamado')
            .where('id', chamadoId)
            .select('*')
            .first();

         if (!ticket) {
            return response.status(404).json({
               error: 'Chamado não encontrado com ID fornecido.',
            });
         }

         await connection('chamado')
            .where('id', ticket.id)
            .del();

         return response.status(202).json('Chamado deletado com sucesso.');

      } catch (error) {
         return response.status(500).json({ error: error.message });
      }
   },
};
