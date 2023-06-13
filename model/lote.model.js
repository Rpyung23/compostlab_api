const  connDB = require("../config/conn")
class LoteModel
{
    static async readLoteUserModel(email)
    {
        try{
            var conn = await connDB().promise()
            var sql = "select L.id_lote,L.nombre_lote,convert(L.fechaIngreso,char(150)) fechaIngreso,L.observacion_lote,L.peso,TP.*,U.email_usuario," +
                "M.id_mercado,M.nombre_mercado,concat(U.nombres,' ',U.apellido) UsuarioNombres from lote as L " +
                "inner join usuario as U on L.fk_email_usuario = U.email_usuario " +
                "inner join tipo_peso as TP on L.fk_tipo_peso = TP.id_tipo_peso " +
                "inner join mercado as M on L.fk_id_mercado = M.id_mercado " +
                "where ISNULL(L.fechaDespacho) and ISNULL(L.fechaSalida) and L.activo = 1 and " +
                "L.fk_email_usuario = '"+email+"' order by L.fechaIngreso desc"
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async insertLoteUserModel(nombre_lote, observacion_lote, peso, fk_tipo_peso,email,fk_id_mercado){
        try{
            var conn = await connDB().promise()
            await conn.query("INSERT INTO compostlab.lote ( nombre_lote, observacion_lote, peso, fk_tipo_peso," +
                "fk_email_usuario, fk_id_mercado) VALUES ('"+nombre_lote+"','"+observacion_lote+"', "+peso+", "+fk_tipo_peso+"," +
                " '"+email+"', "+fk_id_mercado+")")
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = LoteModel