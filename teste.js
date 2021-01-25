var fs = require('fs');

var GrauRivalidade = require("./src/GrauRivalidade");
/*
const configuracoes = {
    peso_adicional:{
        rodadas:{
            "F":0,
            "SF":0
        },
        campeonatos:{
            "brasileirão":0
        }
    }
}
*/

let raw_data_cor_x_pal = fs.readFileSync('./data/data_cor_x_pal.json');
let data_cor_x_pal = JSON.parse(raw_data_cor_x_pal);
let grau_cor_x_pal = new GrauRivalidade(data_cor_x_pal, "cor_x_pal" ); //, configuracoes
let resultado_cor_x_pal = grau_cor_x_pal.calcular();

let raw_data_cor_x_san = fs.readFileSync('./data/data_cor_x_san.json');
let data_cor_x_san = JSON.parse(raw_data_cor_x_san);
let grau_cor_x_san = new GrauRivalidade(data_cor_x_san, "cor_x_san"); // , configuracoes
let resultado_cor_x_san = grau_cor_x_san.calcular();

if(resultado_cor_x_pal > resultado_cor_x_san){
    console.log("A rivalidade entre corinthians e palmeiras ("+resultado_cor_x_pal+"%) é maior que a rivalidade entre corinthians e santos ("+resultado_cor_x_san+"%)");
} else {
    console.log("A rivalidade entre corinthians e santos ("+resultado_cor_x_san+"%) é maior que a rivalidade entre corinthians e palmeiras ("+resultado_cor_x_pal+"%)");
}


