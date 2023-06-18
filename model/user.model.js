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
                "U.activeNotificacion,U.activeRecordatorio from usuario as U where " +
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
            var sql = "select U.email_usuario,U.nombres,U.apellido,U.cedula,U.telefono,U.estado from usuario as U"
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }
}

module.exports = UserModel