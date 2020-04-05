import * as Joi from '@hapi/joi';

export const groupSchema = Joi.object().keys({
  name: Joi.string()
      .required(),
  permission: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'SHARE', 'DELETE', 'UPLOAD_FILES'))
      .required(),
  id: Joi.string()
});

export const userGroupSchema = Joi.object().keys({
    user_ids: Joi.array().items(Joi.string())
        .required()
});
