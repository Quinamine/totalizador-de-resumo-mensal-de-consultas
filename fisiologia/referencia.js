"use strict"

const referencia = {
    retornarIndicador(input) {
        const inputParent__childreen = input.parentElement.children;
        const indicadores = document.querySelectorAll(".ficha__indicador");
        const indicadorOutput = document.querySelector(".reference-row__output-indicador");


        let inputIndex;
        for (let i in inputParent__childreen) {
            if(input === inputParent__childreen[i]) inputIndex = i;
        }
        
        let indicador = indicadores[inputIndex].textContent;
        indicadorOutput.value = indicador;
        if(indicadores[inputIndex].dataset.prefixo) {
            let prefixo = indicadores[inputIndex].dataset.prefixo;
            indicadorOutput.value = `${prefixo} ${indicador}`;
        }
    },

    retornarFaixaEtaria(input) {
        const faixaEtariaOutput = document.querySelector(".reference-row__output-idade");

        let faixaEtaria = input.parentElement.dataset.faixaetaria;
        faixaEtariaOutput.value = faixaEtaria;
    },

    retornarSexo(input) {
        const faixaEtariaOutput = document.querySelector(".reference-row__output-sexo");

        let sexo = input.parentElement.dataset.sexo;
        faixaEtariaOutput.value = sexo;
    },

    retornarVazio() {
        const outputs = document.querySelectorAll(".reference-row__output");
        for (const o of outputs) o.value = "";
    }
}

function events() {
    const gridInputs = document.querySelectorAll("[data-totalgeraleixox]");
    gridInputs.forEach( gi => {
        gi.addEventListener("focus", () => {
            referencia.retornarIndicador(gi);
            referencia.retornarFaixaEtaria(gi);
            referencia.retornarSexo(gi);
        });
    });

    gridInputs.forEach( gi => gi.addEventListener("focusout", referencia.retornarVazio));
}

window.onload = events;