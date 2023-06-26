const InsumoModel = require("../model/insumo.model")
class InsumoController
{
    static async createInsumoController(nombre_insumo, origin_insumo, id_tipo_insumo,
                                   cantidad_insumo, precio_insumo, decrip_insumo)
    {
        return await InsumoModel.createInsumoModel(nombre_insumo, origin_insumo, id_tipo_insumo,
            cantidad_insumo, precio_insumo, decrip_insumo)
    }

    static async updateInsumoController(id_insumo,nombre_insumo, origin_insumo, id_tipo_insumo,
                                   cantidad_insumo, precio_insumo, decrip_insumo){
        return await InsumoModel.updateInsumoModel(id_insumo,nombre_insumo, origin_insumo, id_tipo_insumo,
            cantidad_insumo, precio_insumo, decrip_insumo)
    }

    static async readAllInsumosController(){
        return await InsumoModel.readAllInsumoModel()
    }

    static async readAllInsumosActivoController(){
        return await InsumoModel.readAllInsumoActivoModel()
    }

    static async readAllTipoInsumoContreller(){
        return await  InsumoModel.readTipoInsumoModel()
    }

    static async readInsumoLoteController(id_lote){
        return await InsumoModel.readInsumoLoteModel(id_lote)
    }

    static async addInsumoLoteController(id_lote,id_insumo,cantidad){
        return await InsumoModel.addInsumoLoteModel(id_lote,id_insumo,cantidad)
    }
}


module.exports = InsumoController