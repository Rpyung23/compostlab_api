const  connDB = require("../config/conn")
class MercadoModel
{
    static async createMercadoModel(nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into mercado(nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado) VALUES " +
                "('"+nombre_mercado+"','"+encargado_mercado+"','"+email_mercado+"','"+telefono_mercado+"','"+dire_mercado+"')"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            return false
        }
    }

    static async readAllMercadoModel()
    {
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select * from mercado")
            await conn.end()
            return datos[0];
        }catch (e) {
            return []
        }
    }

    static async readAllMercadoActiveModel()
    {
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select * from mercado where estado = 1")
            await conn.end()
            return datos[0];
        }catch (e) {
            return []
        }
    }
}

module.exports = MercadoModel