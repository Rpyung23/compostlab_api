require("./config/port")
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const user = require("./view/user")
const mercado = require("./view/mercado")
const insumo = require("./view/insumo")
const lote = require("./view/lote")
const peso = require("./view/peso")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

/** APIS **/
app.use(user)
app.use(mercado)
app.use(insumo)
app.use(lote)
app.use(peso)

app.listen(process.env.PORT,()=>{
    console.log("SERVER LISTEN "+process.env.PORT)
})