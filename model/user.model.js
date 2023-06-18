const  connDB = require("../config/conn")
class UserModel
{
    static async createUsuarioModel(email_usuario, nombres, apellido, cedula, telefono, contrasenia)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into usuario(email_usuario, nombres, apellido, cedula, telefono, contrasenia) " +
                "VALUES ('"+email_usuario+"','"+nombres+"','"+apellido+"','"+cedula+"','"+telefono+"',MD5('"+contrasenia+"'))"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            return false
        }
    }

    static async loginUsuarioModel(email,password)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select U.email_usuario,concat(U.nombres,' ',U.apellido) NombresApellidos," +
                "U.activeMercado,U.activeLote,U.activeHistorial,U.activeDespacho,U.activeReporte," +
                "U.activeNotificacion,U.activeRecordatorio,U.activeUsuarios,U.activeInsumo from usuario as U where " +
                "U.email_usuario = '"+email+"' and U.contrasenia = MD5('"+password+"') and U.estado = 1"
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async readAllUsuarioModel(){
        try {
            var conn = await connDB().promise()
            var sql = "select U.email_usuario,U.nombres,U.apellido,U.cedula,U.telefono,U.estado,activeMercado, activeLote, activeHistorial, activeDespacho, activeReporte, activeNotificacion, activeRecordatorio, activeUsuarios from usuario as U"
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async updatePasswordModel(email,pass){
        try {
            var conn = await connDB().promise()
            await conn.query("update usuario set contrasenia = MD5('"+pass+"') where email_usuario = '"+email+"'")
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async updateInfoUsuarioModel(nombres,apellido,cedula,telefono,estado,email_usuario){
        try {
            var conn = await connDB().promise()
            await conn.query("update usuario set nombres = '"+nombres+"',apellido = '"+apellido+"'," +
                "cedula = '"+cedula+"',telefono = '"+telefono+"',estado = "+estado+" where email_usuario = '"+email_usuario+"'")
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async updatePermisosUsuarioModel(activeMercado,activeLote, activeHistorial, activeDespacho,
                                     activeReporte, activeNotificacion, activeRecordatorio, activeUsuarios,activeInsumo,email)
    {
        try {
            var conn = await connDB().promise()
            await conn.query("update usuario set activeMercado = "+activeMercado+", activeLote = "+activeLote+", " +
                "activeHistorial = "+activeHistorial+",activeDespacho = "+activeDespacho+"," +
                "activeReporte = "+activeReporte+", activeNotificacion = "+activeNotificacion+", " +
                "activeRecordatorio = "+activeRecordatorio+",activeUsuarios = "+activeUsuarios+"," +
                "activeInsumo = "+activeInsumo+" where email_usuario = '"+email+"'")
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = UserModel