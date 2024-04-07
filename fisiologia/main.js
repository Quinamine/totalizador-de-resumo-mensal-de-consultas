"use strict"

const backup = {
    saveGridInputs() {
        const gridInputs = document.querySelectorAll("[data-totalgeraleixox]");

        for (let i = 0; i < gridInputs.length; i++) {
            
            gridInputs[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, gridInputs[i].value);
            });
            gridInputs[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
        
    },
    
    saveExtraInputs() {
        const extraInputs = document.querySelectorAll(".input-adicional");
        extraInputs.forEach( input => {
            input.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${input.id}`, input.value));
            input.value = localStorage.getItem(`${keyPrefix}-${input.id}`);
        });
    }
}

const totalizador = {
    filtrarCelulas(input) {
        input.classList.add(`${input.dataset.subtotaleixox}`);
        input.classList.add(`${input.dataset.totalparcialeixox}`);
        input.classList.add(`${input.dataset.totalgeraleixox}`);

        // Subtotal eixo x
        const subtotalEixox = document.querySelectorAll(`.${input.dataset.subtotaleixox}`);
        const subtotalEixoxoutput = document.querySelector(`.${input.dataset.subtotaleixoxoutput}`);
        subtotalEixoxoutput.value = this.somar(subtotalEixox);
    
        // Total parcial
        const totalParcialEixox = document.querySelectorAll(`.${input.dataset.totalparcialeixox}`);
        const totalParcialEixoxoutput = document.querySelector(`.${input.dataset.totalparcialeixoxoutput}`);
        totalParcialEixoxoutput.value = this.somar(totalParcialEixox);
    
        // Total Geral 
        const totalGeralEixox = document.querySelectorAll(`.${input.dataset.totalgeraleixox}`);
        const totalGeralEixoxoutput = document.querySelector(`.${input.dataset.totalgeraleixoxoutput}`);
        totalGeralEixoxoutput.value = this.somar(totalGeralEixox);
    
        if(input.dataset.subtotaleixoy) {
            input.classList.add(`${input.dataset.subtotaleixoy}`);
            const subtotalEixoy = document.querySelectorAll(`.${input.dataset.subtotaleixoy}`);
            const subtotalEixoyOutput = document.querySelector(`.${input.dataset.subtotaleixoyoutput}`);
            subtotalEixoyOutput.value = this.somar(subtotalEixoy);
        }
    
        if(input.dataset.totalparcialeixoy) {
            input.classList.add(`${input.dataset.totalparcialeixoy}`);
            const totalParcialEixoy = document.querySelectorAll(`.${input.dataset.totalparcialeixoy}`);
            const totalParcialEixoyOutput = document.querySelector(`.${input.dataset.totalparcialeixoyoutput}`);
            totalParcialEixoyOutput.value = this.somar(totalParcialEixoy);
        }
    
        if(input.dataset.totalgeraleixoy) {
            input.classList.add(`${input.dataset.totalgeraleixoy}`);
            const totalGeralEixoy = document.querySelectorAll(`.${input.dataset.totalgeraleixoy}`);
            const totalGeralEixoyOutput = document.querySelector(`.${input.dataset.totalgeraleixoyoutput}`);
            totalGeralEixoyOutput.value = this.somar(totalGeralEixoy);
        }
    
        if(input.dataset.totaleixoy) {
            input.classList.add(`${input.dataset.totaleixoy}`);
            const totalEixoy = document.querySelectorAll(`.${input.dataset.totaleixoy}`);
            const totalEixoyOutput = document.querySelector(`.${input.dataset.totaleixoyoutput}`);
            totalEixoyOutput.value = this.somar(totalEixoy);
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
    const gridInputs = document.querySelectorAll("[data-totalgeraleixox]");
    gridInputs.forEach( gi => {
        gi.addEventListener("input", () => totalizador.filtrarCelulas(gi));
        gi.value !== "" && totalizador.filtrarCelulas(gi);
    });
}

window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




