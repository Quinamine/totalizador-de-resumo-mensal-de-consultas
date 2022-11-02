"use strict";

const validacao = {

    validarInput: () => {
        for (const cel of inputCels) {
            let numAlgarismos = cel.value.length;   
            numAlgarismos > 7 ? 
            cel.classList.add("fundo-vermelho") :
            cel.classList.remove("fundo-vermelho");
        }
    },

    mostrarAlertaVermelho: () => {
        if(!sessionStorage.getItem("trmc-alertaVermelho")) {
            alertaVermelho.classList.add("on");
            desfoqueDoFundo.on()
        }
    },

    fecharAlertaVermelho: () => {
        alertaVermelho.classList.remove("on");
        desfoqueDoFundo.off()
    },

    salvarPreferenciaNaoMostrarMais: () => {
        const checkboxPreference = document.querySelector("#nao-mostrar-mais");
        if(checkboxPreference.checked) {
            sessionStorage.setItem("trmc-alertaVermelho", "nao-mostrar-mais");
        } else {
            sessionStorage.removeItem("trmc-alertaVermelho");
        }
    }
}

// VARIÁVEIS GLOBAIS
let inputCels, alertaVermelho;
function inicializacao() {
    inputCels = document.querySelectorAll("div.inputs-container input");
    alertaVermelho = document.querySelector("div.razao-pelas-celulas-com-fundo-vermelho");
}

function eventos() {
    // VALIDAR INPUT NO EVENTO DE ENTRADA DE DADOS
    inputCels.forEach ( cel => {
        cel.addEventListener("input", () => {
            validacao.validarInput();

            // Mostrar alerta se a 'cel' ficar vermelha ou a sua celula de saida de total parcial ou geral
            let celTotalParcialOutput = document.querySelector(`.${cel.dataset.subtotaloutput}`);
            let celTotalGeralOutput = document.querySelector(`.${cel.dataset.totalgeraloutput}`);

            if (cel.matches(".fundo-vermelho") || celTotalParcialOutput.matches(".fundo-vermelho") 
            || celTotalGeralOutput.matches(".fundo-vermelho"))  {
                    setTimeout(() => {
                        validacao.mostrarAlertaVermelho();
                    }, 2500);
                }
         });
    });

    // FECHAR ALERTA VERMELHO
    const btnFecharAlertaVermelho = document.querySelector("button.close-redcels-obs");
    btnFecharAlertaVermelho.addEventListener("click", () => {
        validacao.fecharAlertaVermelho();
        validacao.salvarPreferenciaNaoMostrarMais();
    });
}

window.addEventListener("load", () => {
    inicializacao();
    eventos();
    validacao.validarInput();
});