const LoteModel =  require("../model/lote.model")
class LoteController
{
    static async readLoteUserController(email){
        return await LoteModel.readLoteUserModel(email)
    }

    static async insertLoteUserController(nombre_lote, observacion_lote, peso, fk_tipo_peso,email,fk_id_mercado){
        return await LoteModel.insertLoteUserModel(nombre_lote, observacion_lote, peso, fk_tipo_peso,email,fk_id_mercado)
    }
}

module.exports = LoteController