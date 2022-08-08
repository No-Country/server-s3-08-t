const { request, response } = require("express");
const Users = require("../models/users");

const authController = async (req = request, res = response) => {
    const { userName, password } = req.body;

    try {
        const user = await Users.findOne({
            userName
        });
        if(!user) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            })
        };
        const passw = await Users.findOne({
            password
        });
        if(passw != password) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            })
        };
        res.status(200).json({
            msg: 'Succes',
            userName, password
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
}

module.exports = authController;