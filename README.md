<br />
<p align="center">
  <h3 align="center">Weego - Desafio 2</h3>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>      
      <ul>
        <a href="#o-desafio">O desafio</a>
      </ul>
      <ul>
        <a href="#solucao-proposta">Solução proposta</a>
        <ul>
            <li><a href="#solucao-exemplo-1">Exemplo 1</a></li>
            <li><a href="#solucao-exemplo-2">Exemplo 2</a></li>
            <li><a href="#peso-adicional">Peso Adicional (Rodadas e/ou Campeonatos mais relevantes)</a></li>            
        </ul>
      </ul>
      <ul>
        <a href="#origem-dos-dados">Origem dos dados</a>
      </ul>
    </li>
    <li>
      <a href="#tecnologias">Tecnologias Utilizadas</a>      
    </li>
    <li>
      <a href="#iniciando">Iniciando</a>
      <ul>
        <li><a href="#pre-requisitos">Pre-Rquisitos</a></li>
        <li><a href="#instação">Instação</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## O Desafio

Dado o cenário onde, times de futebol possuem diferentes graus de rivalidade entre si, construa um algoritmo que valide a hipótese de que o Corinthians possui uma rivalidade maior com o Palmeiras do que com o Santos.

## Solucao Proposta

A solução proposta parte da premissa base que o grau de rivalidade entre dois time é 100% quando a porcentagem de vitória/derrota está em 50% descontando os empates

### Solucao Exemplo 1
Exemplo 1:

Corinthians e Palmeiras jogaram 100 vezes , onde 40 vitorias para o conrinthians e 40 para o palmeira e 20 empates:

Assim o corintthians tem 40 pontos acumulados (1 por vitoria)

porcentagem de resultados = 40/(100-20)
porcentagem de resultados = 0.5;

grau de rivalidade = 0.5*2
grau de rivalidade = 1 ou 100%


### Solucao Exemplo 2

Corinthians e Palmeiras jogaram 100 vezes , onde 60 vitorias para o conrinthians e 40 para o palmeiras:

porcentagem de resultados = 60/(100)
porcentagem de resultados = 0.6

se a porcentagem de vitorias for maior que 0.5 utilizamos a porcentagem de vitórias do palmeiras (0.4)

grau de rivalide = 0.4*2
grau de rivaldiade = 0.8 ou 80%

Ou seja , quanto mais proximo de 50% de pontos para cada time , maior o grau de rivalidade.

### Peso Adicional

Porém como o grau de rivalidade entre times é algo subjetivo , adiconei a possibilidade de configurar o valor de cada jogo dependendo da etapa ou campeonato:

Exemplo de configuração:

```json
configuracoes = {
    "peso_adicional": {
        "rodadas": {
            "F": 1.5, //final
            "SF": 1 //semi-final 
        },
        "campeonatos": {
            "libertadores": 10
        }
    }
}
```

Nesse exemplo, jogos que são finais terao um peso adicionar de 1.5 , totalizando 2.5 (1 da vitoria + 1.5) pontos no calculo, 2 para a semifinal e para jogos da libertarores 11 pontos.

Algoritimo de cálculos: /src/GrauRivalidade.js

## Origem dos Dados

Os dados obtidos para os testes nesse desafio foram obtidos do site:

    https://www.ogol.com.br/confronto_equipas.php

Para obter os dados que eram em tabela html em um formato em json com uma estrutura para realizar os cálculos, criei um algoritimo em jQuery (utilizado pelo site).

   código em /src/CrawlerCode.js

   Dados em json: /data/data_cor_x_pal.json e /data/data_cor_x_san.json

## Tecnologias

- NodeJS (Algoritimo e código backend)
- ExpressJS (Para servir os dados para o frontend)
- Bootstrap4 (Para criar rapidamente a estrutura html do frontend)
- Google Chart para geração dos gráficos
- Axios para realizar as requisições HTTP para obter dados cálculados

<!-- GETTING STARTED -->
## Iniciando

### Pré Requisitos

1. Node (v12.18.3)
2. Npm (6.14.6)

### Instalação

1. git clone https://github.com/edwinschi/weegodesafio2.git
2. npm install
3. node index.js
4. acessar http://localhost:3000/
