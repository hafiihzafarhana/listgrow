import Joi, { ObjectSchema } from 'joi';

export const ToDoCreateDTO: ObjectSchema = Joi.object().keys({
  img_url_new: Joi.string().required().messages({
    'string.base': 'format gambar salah',
    'string.empty': 'gambar wajib diisi'
  }),
  title: Joi.string().max(35).required().messages({
    'string.base': 'format judul salah',
    'string.empty': 'judul wajib diisi',
    'string.max': 'judul max 35 karakter'
  }),
  place: Joi.string().max(35).required().messages({
    'string.base': 'format tempat salah',
    'string.empty': 'tempat wajib diisi',
    'string.max': 'tempat max 35 karakter'
  }),
  date: Joi.string().required().messages({
    'string.base': 'format tanggal salah',
    'string.empty': 'tanggal wajib diisi'
  }),
  description: Joi.string().max(75).required().messages({
    'string.base': 'format deskripsi salah',
    'string.empty': 'deskripsi wajib diisi',
    'string.max': 'tempat max 75 karakter'
  })
});

export const ToUpdateDTO: ObjectSchema = Joi.object().keys({
  img_url: Joi.string().messages({
    'string.base': 'format gambar salah'
  }),
  img_url_new: Joi.string().allow(null, '').messages({
    'string.base': 'format gambar salah'
  }),
  public_id: Joi.string().messages({
    'string.base': 'sistem kacau, public id tidak ada'
  }),
  title: Joi.string().max(35).required().messages({
    'string.base': 'format judul salah',
    'string.empty': 'judul wajib diisi',
    'string.max': 'judul max 35 karakter'
  }),
  place: Joi.string().max(35).required().messages({
    'string.base': 'format tempat salah',
    'string.empty': 'tempat wajib diisi',
    'string.max': 'temoat max 35 karakter'
  }),
  date: Joi.string().required().messages({
    'string.base': 'format tanggal salah',
    'string.empty': 'tanggal wajib diisi'
  }),
  description: Joi.string().max(75).required().messages({
    'string.base': 'format deskripsi salah',
    'string.empty': 'deskripsi wajib diisi',
    'string.max': 'deskripsi max 75 karakter'
  })
});
