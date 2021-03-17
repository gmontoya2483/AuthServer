const { request, response, next } = require('express')
const {validationResult} = require("express-validator");

const validarCampos = (req=request, res=response, next=next) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();

}

module.exports = {
    validarCampos
}
