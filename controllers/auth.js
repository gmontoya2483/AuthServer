const {validationResult} = require("express-validator");
const { request, response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require("../helpers/jwt");


const crearUsuario = async (req=request, res=response) => {

    const { name, email, password } = req.body;

    try {
        // Verificar si no existe un correo duplicado
        const usuario = await Usuario.findOne({ email });
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });

        }

        // Crear usuario con el modelo

        const dbUser = new Usuario({name, email, password})

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generar el JWT
        const token = await generarJWT( dbUser.id, name);

        // Guardar ususario de DB
        await dbUser.save()

        // Generar Respuesta
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token

        });

    }catch ( error ) {
        console.log (error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const loginUsuario = async (req= request, res=response) => {

    const { email, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({ email });
        if( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o password incorrectos'
            });

        }

        // Confirmar matcheo del password
        const validPassword = bcrypt.compareSync( password, dbUser.password )
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o password incorrectos'
            });
        }


        // Generar el JWT
        const token = await generarJWT( dbUser.id, dbUser.name);

        // Generar Respuesta
        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        });


    } catch ( error ) {
        console.log (error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const revalidarToken = async (req=request, res=response) => {

    const { uid, name } = req;

    // Generar el JWT
    const token = await generarJWT( uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
