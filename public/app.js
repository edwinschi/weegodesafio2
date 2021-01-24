// Make a request for a user with a given ID

async function getDados() {
    
    const dados_cor_x_pal = await axios.get('/getgraurivalidade/cor_x_pal');
    const dados_cor_x_san = await axios.get('/getgraurivalidade/cor_x_san');

    return {
        dados_cor_x_pal: dados_cor_x_pal.data,
        dados_cor_x_san: dados_cor_x_san.data
    };
}



getDados().then((dados) => {

    document.getElementById("logs").innerHTML = "<a href='/getlog/" + dados.dados_cor_x_pal.log + "'>Log Corinthians x Palmeiras</a><br /><a href='/getlog/" + dados.dados_cor_x_san.log + "'>Log Corinthians x Santos</a>"
    document.getElementById("loader").style.display = "none";

    const drawChart = () => {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Times');
        data.addColumn('number', 'Grau de Rivalidade');
        data.addRows([
            ["Corinthiuans x Palmeiras", dados.dados_cor_x_pal.resultado],
            ["Corinthiuans x Santos", dados.dados_cor_x_san.resultado],
        ]);

        // Set chart options
        var options = {
            'title': 'Análise do grau de rivalidade',
            'legend': {
                position: 'top',
                maxLines: 3
            },
            hAxis: {
                minValue: 0
              },
            'width': 800,
            'height': 400
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    google.charts.load('current', {
        'packages': ['corechart']
    });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);
});