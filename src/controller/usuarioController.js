import * as db from '../repository/usuarioRepository.js' 

import { gerarToken } from '../utils/jwt.js';
import { autenticar } from '../utils/jwt.js';

import { Router } from "express";
const endpoints = Router();


endpoints.post('/cadastrar', async (req, resp) => {

    try {
    
        let usuario = req.body;

        let id = await db.inserirUsuario(usuario);

        resp.send({

            idUsuario: id
            
        })

    } 
    catch(err){

        resp.status(400).send({
            erro: err.message
        })
        
    }

})



endpoints.post('/entrar', async (req, resp) => {

    try {
    
        let usuario = req.body;

        let login = await db.validarUsuario(usuario);

        if(login == null){

            resp.send({ erro: 'Usuário ou senha incorreto(s).' });

        }
        else{

            let token = gerarToken(login);

            resp.send({

                "token": token

            })

        }

    } 
    catch(err){

        resp.status(400).send({
            erro: err.message
        })
        
    }

})


endpoints.get('/usuarios', autenticar, async (req, resp) => {

    try {
    
        let registros = await db.consultarUsuario();

        resp.send(registros);

    } 
    catch(err){
        
        resp.status(400).send({
            erro: err.message
        })

    }

})

export default endpoints;