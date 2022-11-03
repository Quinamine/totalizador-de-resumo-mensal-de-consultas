
"use strict";

const referencia = {
    retornarNumDeLinha(celulaFocada) {
        let celulaFocada_e_celulasIrmas = celulaFocada.parentElement.children;
        let celulaFocadaIndex;
        for (let i = 0; i < celulaFocada_e_celulasIrmas.length; i++) {
            if(celulaFocada_e_celulasIrmas[i] === celulaFocada) {
                celulaFocadaIndex = i;
            }
        }
        const numLinhaOutput = document.querySelector("output.ref-de-linha");
        numLinhaOutput.textContent = celulaFocadaIndex+1;
    },

    retornarSexoEIdade(celulaFocada) {
        const celulaFocadaParent = celulaFocada.parentElement;
        const celulaFocadaGrandParent = celulaFocadaParent.parentElement;
        const celulaFocadaParent_n_siblings = celulaFocadaGrandParent.querySelectorAll("div.inputs-container");

        let celulaFocadaParentIndex;
        for (let i = 0; i < celulaFocadaParent_n_siblings.length; i++) {
            if(celulaFocadaParent_n_siblings[i] === celulaFocadaParent) {
                celulaFocadaParentIndex = i; 
            }
        }
        
        const sexos = ["M", "F"];
        const faixasEtarias = ["0 - 11 meses", "1 - 4 anos", "5 - 14 anos", "15 - 24 anos", "25 - 59 anos", "&ge; 60 anos"];

        const sexoOutput = document.querySelector("output.ref-de-sexo");
        const faixaEtariaOutput = document.querySelector("output.ref-de-faixa-etaria");

        if((celulaFocadaParentIndex + 1) % 2 === 0) {
            sexoOutput.textContent = sexos[0];
        } else {
            sexoOutput.textContent = sexos[1];
        }

        if(celulaFocadaParentIndex < 2) celulaFocadaParentIndex = 0;
        else if(celulaFocadaParentIndex < 4) celulaFocadaParentIndex = 1;
        else if(celulaFocadaParentIndex < 6) celulaFocadaParentIndex = 2;
        else if(celulaFocadaParentIndex < 10) celulaFocadaParentIndex = 3;
        else if(celulaFocadaParentIndex < 12) celulaFocadaParentIndex = 4;
        else if(celulaFocadaParentIndex < 14) celulaFocadaParentIndex = 5;
        faixaEtariaOutput.innerHTML = faixasEtarias[celulaFocadaParentIndex];
    }, 

    resetarReferencia() {
        const referencias = document.querySelectorAll("div.coluna-de-referencia output");
        for (const ref of referencias) {
            ref.textContent = "";
        }
    }
}

window.addEventListener("load", () => {
    // INVOCAÇÃO DAS FUNÇÕES 
    inputCels.forEach ( cel => {
        if(!cel.matches("[readonly]")) {
            cel.addEventListener("focusin", () => {
                referencia.retornarNumDeLinha(cel);
                referencia.retornarSexoEIdade(cel);
            });

            cel.addEventListener("focusout", () => {
                referencia.resetarReferencia();
            });
        }
    });
});

// MOSTRAR OU OMITIR LINHA DE REFERENCIA
window.addEventListener("scroll", () => {
    const referencia = document.querySelector("div.linha-de-referencia");
    const boundingReference = document.querySelector(".bounding-reference");
    let PosicaoDaFicha = boundingReference.getBoundingClientRect().bottom;

    PosicaoDaFicha < 0 ?
        referencia.classList.add("off") : 
        referencia.classList.remove("off");
});