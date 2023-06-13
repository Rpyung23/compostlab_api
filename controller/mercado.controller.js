const MercadoModel = require("../model/mercado.model")
class MercadoController
{
    static async readAllMercadoController(){
        return await MercadoModel.readAllMercadoModel()
    }

    static async readAllMercadoActiveController(){
        return await MercadoModel.readAllMercadoActiveModel()
    }

    static async createMercadoModel(nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado){
        return await MercadoModel.createMercadoModel(nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado)
    }

}

module.exports = MercadoController