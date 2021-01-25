//#https://www.ogol.com.br/xray.php?equipa_id=2234&equipa_vs_equipa_id=2248&id_comp=0&ond=&grp=1&epoca_ini=0&page=1 cor x pal

//O site usa jQuery então via console consigo obter apenas os dados necessários para a análise de rivalidade e converte-los em JSON.
let rows = [];

$(".zztable.stats").last().find("tbody").find("tr").each((index,tr)=>{
    if($(tr).find(".zz-pagination").length == 0){
        let td_resultado = ($(tr).find("td")[0]);
        let td_data = $(tr).find("td")[1];
        let td_time1 = $(tr).find("td")[2];
        let td_placar = $(tr).find("td")[3];
        let td_time2 = $(tr).find("td")[4];
        let td_rodada = $(tr).find("td")[5];
        let td_campeonato = $(tr).find("td")[6];

        let resultado = $(td_resultado).find(".sign").html();
        let data = $(td_data).html();

        let time1 =  $(td_time1).find(".text").length?$(td_time1).find(".text").find("a"):$(td_time1).find("a");
        let casa_time1 = false;
        if($(time1).find("b").length > 0){
            time1 = $(time1).find("b").html();
            casa_time1 = true;

        } else {
            time1 = $(time1).html();
        }

        let placar = $(td_placar).find("a").html();

        let placar_split = placar.split("-");
        let placar_time1 = placar_split[0];
        let placar_time2 = placar_split[1];

        let time2 = $(td_time2).find(".text").length?$(td_time2).find(".text").find("a"):$(td_time2).find("a");
        let casa_time2 = false;
        if($(time2).find("b").length > 0){
            time2 = $(time2).find("b").html();
            casa_time2 = true;

        } else {
            time2 = $(time2).html();
        }

        let rodada = $(td_rodada).html();

        let campeonato = $(td_campeonato).find("a").html();
                
        
        rows.push({
            resultado,
            data,
            time1,
            placar_time1,
            casa_time1,
            placar,
            time2,
            placar_time2,
            casa_time2,
            rodada,
            campeonato
        });        
    }
    
})

console.log(JSON.stringify(rows));
