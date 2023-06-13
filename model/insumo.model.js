const  connDB = require("../config/conn")
class InsumoModel
{
    static async createInsumoModel(nombre_insumo, origin_insumo, id_tipo_insumo,
                                   cantidad_insumo, precio_insumo, decrip_insumo)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into insumo(nombre_insumo, origin_insumo, fk_id_tipo_insumo, " +
                "cantidad_insumo, precio_insumo, decrip_insumo) VALUES " +
                "('"+nombre_insumo+"','"+origin_insumo+"',"+id_tipo_insumo+","+cantidad_insumo+"," +
                ""+precio_insumo+",'"+decrip_insumo+"')"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async readAllInsumoModel(){
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select I.*,TI.nombreTipoInsumo from insumo as I inner join tipo_insumo as TI on I.fk_id_tipo_insumo = TI.id_tipo_insumo")
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async readAllInsumoActivoModel(){
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select I.id_insumo,I.nombre_insumo from insumo as I where I.activo = 1")
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async readTipoInsumoModel()
    {
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select TI.id_tipo_insumo,TI.nombreTipoInsumo from tipo_insumo as TI")
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async readInsumoLoteModel(id_lote)
    {
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select IL.fk_id_lote,L.nombre_lote,convert(IL.fecha_ingreso,char(150)) fecha_ingreso," +
                "IL.cantidad,IL.fk_id_insumo,I.nombre_insumo from insumo_lote as IL " +
                "inner join insumo as I on IL.fk_id_insumo = I.id_insumo inner join lote as L on IL.fk_id_lote = L.id_lote " +
                "where IL.fk_id_lote = "+id_lote)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }


    static async addInsumoLoteModel(id_lote,id_insumo,cantidad)
    {
        try{
            var conn = await connDB().promise()
            var sql = "insert into insumo_lote(fk_id_lote, fk_id_insumo, cantidad) values ("+id_lote+","+id_insumo+","+cantidad+")"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            return false
        }
    }

}

module.exports = InsumoModel