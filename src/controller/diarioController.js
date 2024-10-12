import * as db from '../repository/diarioRepository.js'

import { autenticar } from '../utils/jwt.js';

import { Router } from "express";
const endpoints = Router();

endpoints.post('/diario', autenticar, async (req, resp) => {

    try {

        let nota = req.body;

        let id = await db.inserirNota(nota);

        resp.send({

            idNota: id

        })

    }
    catch (err) {

        resp.status(400).send({
            erro: err.message
        })

    }

})


endpoints.get('/diario', autenticar, async (req, resp) => {

    try {

        let idUsuario = req.user.id;

        let registros = await db.consultarNota(idUsuario);

        resp.send(registros);

    }
    catch (err) {

        resp.status(400).send({
            erro: err.message
        })

    }

})

//Id
endpoints.get('/diario/:id', autenticar, async (req, resp) => {

    try {

        let id = req.params.id;

        let registros = await db.consultarNotaPorId(id);

        resp.send(registros);

    }
    catch (err) {

        resp.status(400).send({
            erro: err.message
        })

    }

})

endpoints.put('/diario/:id', autenticar, async (req, resp) => {

    try {

        let nota = req.body;

        let id = req.params.id;

        let linhasAfetadas = await db.alterarNota(nota, id);

        if (linhasAfetadas >= 1) {

            resp.send();

        }
        else{

            resp.status(404).send({error: 'Nenhuma nota alterada.'})
        }

    }
    catch (err) {

        resp.status(400).send({
            erro: err.message
        })

    }

})


endpoints.put('/diario/:id', autenticar, async (req, resp) => {

    try {

        let id = req.params.id;

        let linhasAfetadas = await db.deletarNota(id);

        if (linhasAfetadas >= 1) {

            resp.send();

        }
        else{

            resp.status(404).send({error: 'Nenhuma nota removida.'})
        }

    }
    catch (err) {

        resp.status(400).send({
            erro: err.message
        })

    }

})


export default endpoints;