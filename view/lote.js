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


app.put("/sendLoteDespacho",Jwt.veriJwt,async function(req,res)
{

    var result = await LoteController.sendLoteDespachoController(req.body.lote)

    try{
        res.status(200).json({
            status_code: result  ? 200 : 300,
            msm: result  ? 'Lote en Despacho' : 'No se pudo enviar lote',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})


app.post("/add_historial_lote",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.addHistorialLoteController(req.body.vTemperatura, req.body.vHumedad,
        req.body.vPh, req.body.vOxigeno, req.body.detalleHistorial, req.body.lote)

    try{
        res.status(200).json({
            status_code: result  ? 200 : 300,
            msm: result  ? 'Historial agregado' : 'No se pudo agregar el historial',
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }

})

app.get("/readDetalleLote/:lote",async function(req, res)
{

    try{
        var result = await LoteController.readHistorialDetalleLoteModel(req.params.lote)
        res.status(200).json({
            status_code:result.length > 0 ? 200 :300,
            msm: result.length > 0 ? 'Datos consultados con éxito' : 'No existen datos disponibles',
            datos:  result
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm: e.toString(),
            datos:  []
        })
    }

})


app.post("/despacho_lote_usuer",Jwt.veriJwt,async function(req,res)
{
    var result = await LoteController.readLoteDespachoUserController(req.body.decoded.datosJWT.email_usuario)

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
