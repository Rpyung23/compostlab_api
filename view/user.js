const express = require("express")
const app = express()
const Jwt = require("../config/jwt")
const UserController = require("../controller/user.controller")


app.post("/create_user",async function (req, res)
{
    var result = await UserController.createUsuarioController(req.body.email_usuario,
        req.body.nombres, req.body.apellido, req.body.cedula,
        req.body.telefono, req.body.contrasenia);

    try{
        res.status(200).json({
            status_code: result ? 200 : 300,
            msm: result ? 'Usuario creado con éxito' : 'No se ha podido crear el usuario'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString()
        })
    }
})

app.post("/login_user",async function (req, res)
{
    var result = await UserController.loginUsuarioModel(req.body.email,
        req.body.password);

    try{
        res.status(200).json({
            status_code: result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Login OK' : 'Credenciales erroneas',
            token: result.length > 0 ? Jwt.createJwt(result[0]) : "S/N"
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            token: "S/N"
        })
    }
})



module.exports = app