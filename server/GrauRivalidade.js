var fs = require('fs');
var os = require("os");

module.exports = class GrauRivalidade {
    
    constructor(dados, titulo,configuracoes = null) {
        this.configuracoes = configuracoes;        
        this.dados = dados;

        
        this.arquivo_log_nome = "log_"+titulo+"_"+Date.now()+".txt";
        this.arquivo_log = "logs/"+this.arquivo_log_nome;

        if (!fs.existsSync("./logs")){
            fs.mkdirSync("./logs");
        }

        fs.openSync("./"+this.arquivo_log, "w+");
    }

    calcular(){
        
        let pontos = 0;
        let empates = 0;
        let total_pontos = 0;
            
        this.dados.forEach((jogo, index)=>{
            
            this.nlLog();
            this.addLog(index+" - Jogo: "+jogo.data+" - "+jogo.campeonato);
            this.addLog(jogo.time1+" X "+jogo.time2);
            this.addLog("Resultado: "+jogo.resultado+" ("+jogo.placar+")");
            this.addLog("Rodada: "+jogo.rodada);
            
    
            let valor_jogo = 1;
            if(this.configuracoes){
                if(this.configuracoes.peso_adicional){
    
                    if(this.configuracoes.peso_adicional.rodadas){
                        if(this.configuracoes.peso_adicional.rodadas[jogo.rodada]){
    
                            this.addLog("Peso adicional por rodada("+jogo.rodada+"): "+this.configuracoes.peso_adicional.rodadas[jogo.rodada]);
                            valor_jogo += this.configuracoes.peso_adicional.rodadas[jogo.rodada];
                        }
                    }
    
                    if(this.configuracoes.peso_adicional.campeonatos){
                        Object.keys(this.configuracoes.peso_adicional.campeonatos).forEach((campeonato)=>{
                            //console.log("campeonato",campeonato);                            
                            var rgxp = new RegExp(campeonato, "gi");
                            if(rgxp.test(jogo.campeonato)){
    
                                this.addLog("Peso adicional por campeonato("+jogo.campeonato+" == "+campeonato+"): "+this.configuracoes.peso_adicional.campeonatos[campeonato]);
                                valor_jogo += this.configuracoes.peso_adicional.campeonatos[campeonato];
                            }
                        });                                         
                    }                                       
                }
            }  
    
            if(jogo.resultado === "V"){
                pontos += valor_jogo;           
            } else if(jogo.resultado === "E"){
                empates++;
            }
    
            this.addLog("Valor Jogo: "+valor_jogo);
    
            total_pontos += valor_jogo;
    
        })
    
        total_pontos -= empates;
    
        //Grau de rivalidade 1 dá-se quando ambos os times estão com 50% de vitória
        let porcetagem_resultados = pontos/(total_pontos); // calcula a porcentagem de vitorias do corinthians
        if(porcetagem_resultados > 0.5){ //se o corintians possui > 50% de vitorias usar as vitorias do outro time como base de calculo para não termos grau de rivlidade > 1
            porcetagem_resultados = 1-porcetagem_resultados;
        }
    
        let grau_rivalidade = porcetagem_resultados*2;

        this.nlLog();

        this.addLog("Grau de rivalidade calculado: "+grau_rivalidade);
        

        return parseFloat(grau_rivalidade.toFixed(2)*100);
    }

    getLog(){
        return this.arquivo_log_nome;
    }

    addLog(new_log){
        fs.appendFileSync(this.arquivo_log,new_log+ os.EOL);            
    }
    
    nlLog(){
        fs.appendFileSync(this.arquivo_log,os.EOL);    
        
    }
    
}