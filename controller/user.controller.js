const UserModel = require('../model/user.model')
class UserController
{
    static async createUsuarioController(email_usuario, nombres, apellido, cedula, telefono, contrasenia){
        return await UserModel.createUsuarioModel(email_usuario, nombres, apellido, cedula, telefono, contrasenia)
    }

    static async loginUsuarioModel(email,password){
        return await UserModel.loginUsuarioModel(email,password)
    }

    static async readAllUsuarioController(){
        return await UserModel.readAllUsuarioModel()
    }
}

module.exports = UserController