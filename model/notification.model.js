const  connDB = require("../config/conn")
class NotificationModel
{
    static async readNotificacionModal(usuario)
    {
        var sql = "select A.idAlerta,A.FK_Lote,A.isVisto,L.nombre_lote,M.nombre_mercado," +
            "F.detalleFase from alertas as A inner join lote as L on A.FK_Lote = L.id_lote inner join mercado as M " +
            "on M.id_mercado = L.fk_id_mercado inner join fases as F on F.idFase = L.FkIDFase " +
            "where L.activo = 1 and L.fk_email_usuario = '"+usuario+"'"
        try{
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }
}

module.exports = NotificationModel