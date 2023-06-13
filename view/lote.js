const express = require("express")
const app = express()
const LoteController = require("../controller/lote.controller")
const Jwt = require("../config/jwt")
app.post("/lote_usuer",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.readLoteUserController(req.body.decoded.datosJWT.email_usuario)

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Lotes encontrados' : 'No existen Lotes',
            datos: result
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            datos: []
        })
    }

})


module.exports = app
