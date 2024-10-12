import con from "./connection.js";

export async function inserirNota(nota){

    const comando = ` 
    
    insert into tb_diario (dt_dia, ds_conteudo, id_usuario)
    values (?, ?, ?)
    
    `;

    let response = await con.query(comando, [nota.dia, nota.conteudo, nota.usuario]);

    let info = response[0];

    let id = info.insertId;

    return id;

}


export async function consultarNota(idUsuario){

    const comando = ` 
    
    select 
    id_diario       idDiario,
    dt_dia          dia,
    ds_conteudo     conteudo,
    id_usuario      usuario
    from tb_diario
    where id_usuario = ?
    
    `;

    let response = await con.query(comando, [idUsuario]);

    let registros = response[0];

    return registros;

}

//Id
export async function consultarNotaPorId(id){

    const comando = ` 
    
    select 
    id_diario       idDiario,
    dt_dia          dia,
    ds_conteudo     conteudo,
    id_usuario      usuario
    from tb_diario
    where id_diario = ?
    
    `;

    let response = await con.query(comando, [id]);

    let registros = response[0];

    let nota = registros[0];

    return nota;
    
}


export async function alterarNota(nota, id) {

    const comando = `
    
        update tb_diario
        set dt_dia = ?,
            ds_conteudo = ?,
            id_usuario = ?
        where id_diario = ?

    `;

    let response = await con.query(comando, [nota.dia, nota.conteudo, nota.usuario, id]);

    let info = response[0];

    let linhasAfetadas = info.affectedRows;

    return linhasAfetadas;

}

export async function deletarNota(id){

    const comando = `
    
    delete from tb_diario
    where id_diario = ?

    `;

    let response = await con.query(comando, [id]);

    let info = response[0];

    let linhasAfetadas = info.affectedRows;

    return linhasAfetadas;
}