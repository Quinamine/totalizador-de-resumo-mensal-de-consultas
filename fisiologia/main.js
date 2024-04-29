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
        const extraInputs = document.querySelectorAll(".input-nao-celular");
        extraInputs.forEach( extraInput => {
            extraInput.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${extraInput.id}`, extraInput.value));
            extraInput.value = localStorage.getItem(`${keyPrefix}-${extraInput.id}`);
        });
    }
}

const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
        inputTarget.classList.add(`${inputTarget.dataset.subtotaleixox}`);
        inputTarget.classList.add(`${inputTarget.dataset.totalparcialeixox}`);
        inputTarget.classList.add(`${inputTarget.dataset.totalgeraleixox}`);

        // Subtotal eixo x
        const subtotalEixox = document.querySelectorAll(`.${inputTarget.dataset.subtotaleixox}`);
        const subtotalEixoxoutput = document.querySelector(`.${inputTarget.dataset.subtotaleixoxoutput}`);
        subtotalEixoxoutput.value = this.somar(subtotalEixox);
    
        // Total parcial
        const totalParcialEixox = document.querySelectorAll(`.${inputTarget.dataset.totalparcialeixox}`);
        const totalParcialEixoxoutput = document.querySelector(`.${inputTarget.dataset.totalparcialeixoxoutput}`);
        totalParcialEixoxoutput.value = this.somar(totalParcialEixox);
    
        // Total Geral 
        const totalGeralEixox = document.querySelectorAll(`.${inputTarget.dataset.totalgeraleixox}`);
        const totalGeralEixoxoutput = document.querySelector(`.${inputTarget.dataset.totalgeraleixoxoutput}`);
        totalGeralEixoxoutput.value = this.somar(totalGeralEixox);
    
        if(inputTarget.dataset.subtotaleixoy) {
            inputTarget.classList.add(`${inputTarget.dataset.subtotaleixoy}`);
            const subtotalEixoy = document.querySelectorAll(`.${inputTarget.dataset.subtotaleixoy}`);
            const subtotalEixoyOutput = document.querySelector(`.${inputTarget.dataset.subtotaleixoyoutput}`);
            subtotalEixoyOutput.value = this.somar(subtotalEixoy);
        }
    
        if(inputTarget.dataset.totalparcialeixoy) {
            inputTarget.classList.add(`${inputTarget.dataset.totalparcialeixoy}`);
            const totalParcialEixoy = document.querySelectorAll(`.${inputTarget.dataset.totalparcialeixoy}`);
            const totalParcialEixoyOutput = document.querySelector(`.${inputTarget.dataset.totalparcialeixoyoutput}`);
            totalParcialEixoyOutput.value = this.somar(totalParcialEixoy);
        }
    
        if(inputTarget.dataset.totalgeraleixoy) {
            inputTarget.classList.add(`${inputTarget.dataset.totalgeraleixoy}`);
            const totalGeralEixoy = document.querySelectorAll(`.${inputTarget.dataset.totalgeraleixoy}`);
            const totalGeralEixoyOutput = document.querySelector(`.${inputTarget.dataset.totalgeraleixoyoutput}`);
            totalGeralEixoyOutput.value = this.somar(totalGeralEixoy);
        }
    
        if(inputTarget.dataset.totaleixoy) {
            inputTarget.classList.add(`${inputTarget.dataset.totaleixoy}`);
            const totalEixoy = document.querySelectorAll(`.${inputTarget.dataset.totaleixoy}`);
            const totalEixoyOutput = document.querySelector(`.${inputTarget.dataset.totaleixoyoutput}`);
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
        gi.addEventListener("input", () => totalizador.filtrarEtotalizarCelulas(gi));
        gi.value !== "" && totalizador.filtrarEtotalizarCelulas(gi);
    });
}

window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




