"use strict";

const storage  = {
    salvarFicha() {
        for (let i = 0; i < inputCels.length; i++) {
            // Salvar
            inputCels[i].addEventListener("input", () => localStorage.setItem(`trmc-cel${i}`, `${inputCels[i].value}`));
            // Restaurar
            inputCels[i].value = localStorage.getItem(`trmc-cel${i}`);
        }
    },

    salvarDadosAdicionais() {
        const dadosAdicionais = document.querySelectorAll("div.container input[type=text], input[type=date], textarea#nota");

        dadosAdicionais.forEach ( dado => {
            dado.addEventListener("input", () => localStorage.setItem(`trmc-${dado.id}`, `${dado.value}`));
            dado.value = localStorage.getItem(`trmc-${dado.id}`);

            function denegrirTexto(txt) {
                txt.value !== "" ? 
                txt.classList.add("bold") : 
                txt.classList.remove("bold");
            }

            if(dado.matches("#nota")) {
                dado.addEventListener("input", () => denegrirTexto(dado));
                denegrirTexto(dado); // NO LOAD DO WINDOWS 
            } else if(dado.matches(".h1-de-trmc")) {
                dado.addEventListener("input", () => denegrirTexto(dado));
                denegrirTexto(dado); // NO LOAD DO WINDOWS 
            }
        });
    },

    salvarDestaqueDeTotais() {
        readonlyCelsDarker.addEventListener("change", () => {
            readonlyCelsDarker.checked ?
            localStorage.setItem("trmc-destaque", "on") : 
            localStorage.removeItem("trmc-destaque");
        });

        // NO LOAD DO WINDOWS
        if(localStorage.getItem("trmc-destaque")) {
            readonlyCelsDarker.setAttribute("checked", "");
            menu.destacarFundoDeTotais();
        }; 
    }
}

const totalizacao = {
    filtrarCelulas(cel) {
        if(cel.dataset.subtotal) {
            cel.classList.add(`${cel.dataset.subtotal}`);

            let subtotal = document.querySelectorAll(`.${cel.dataset.subtotal}`);
            let subtotalOutput = document.querySelector(`.${cel.dataset.subtotaloutput}`);

            this.totalizarCelulas(subtotal, subtotalOutput);
        }

        if(cel.dataset.totaldeconsultaseixoy) {
            cel.classList.add(`${cel.dataset.totaldeconsultaseixoy}`);

            let totalDeConsultasEixoY = document.querySelectorAll(`.${cel.dataset.totaldeconsultaseixoy}`);
            let totalDeConsultasOutput = document.querySelector(`.${cel.dataset.totaldeconsultasoutput}`);

            this.totalizarCelulas(totalDeConsultasEixoY, totalDeConsultasOutput);
        }

        if(cel.dataset.subtotaldetotaldeconsultas) {
            cel.classList.add(`${cel.dataset.subtotaldetotaldeconsultas}`);

            let subtotalDeTotalDeConsultas = document.querySelectorAll(`.${cel.dataset.subtotaldetotaldeconsultas}`);
            let subtotalDeTotalDeConsultasOutput = document.querySelector(`.${cel.dataset.subtotaldetotaldeconsultasoutput}`);

            this.totalizarCelulas(subtotalDeTotalDeConsultas, subtotalDeTotalDeConsultasOutput);
        }

        if(cel.dataset.totalporsexo) {
            cel.classList.add(`${cel.dataset.totalporsexo}`);

            let totalPorSexo = document.querySelectorAll(`.${cel.dataset.totalporsexo}`);
            let totalPorSexoOutput = document.querySelector(`.${cel.dataset.totalporsexooutput}`);

            this.totalizarCelulas(totalPorSexo, totalPorSexoOutput);
        }

        if(cel.dataset.totalgeral) {
            cel.classList.add(`${cel.dataset.totalgeral}`);

            let totalGeral = document.querySelectorAll(`.${cel.dataset.totalgeral}`);
            let totalGeralOutput = document.querySelector(`.${cel.dataset.totalgeraloutput}`);

            this.totalizarCelulas(totalGeral, totalGeralOutput);
        }

        if(cel.dataset.totalporsexodetotaldeconsultas) {
            cel.classList.add(`${cel.dataset.totalporsexodetotaldeconsultas}`);

            let totalPorSexoDeTotalDeConsultas = document.querySelectorAll(`.${cel.dataset.totalporsexodetotaldeconsultas}`);
            let totalPorSexoDeTotalDeConsultasOutput = document.querySelector(`.${cel.dataset.totalporsexodetotaldeconsultasoutput}`);

            this.totalizarCelulas(totalPorSexoDeTotalDeConsultas, totalPorSexoDeTotalDeConsultasOutput);
        }

        if(cel.dataset.totalgeraldetotaldeconsultas) {
            cel.classList.add(`${cel.dataset.totalgeraldetotaldeconsultas}`);

            let totalGeralDeTotalDeConsultas = document.querySelectorAll(`.${cel.dataset.totalgeraldetotaldeconsultas}`);
            let totalGeralDeTotalDeConsultasOutput = document.querySelector(`.${cel.dataset.totalgeraldetotaldeconsultasoutput}`);

            this.totalizarCelulas(totalGeralDeTotalDeConsultas, totalGeralDeTotalDeConsultasOutput);
        }         
    },

    totalizarCelulas(celulasPorTotalizar, celulaDeSaida) {
        let total = 0;
        for (const cel of celulasPorTotalizar) {
            total+=Number(cel.value);
        }
        celulaDeSaida.value = total;
    }
}

function escutarEventos() {
    // TOTALIZACAO
    inputCels.forEach( cel => {
        cel.addEventListener("input", () => totalizacao.filtrarCelulas(cel)); // T
        cel.value != "" && totalizacao.filtrarCelulas(cel); // No Load do Windows
    });
}

window.addEventListener("load", () => {
    storage.salvarFicha();
    storage.salvarDadosAdicionais();
    storage.salvarDestaqueDeTotais();
    escutarEventos();
});