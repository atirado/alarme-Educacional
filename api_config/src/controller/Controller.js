

const connection = require('../config/db');


async function storeUser(request, response) {
    const query = 'INSERT INTO cadastro(nome, usuario, senha) VALUES(?, ?, ?)';

   
    const params = Array(
        request.body.nome,    
        request.body.usuario, 
        request.body.senha    
    );


    connection.query(query, params, (err, results) => {

        try {
            
            if (results) {
               
                response
                    .status(201)
                    .json({
                        success: true,
                        message: `Sucesso! Usuário cadastrado.`,
                        data: results 
                    });
            } else {
                
                response
                    .status(400)
                    .json({
                        success: false,
                        message: `Não foi possível realizar o cadastro. Verifique os dados informados`,
                        query: err.sql,       
                        sqlMessage: err.sqlMessage 
                    });
            }
        } catch (e) { 
            response.status(400).json({
                success: false, 
                message: "Ocorreu um erro. Não foi possível cadastrar usuário!",
                query: err.sql,       
                sqlMessage: err.sqlMessage 
            });
        }
    });
}


module.exports = {
    storeUser
}
