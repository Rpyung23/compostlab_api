const LoteModel =  require("../model/lote.model")
class LoteController
{
    static async readLoteUserController(email){
        return await LoteModel.readLoteUserModel(email)
    }

    static async insertLoteUserController(nombre_lote, observacion_lote, peso, fk_tipo_peso,email,fk_id_mercado){
        return await LoteModel.insertLoteUserModel(nombre_lote, observacion_lote, peso, fk_tipo_peso,email,fk_id_mercado)
    }

    static async sendLoteDespachoController(idLote){
        return await LoteModel.sendLoteDespachoModel(idLote)
    }

    static async addHistorialLoteController(vTemperatura, vHumedad, vPh, vOxigeno, detalleHistorial, lote){
        return await LoteModel.addHistorialLoteModel(vTemperatura, vHumedad, vPh, vOxigeno, detalleHistorial, lote)
    }

    static async readHistorialDetalleLoteModel(lote){
        return await LoteModel.readHistorialDetalleLoteModel(lote)
    }

    static async readLoteDespachoUserController(email){
        return await LoteModel.readLoteDespachoUserModel(email)
    }
}

module.exports = LoteController