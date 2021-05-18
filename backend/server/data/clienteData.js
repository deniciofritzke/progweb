const database = require('../database/database');
const sql = `select c.*,
case when cp.cli_codigo is null then 'PJ' else 'PF' end tipo_documento,
case when cp.cli_codigo is null then cp2.cli_pj_cnpj else cp.cli_pf_cpf end documento,
ec.end_tipo_cod, te.end_tipo_descricao,
e.end_codigo, e.end_logradouro, e.end_endereco, ec.cli_endereco_numero, e.end_bairro, 
e.end_cep, e.cid_codigo, c2.cid_nome, c2.uf_codigo, u.uf_sigla, tel.tel_tipo_cod, tt.tel_tipo_descricao,
tel.cli_telefone_ddd, tel.cli_telefone_numero 
from cliente c 
left join cliente_pf cp on (cp.cli_codigo = c.cli_codigo)
left join cliente_pj cp2 on (cp2.cli_codigo = c.cli_codigo)
left join (select cli_codigo, max(end_tipo_cod) as end_tipo_cod, max(end_codigo) as end_codigo from endereco_cliente group by cli_codigo) xend on (xend.cli_codigo = c.cli_codigo)
left join endereco_cliente ec on (ec.cli_codigo = c.cli_codigo and ec.end_codigo = xend.end_codigo and ec.end_tipo_cod = xend.end_tipo_cod)
left join endereco e on (e.end_codigo = ec.end_codigo)
left join cidade c2 on (c2.cid_codigo = e.cid_codigo)
left join uf u on (u.uf_codigo = c2.uf_codigo)
left join tipo_endereco te on (te.end_tipo_cod = ec.end_tipo_cod)
left join (select cli_codigo, max(tel_tipo_cod) as tel_tipo_cod from cliente_telefone group by cli_codigo) xtel on (xtel.cli_codigo = c.cli_codigo)
left join cliente_telefone tel on (tel.cli_codigo = c.cli_codigo and tel.tel_tipo_cod = xtel.tel_tipo_cod)
left join tipo_telefone tt on (tt.tel_tipo_cod = tel.tel_tipo_cod)`;

exports.getClientes = function () {
    return database.query(sql);
}

exports.getCliente = function (clienteID) {
    return database.query(sql + ' where c.cli_codigo = $1', [clienteID]);
}

exports.deleteCliente = (clienteID) => {
    return database.none('delete from cliente where cli_codigo = $1', [clienteID]);
}

exports.saveCliente = async (cliente) => {
    const cli = await database.one('insert into cliente (cli_nome) values ($1) returning cli_codigo',
        [cliente.cli_nome]);

    if (cliente.cli_documento.length > 11) { // Esse é o tamanho de um CNPJ
        while (cliente.cli_documento.length < 14) {
            cliente.cli_documento = '0' + cliente.cli_documento;
        }
        console.log(cliente.cli_documento);
        const doc = cliente.cli_documento.substring(0, 2) + '.' + cliente.cli_documento.substring(2, 5) + '.' + cliente.cli_documento.substring(5, 8) + '/' + cliente.cli_documento.substring(8, 12) + '-' + cliente.cli_documento.substring(12, 14);
        console.log('Formatado PJ: ' + doc);
        database.none('insert into cliente_pj (cli_codigo, cli_pj_cnpj) values ($1, $2)', [cli.cli_codigo, doc]);
    }
    else {
        while (cliente.cli_documento.length < 11) {
            cliente.cli_documento = '0' + cliente.cli_documento;
        }
        console.log(cliente.cli_documento);
        const doc = cliente.cli_documento.substring(0, 3) + '.' + cliente.cli_documento.substring(3, 6) + '.' + cliente.cli_documento.substring(6, 9) + '-' + cliente.cli_documento.substring(9, 11);
        console.log('Formatado PF: ' + doc);
        database.none('insert into cliente_pf (cli_codigo, cli_pf_cpf) values ($1, $2)', [cli.cli_codigo, doc]);
    }


    cliente.enderecos.forEach(e => {
        database.none('insert into endereco_cliente (cli_codigo, end_codigo, end_tipo_cod, cli_endereco_numero, cli_endereco_complemento) values ($1, $2, $3, $4, $5)',
            [cli.cli_codigo, e.end_codigo, e.end_tipo_cod, e.cli_endereco_numero, e.cli_endereco_complemento]);
    });


    cliente.telefones.forEach(e => {
        database.none('insert into cliente_telefone (cli_codigo, tel_tipo_cod, cli_telefone_ddd, cli_telefone_numero) values ($1, $2, $3, $4)',
            [cli.cli_codigo, e.tel_tipo_cod, e.cli_telefone_ddd, e.cli_telefone_numero]);
    });

    return cli;
}