import Joi from 'joi';

const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    ismaster: Joi.boolean(),
  }),
};

const getRoles = {
  query: Joi.object()
    .keys({
      $top: Joi.number(),
      $skip: Joi.number(),
      $filter: Joi.string(),
      $select: Joi.string(),
      $orderby: Joi.string(),
      idrole: Joi.number().integer().min(1).max(99999),
      additionalQuery: Joi.string().optional().allow(null, ''),
    })
    .with('$top', '$skip')
    .with('$skip', '$top'),
};

const getRol = {
  params: Joi.object().keys({
    idrole: Joi.number().integer().required().min(1).max(99999),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    idrole: Joi.number().integer().required().min(1).max(99999),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      ismaster: Joi.boolean(),
    })
    .min(1),
};

const deleteRole = {
  params: Joi.object().keys({
    idrole: Joi.number().integer().required().min(1).max(99999),
  }),
};

export default {
  createRole,
  getRoles,
  getRol,
  updateRole,
  deleteRole,
};
