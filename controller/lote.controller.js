const LoteModel =  require("../model/lote.model")
class LoteController
{
    static async readLoteUserController(email){
        return await LoteModel.readLoteUserModel(email)
    }
}

module.exports = LoteController