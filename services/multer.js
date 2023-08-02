const multer = require('multer');
const path = require('path');
const db = require('../models');
const User = db.User;
const Event = db.Event
const Athletic = db.Athletic

// Define as opções de armazenamento
const storage = multer.diskStorage({
  // Define o destino dos arquivos
  destination: (req, file, cb) => {
    if (file.fieldname == "user")
      cb(null, 'uploads/users');
    if (file.fieldname == "event")
      cb(null, 'uploads/events');
    if (file.fieldname == "athletic")
      cb(null, 'uploads/athletics');
  },
  // Define o nome do arquivo
  filename: async (req, file, cb) => {
    if (file.fieldname == "user") {
      const user = await User.findOne({
        where: { id: req.user.token.id },
        attributes: ['cpf']
      })
      // Pegar o numero do cpf para o nome do arquivo
      const cpf = user.cpf;
      // Extrai a extensão do arquivo
      const ext = path.extname(file.originalname);

      if (file.mimetype === 'application/pdf') {
        const filename = `${cpf}-matricula${ext}`;
        cb(null, filename);

      } else {
        const filename = `${cpf}-perfil${ext}`;
        cb(null, filename);

      }
    }
    if (file.fieldname == "athletic") {
      const athletic = await Athletic.findOne({
        where: { id: req.params.id },
        attributes:['name']
      })
      const name = athletic.name.replace(" ", "")
      const ext = path.extname(file.originalname);
      const filename = name + ext;
      cb(null, filename);

    }
    if (file.fieldname == "event") {
      const event = await Event.findOne({
        where: { id: req.params.id },
      })
      const data = Date.now()
      const ext = path.extname(file.originalname);
      // const filename = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}-evento` + ext;
      const filename = data + ext;
      cb(null, filename);

    }

  },
});

// Define as opções para o multer
const upload = multer({
  storage: storage,

  // Define a validação do tipo de arquivo
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg'
      || file.mimetype === 'image/png'
      || file.mimetype === 'image/jpg'
      || file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Permitdo apenas os formatos .jpg, .jpeg e .png'));
    }
  },
});

// Exporta a função de upload
module.exports = upload;
