// Importação das bibliotecas para ter acesso à suas respectivas funcionalidas
const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const SessionController = require('./controllers/SessionController');
const ClientController = require('./controllers/ClientController');
const SupplierController = require('./controllers/SupplierController');
const TicketController = require('./controllers/TicketController');
const TicketTypeController = require('./controllers/TicketTypeController');
const TicketSubtypeController = require('./controllers/TicketSubtypeController');

// Desacoplando o módulo de rotas do Express e atribuindo em uma variável
const routes = express.Router();

// SessionController
routes.post(
   '/session/',
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         cnpj: Joi.string().required().length(14),
         senha: Joi.string().required(),
      }),
   }),
   SessionController.create,
);
const store = () => {
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         title: Joi.string().min(3).required(),
         description: Joi.string().min(10).required(),
         value: Joi.number().required(),
      }),
   });
};
// ClientController
routes.get(
   '/cliente/:clienteId',
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         clienteId: Joi.number().integer().required(),
      }),
   }),
   ClientController.getById,
);

routes.post(
   '/cliente/',
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         responsavel: Joi.string().required(),
         email: Joi.string().required().email(),
         razaoSocial: Joi.string().required(),
         cnpj: Joi.string().required().length(14),
         telefone: Joi.string().required().min(1).max(11),
         senha: Joi.string().required(),
         endereco: Joi.object().keys({
            logradouro: Joi.string().required(),
            cep: Joi.string().required().length(8),
            bairro: Joi.string().required(),
            cidade: Joi.string().required(),
            uf: Joi.string().required().length(2),
            numero: Joi.string().required(),
            complemento: Joi.string().required(),
         }),
      }),
   }),
   ClientController.create,
);

routes.put(
   '/cliente/:clienteId',
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         responsavel: Joi.string().required(),
         enderecoId: Joi.number().integer().required(),
         email: Joi.string().required().email(),
         razaoSocial: Joi.string().required(),
         cnpj: Joi.string().required().length(14),
         telefone: Joi.string().required().min(1).max(11),
      }),
      [Segments.PARAMS]: {
         clienteId: Joi.number().integer().required(),
      },
   }),
   ClientController.update,
);

routes.delete(
   '/cliente/:clienteId',
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         clienteId: Joi.number().integer().required(),
      }),
   }),
   ClientController.delete,
);

// SupplierController
routes.get(
   '/fornecedor/:fornecedorId',
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         fornecedorId: Joi.number().integer().required(),
      }),
   }),
   SupplierController.getById,
);

// SupplierController
routes.get(
   '/fornecedor/',
   celebrate({
      [Segments.QUERY]: Joi.object().keys({
         cnpj: Joi.string().required().length(14),
      }),
   }),
   SupplierController.getByCnpj,
);

routes.post(
   '/fornecedor/',
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         responsavel: Joi.string().required(),
         enderecoId: Joi.number().integer().required(),
         email: Joi.string().required().email(),
         razaoSocial: Joi.string().required(),
         cnpj: Joi.string().required().length(14),
         telefone: Joi.string().required().min(1).max(11),
      }),
   }),
   SupplierController.create,
);

routes.put(
   '/fornecedor/:fornecedorId',
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         responsavel: Joi.string().required(),
         enderecoId: Joi.number().integer().required(),
         email: Joi.string().required().email(),
         razaoSocial: Joi.string().required(),
         cnpj: Joi.string().required().length(14),
         telefone: Joi.string().required().min(1).max(11),
      }),
      [Segments.PARAMS]: {
         fornecedorId: Joi.number().integer().required(),
      },
   }),
   SupplierController.update,
);

routes.delete(
   '/fornecedor/:fornecedorId',
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         fornecedorId: Joi.number().integer().required(),
      }),
   }),
   SupplierController.delete,
);

// TicketController
routes.get(
   '/chamados/:clienteId',
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         clienteId: Joi.number().integer().required(),
      }),
   }),
   TicketController.index,
);

routes.get(
   '/chamado/:chamadoId',
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         chamadoId: Joi.number().integer().required(),
      }),
   }),
   TicketController.getById,
);

routes.post(
   '/chamado',
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         clienteId: Joi.number().integer().required(),
         fornecedorId: Joi.number().integer().required(),
         tipoChamadoId: Joi.number().integer().required(),
         subcategoriaChamadoId: Joi.number().integer().required(),
         descricao: Joi.string().required().max(500),
      }),
   }),
   TicketController.create,
);

routes.put(
   '/chamado/:chamadoId',
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         clienteId: Joi.number().integer().required(),
         fornecedorId: Joi.number().integer().required(),
         tipoChamadoId: Joi.number().integer().required(),
         subcategoriaChamadoId: Joi.number().integer().required(),
         descricao: Joi.string().required().max(500),
         statusChamadoId: Joi.number().integer().required(),
      }),
      [Segments.PARAMS]: {
         chamadoId: Joi.number().integer().required(),
      },
   }),
   TicketController.update,
);

routes.delete(
   '/chamado/:chamadoId',
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         chamadoId: Joi.number().integer().required(),
      }),
   }),
   TicketController.delete,
);

// TicketTypeController
routes.get('/tipo-chamado/', TicketTypeController.index);

routes.get(
   '/tipo-chamado/:tipoChamadoId',
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         tipoChamadoId: Joi.number().integer().required(),
      }),
   }),
   TicketTypeController.getById,
);

// TicketTypeController
routes.get('/subcategorias-chamado/', TicketSubtypeController.index);

routes.get(
   '/subcategoria-chamado/:tipoChamadoId',
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         tipoChamadoId: Joi.number().integer().required(),
      }),
   }),
   TicketSubtypeController.getByTypeId,
);

// Exportar variável (rotas) de dentro de um arquivo (routes.js) para ser usado em outro (index.js)
module.exports = routes;
