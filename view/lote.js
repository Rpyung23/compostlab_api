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


app.post("/add_lote_usuer",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.insertLoteUserController(req.body.nombre_lote,req.body.observacion_lote,req.body.peso,
        req.body.tipo_peso,req.body.decoded.datosJWT.email_usuario,req.body.id_mercado)

    try{
        res.status(200).json({
            status_code: result > 0 ? 200 : 300,
            msm: result > 0 ? 'Lote creado' : 'No se pudo crear el Lote',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }

})


module.exports = app
