"use strict"

const backup = {
    saveGridInputs() {
        const inputsCelulares = document.querySelectorAll("[data-totalgeraleixox]");

        for (let i = 0; i < inputsCelulares.length; i++) {
            
            inputsCelulares[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            });
            inputsCelulares[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
        
    },
    
    saveExtraInputs() {
        const inputsNaoCelulares = document.querySelectorAll(".input-nao-celular");
        inputsNaoCelulares.forEach( extraInput => {
            extraInput.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${extraInput.id}`, extraInput.value));
            extraInput.value = localStorage.getItem(`${keyPrefix}-${extraInput.id}`);
        });
    }
}

const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
        // Subtotal eixo x
        let classNameDosOperandos = inputTarget.dataset.subtotaleixox;
        inputTarget.classList.add(`${classNameDosOperandos}`);

        let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
        let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.subtotaleixoxoutput}`);
        celulaDeSaida.value = this.somar(operandos);

        // Total parcial
        classNameDosOperandos = inputTarget.dataset.totalparcialeixox;
        inputTarget.classList.add(`${classNameDosOperandos}`);

        operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
        celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalparcialeixoxoutput}`);
        celulaDeSaida.value = this.somar(operandos);
        
        // Total geral
        classNameDosOperandos = inputTarget.dataset.totalgeraleixox;
        inputTarget.classList.add(`${classNameDosOperandos}`);

        operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
        celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalgeraleixoxoutput}`);
        celulaDeSaida.value = this.somar(operandos);

        if(inputTarget.dataset.subtotaleixoy) {
            classNameDosOperandos = inputTarget.dataset.subtotaleixoy;
            inputTarget.classList.add(`${classNameDosOperandos}`);

            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.subtotaleixoyoutput}`);
            celulaDeSaida.value = this.somar(operandos);
        }

        if(inputTarget.dataset.totaleixoy) {
            classNameDosOperandos = inputTarget.dataset.totaleixoy;
            inputTarget.classList.add(`${classNameDosOperandos}`);

            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaleixoyoutput}`);
            celulaDeSaida.value = this.somar(operandos);
        }
    
        if(inputTarget.dataset.totalparcialeixoy) {
            classNameDosOperandos = inputTarget.dataset.totalparcialeixoy;
            inputTarget.classList.add(`${classNameDosOperandos}`);

            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalparcialeixoyoutput}`);
            celulaDeSaida.value = this.somar(operandos);
        }
    
        if(inputTarget.dataset.totalgeraleixoy) {
            classNameDosOperandos = inputTarget.dataset.totalgeraleixoy;
            inputTarget.classList.add(`${classNameDosOperandos}`);

            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalgeraleixoyoutput}`);
            celulaDeSaida.value = this.somar(operandos);
        }
    },
    
    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    }
}


function escutarEventos() {
    const inputsCelulares = document.querySelectorAll("[data-totalgeraleixox]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("input", () => totalizador.filtrarEtotalizarCelulas(inputCelular));
        inputCelular.value !== "" && totalizador.filtrarEtotalizarCelulas(inputCelular);
    });
}

window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




