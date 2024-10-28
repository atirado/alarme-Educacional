
const connection = require('../config/db');

const dotenv = require('dotenv').config();


async function bluetooth(request, response) {
    
    const params = [
        request.body.nome_dos_dispositivos
    ];

    
    const query = "INSERT INTO conectados (nome_dos_dispositivos) VALUES (?)";

    
    connection.query(query, params, (err, results) => {
       
        console.log(err, results);

        
        if (results) {
           
            response.status(201).json({
                success: true,
                message: "enviado",
                data: results
            });
        } else {
            
            response.status(400).json({
                success: false,
                message: "enviado",
                data: err
            });
        }
    });
}


module.exports = {
    bluetooth 
};
