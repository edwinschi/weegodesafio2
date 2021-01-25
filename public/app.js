// Make a request for a user with a given ID

async function getDados() {

    const dados_cor_x_pal = await axios.post('/get-grau-rivalidade',{
        origemdados: "cor_x_pal"
    });

    const dados_cor_x_san = await axios.post('/get-grau-rivalidade',{
        origemdados: "cor_x_san"
    });

    let configuracoes1 = {
        peso_adicional: {
            rodadas: {
                "F": 1.5, //final
                "SF": 1 //semi-final 
            }
        }
    }

    const dados_cor_x_pal_config1 = await axios.post('/get-grau-rivalidade', {
        origemdados: "cor_x_pal",
        configuracoes: configuracoes1
    });

    const dados_cor_x_san_config1 = await axios.post('/get-grau-rivalidade',{
        origemdados: "cor_x_san",
        configuracoes: configuracoes1
    });


    let configuracoes2 = {
        peso_adicional: {
            campeonatos: {
                "libertadores": 10
            }
        }
    }

    const dados_cor_x_pal_config2 = await axios.post('/get-grau-rivalidade', {
        origemdados: "cor_x_pal",
        configuracoes: configuracoes2
    });

    const dados_cor_x_san_config2 = await axios.post('/get-grau-rivalidade',{
        origemdados: "cor_x_san",
        configuracoes: configuracoes2
    });

    return [
        {
            dados_cor_x_pal: dados_cor_x_pal.data,
            dados_cor_x_san: dados_cor_x_san.data,
            titulo:'Análise do grau de rivalidade',
            color:'#64b5f6'
            
        },
        {
            dados_cor_x_pal: dados_cor_x_pal_config1.data,
            dados_cor_x_san: dados_cor_x_san_config1.data,
            titulo:'Análise do grau de rivalidade (Finais peso adicional 1.5 e Semi-finais peso adicional 1)',
            color:'#81c784'
        },
        {
            dados_cor_x_pal: dados_cor_x_pal_config2.data,
            dados_cor_x_san: dados_cor_x_san_config2.data,
            titulo:'Análise do grau de rivalidade (libertadores peso adicional 10)',
            color:'#9575cd'
        }
        
    ];
}

getDados().then((_dados) => {
    document.getElementById("loader").style.display = "none";

    _dados.forEach((dados,index)=>{
        console.log(dados);
        console.log(index);
        document.getElementById("logs"+index).innerHTML = "<a href='/get-log/" + dados.dados_cor_x_pal.log + "'>Log Corinthians x Palmeiras</a><br /><a href='/get-log/" + dados.dados_cor_x_san.log + "'>Log Corinthians x Santos</a>"
        const drawChart = () => {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Times');
            data.addColumn('number', 'Grau de Rivalidade');
            data.addRows([
                ["Corinthians x Palmeiras", dados.dados_cor_x_pal.resultado],
                ["Corinthians x Santos", dados.dados_cor_x_san.resultado],
            ]);

            // Set chart options
            var options = {
                'title': dados.titulo,
                'legend': {
                    position: 'top',
                    maxLines: 3
                },
                series: {
                    0: {
                      color:dados.color
                    }
                },
                hAxis: {
                    minValue: 0
                },
                'color': 'gray',
                'width': 800,
                'height': 400
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.BarChart(document.getElementById('chart_div'+index));
            chart.draw(data, options);
        }

        google.charts.load('current', {
            'packages': ['corechart']
        });

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

    });
    
});