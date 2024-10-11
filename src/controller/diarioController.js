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

        let registros = await db.consultarNota();

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

        if (linhasAfetadas == 0) {

            throw new Error('Nenhuma nota alterada.');

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

        if (linhasAfetadas == 0) {

            throw new Error('Nenhuma nota removida.');

        }

    }
    catch (err) {

        resp.status(400).send({
            erro: err.message
        })

    }

})


export default endpoints;