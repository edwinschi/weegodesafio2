const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000
const path = require('path');

const GrauRivalidade = require("./server/GrauRivalidade");

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname + '/public/index.html'));    
})

app.use(express.static(path.join(__dirname, 'public')));

app.get('/getGraurivalidade/:origemdados', (req, res) => {
    
    let titulo = req.params.origemdados;
    let dados = fs.readFileSync('./data/data_'+titulo+'.json');
    let json_dados = JSON.parse(dados);
    let grauObj = new GrauRivalidade(json_dados, titulo ); //, configuracoes
    let resultado = grauObj.calcular();

    res.json({ resultado, log: grauObj.getLog(), titulo });
})

app.get('/getlog/:file(*)', function(req, res, next){
    var filePath = path.join(__dirname, 'logs', req.params.file);
  
    res.download(filePath, function (err) {
        if (!err) return; // Arquivo Enviado
        if (err.status !== 404) return next(err); // non-404 error
        // Arquivo não encontrado
        res.statusCode = 404;
        res.send('Não foi possível obter o arquivo de log!');
    });
});
  

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})