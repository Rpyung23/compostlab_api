const  connDB = require("../config/conn")
class LoteModel
{

    static async readLoteAllUserModel(email)
    {
        try{
            var conn = await connDB().promise()
            var sql = "select L.id_lote,L.nombre_lote from lote as L where L.activo = 1 " +
                "and L.fk_email_usuario = '"+email+"';"
            //console.log(sql)
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }
    static async readLoteUserModel(email)
    {
        try{
            var conn = await connDB().promise()
            var sql = "select L.dia_notificacion,L.FkIDFase,F.detalleFase,L.id_lote,L.nombre_lote,convert(L.fechaIngreso,char(150)) fechaIngreso,L.observacion_lote,L.peso,TP.*,U.email_usuario," +
                "M.id_mercado,M.nombre_mercado,concat(U.nombres,' ',U.apellido) UsuarioNombres from lote as L " +
                "inner join usuario as U on L.fk_email_usuario = U.email_usuario " +
                "inner join tipo_peso as TP on L.fk_tipo_peso = TP.id_tipo_peso " +
                "inner join mercado as M on L.fk_id_mercado = M.id_mercado " +
                "inner join fases as F on F.idFase = L.FkIDFase where ISNULL(L.fechaDespacho) and ISNULL(L.fechaSalida) and L.activo = 1 and " +
                "L.fk_email_usuario = '"+email+"' order by L.fechaIngreso desc"
            //console.log(sql)
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async insertLoteUserModel(nombre_lote, observacion_lote, peso, fk_tipo_peso,email,fk_id_mercado,dia_notification){
        try{
            var conn = await connDB().promise()
            await conn.query("INSERT INTO compostlab.lote ( nombre_lote, observacion_lote, peso, fk_tipo_peso," +
                "fk_email_usuario, fk_id_mercado,dia_notificacion) VALUES ('"+nombre_lote+"','"+observacion_lote+"', "+peso+", "+fk_tipo_peso+"," +
                " '"+email+"', "+fk_id_mercado+","+dia_notification+")")
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    /**ENVIA EL LOTE A DESPACHO**/
    static async sendLoteDespachoModel(idLote){
        try{
            var sql = "update lote set fechaDespacho = now() where id_lote = "+idLote
            var conn = await connDB().promise()
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    /**ADD HISTORIAL LOTE**/
    static async addHistorialLoteModel(vTemperatura, vHumedad, vPh, vOxigeno, detalleHistorial, lote)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into historial_lote(vTemperatura, vHumedad, vPh, vOxigeno, detalleHistorial, FK_lote) " +
                "VALUES ("+vTemperatura+","+vHumedad+","+vPh+","+vOxigeno+",'"+detalleHistorial+"',"+lote+")"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    /**READ HISTORIAL**/
    static async readHistorialDetalleLoteModel(lote)
    {
        try{
            var sql = "select HL.vTemperatura,HL.vHumedad,HL.vPh,HL.vOxigeno,HL.detalleHistorial," +
                "convert(HL.fechaHistorial,char(150)) fechaHistorial from historial_lote as HL where HL.FK_lote = "+lote
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    /**READ LOTE DEPACHO**/
    static async readLoteDespachoUserModel(email)
    {
        try{
            var conn = await connDB().promise()
            var sql = "select L.id_lote,L.nombre_lote,convert(L.fechaIngreso,char(150)) fechaIngreso," +
                "convert(L.fechaDespacho,char(150)) fechaDespacho,L.observacion_lote,L.peso,TP.*," +
                "U.email_usuario,M.id_mercado,M.nombre_mercado,concat(U.nombres,' ',U.apellido) UsuarioNombres," +
                "ROUND(avg(HL.vOxigeno),2) vOxigeno,ROUND(AVG(HL.vPh),2) vPh,ROUND(avg(HL.vHumedad),2) vHumedad," +
                "ROUND(AVG(HL.vTemperatura),2) vTemperatura from lote as L left join usuario as U on " +
                "L.fk_email_usuario = U.email_usuario left join tipo_peso as TP on " +
                "L.fk_tipo_peso = TP.id_tipo_peso left join mercado as M on L.fk_id_mercado = M.id_mercado " +
                "left join historial_lote as HL on L.id_lote = HL.FK_lote " +
                "where !ISNULL(L.fechaDespacho) and !ISNULL(L.fechaIngreso) and ISNULL(L.fechaSalida) and L.activo = 1 and " +
                "L.fk_email_usuario = '"+email+"' group by L.id_lote order by L.fechaIngreso,L.fechaDespacho desc"
            //console.log(sql)
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    /** AUTH SALIDA **/
    static async authLoteModel(idLote,email){
        try{
            var sql = "call addLoteSalida("+idLote+",'"+email+"')"
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0][0][0].estado
        }catch (e) {
            console.log(e)
            return 400
        }
    }


    /** ALL INSUMO POR LOTE REPORTE **/

    static async readReportInsumosLoteModel(lotes,email)
    {
        var oSqlLotes = ""
        if(Array.isArray(lotes))
        {
            oSqlLotes = " and L.id_lote in ("+lotes+")"
        }

        var sql = "select L.nombre_lote,M.nombre_mercado,I.nombre_insumo,IL.cantidad," +
            "convert(IL.fecha_ingreso,char(150)) fecha_ingresoInsumo " +
            "from lote as L inner join mercado as M on M.id_mercado = L.fk_id_mercado " +
            "inner join insumo_lote as IL on IL.fk_id_lote = L.id_lote " +
            "inner join insumo as I on IL.fk_id_insumo = I.id_insumo " +
            "where L.activo = 1 and L.fk_email_usuario = '"+email+"'"+oSqlLotes
        try {
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    /** HISTORIAL VOLTEOS POT LOTE REPORTE **/
    static async readReportSalidasLoteModel(lotes,email,fechaI,fechaF)
    {
        var oSqlLotes = ""
        var oSqlFechas = ""
        if(Array.isArray(lotes))
        {
            oSqlLotes = " and L.id_lote in ("+lotes+")"
        }

        if (fechaI != null && fechaF != null)
        {
            oSqlFechas = " and date(HL.fechaHistorial) between '"+fechaI+"' and '"+fechaF+"' "
        }

        var sql = "select L.nombre_lote,M.nombre_mercado,convert(HL.fechaHistorial,char(150)) fechaHistorial," +
            "HL.vTemperatura,HL.vHumedad,HL.vPh,HL.vOxigeno,HL.detalleHistorial from lote as L " +
            "inner join historial_lote as HL on L.id_lote = HL.FK_lote " +
            "inner join mercado as M on M.id_mercado = L.fk_id_mercado " +
            "where L.activo = 1 and L.fk_email_usuario = '"+email+"' " +oSqlLotes+oSqlFechas+
            " order by L.fechaIngreso,HL.fechaHistorial asc"

        try {
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }


}

module.exports = LoteModel