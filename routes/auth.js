const {validarJWT} = require("../middlewares/validar-jwt");
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router();


// Crear un nuevo usuario
router.post('/new', [
    check('name', 'El nombre de usuario es obligatorio').not().isEmpty({ignore_whitespace: true}),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min:6 }),
    validarCampos
],crearUsuario);

// Login de usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min:6 }),
    validarCampos
],loginUsuario);


// Validar y revalidar Token
router.get('/renew', [ validarJWT ],revalidarToken);





module.exports = router;
