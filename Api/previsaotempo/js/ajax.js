$(function () {
    const tbodyPrinc = $('#tbPrincipal');
    const tbodyProx = $('#tbProximos');
    const combo = $('#estados');
    const comboCid = $('#cidades');
    const btn = $('#buscarbtn');

    function obterDados() {
        $.ajax('https://servicodados.ibge.gov.br/api/v1/localidades/estados', {
            type: 'GET',
            data: { orderBy: "nome" },
            beforeSend: function () {
                combo.append('<option name="XX" value="XX" selected="true">Aguarde...carregando UF</option>');
            },
            error: function () {
                combo.append('<option name="XX" value="XX" selected="true">Erro...falha ao carregar UF</option>');
            },
            success: function (dadosUF) {
                CarregaUF(dadosUF);
            }
        })
    }

    function CarregaUF(dadosUF) {
        combo.empty();
        combo.append(`<option name="XX" value="XX" selected="true">Selecione o estado (UF)</option>`);
        $.each(dadosUF, (i, element) => {
            combo.append(`<option name="${element.sigla}" value="${element.id}">${element.nome}</option>`);
        })

        combo.on('change', () => {
            let uf = $('#estados option:selected').val();
            if (uf != "XX") {
                buscaCidades(uf);
            }

        })
    }

    function buscaCidades(_uf) {
        $.ajax(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${_uf}/municipios`, {
            type: 'GET',
            data: { orderBy: "nome" },
            beforeSend: function () {
                comboCid.append('<option name="XX" value="XX" selected="true">Aguarde...carregando cidades</option>');
            },
            error: function () {
                comboCid.append('<option name="XX" value="XX" selected="true">Erro...falha ao carregar cidades</option>');
            },
            success: function (dadosCidades) {
                CarregaCidades(dadosCidades);
            }
        })
    }

    function CarregaCidades(_dados) {
        comboCid.empty();
        comboCid.append(`<option value="XX" selected="true">Selecione a cidade</option>`);
        $.each(_dados, (i, element) => {
            comboCid.append(`<option value="${element.id}">${element.nome}</option>`);
        })

    }

    btn.on('click', function (e) {
        let uf = $('#estados option:selected').attr('name');
        let cid = $('#cidades option:selected').text();
        let propData = { format: "json-cors", key: "3083660e", city_name: cid + ',' + uf };
        //console.log(propData);

        $.ajax('https://api.hgbrasil.com/weather', {
            type: 'GET',
            origin: 'https://www.cursos.sesisenai.org.br',
            data: propData,
            beforeSend: function () {
                $('.table').after('<p class="loading">Aguarde! carregando...</p>');
            },
            error: function () {
                $('.table').after('<p class="loading">Problemas ao carregar dados</p>');
            },
            success: function (dadosTempo) {
                mostrarDados(dadosTempo);
            },
            complete: function () {
                $('.loading').remove();
            }
        })
    })

    function mostrarDados(_dadosTempo) {
        //console.log(_dadosTempo);
        // Dados principais/ Dados do dia de hoje
        limpaTabelas();
        console.log(_dadosTempo.results);
        tbodyPrinc.append(`<tr>
                      <td>${_dadosTempo.results.time}</td>
                      <td>${_dadosTempo.results.temp}°</td>
                      <td>${_dadosTempo.results.description}</td>
                      <td>${_dadosTempo.results.humidity}%</td>
                      <td>${_dadosTempo.results.currently}</td>
                      <td>${_dadosTempo.results.sunrise}</td>
                      <td>${_dadosTempo.results.sunset}</td>
                    </tr>`);

        // Próximos dias
        $.each(_dadosTempo.results.forecast, (i, elTempo) => {
            tbodyProx.append(`<tr>
                          <th scope="row">${elTempo.weekday}</th>
                          <td>${elTempo.date}</td>
                          <td>${elTempo.min}°</td>
                          <td>${elTempo.max}°</td>
                          <td>${elTempo.description}</td>
                        </tr>`);
        })
    }

    function limpaTabelas() {
        $('#tbPrincipal tr').remove();
        $('#tbProximos tr').remove();
    }

    obterDados();
});
