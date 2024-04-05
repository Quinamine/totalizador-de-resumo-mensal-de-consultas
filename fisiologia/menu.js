"use strict"

var keyPrefix = "trmc";
var pCs = keyPrefix;

const menu = {
    realcarTotaisSe(condicao) {
        const totais = document.querySelectorAll("[readonly]");
        for (const t of totais) {
            if(condicao) {
                t.classList.add("--realcar-totais");
                localStorage.setItem(`${pCs}-realcarTotais`, "true");
            } else {
                t.classList.remove("--realcar-totais");
                localStorage.removeItem(`${pCs}-realcarTotais`);
            }
        }
    },

    irParaLinha() {
        return {
            dialogBox: document.querySelector(".dialog-box-ir-para"),
            inputNumLinha: document.querySelector(".dialog-box-ir-para__input-linha"),
            numerosDeLinha: document.querySelectorAll(".ficha__num-de-linha"),

            abrirDialogBox() { 
                menu.irParaLinha().dialogBox.classList.add("--open");
                menu.irParaLinha().inputNumLinha.value = "";
                menu.irParaLinha().inputNumLinha.focus();
            },

            fecharDialogBox() {
                menu.irParaLinha().dialogBox.classList.remove("--open");
                menu.irParaLinha().removeLnHighlight();
            },

            goToLn(numLinha) {
                if(numLinha < 1 || numLinha > 53) {
                    const noFoundMsg = "Nenhuma linha correspondente. Certifique-se de que o número digitado esteja no intervalo de 1 à 53."
                    const retornoJSoutput = document.querySelector(".dialog-box__retornos-js-output");
                    retornoJSoutput.textContent = noFoundMsg;
                    retornoJSoutput.parentElement.classList.add("--open");
                    this.removeLnHighlight();

                } else {
                    numLinha = Number(numLinha) - 1;

                    this.highlightLnFound(this.numerosDeLinha[numLinha]);

                    if(window.innerWidth > 1304) {
                        numLinha -= 3;
                     }
                   
                    numLinha > 3 ? 
                        this.numerosDeLinha[numLinha].scrollIntoView() 
                        : document.body.scrollIntoView();
                    
                }
            },

            highlightLnFound(lnFound) {
                this.removeLnHighlight();
                lnFound.classList.add("--highlight");
            },

            removeLnHighlight() {
                for(const num of this.numerosDeLinha) {
                    num.classList.remove("--highlight");
                }
            }
        }
    },

    esvaziarFicha() {
        return {  
            dialogBox: document.querySelector(".dialog-box-esvaziar-ficha"),
            abrirDialogBox() { 
                menu.esvaziarFicha().dialogBox.classList.add("--open");
            },

            fecharDialogBox() {
                menu.esvaziarFicha().dialogBox.classList.remove("--open");
            },

            confirmar() {
                const gridInputs  = document.querySelectorAll("[data-subtotaleixox], [readonly]");
                const dadosAdicionais__checkboxes = document.querySelectorAll("[data-inputadicionalid]");
       

                for (const gi of gridInputs) {
                    gi.value = "";
                }

                for (const cb of dadosAdicionais__checkboxes) {                    
                    if(cb.checked) {
                        let id = cb.dataset.inputadicionalid;
                        document.getElementById(`${id}`).value = "";
                    }
                }
                menu.esvaziarFicha().fecharDialogBox();
            }
        }
    },

    imprimirFicha() {
        const comentarios = document.querySelector(".ficha__campo-de-nota");
        comentarios.value === "" && comentarios.classList.add("--no-print");
        window.print()
    },

    abrirArtigo(artigo) {
        const artigoSobre = document.querySelector(".artigo-sobre");
        const artigoAjuda = document.querySelector(".artigo-ajuda");

        artigo === "sobre" ? 
        artigoSobre.classList.add("--open") : 
        artigoAjuda.classList.add("--open");
    },

    fecharArtigo(artigo) {
        const artigoSobre = document.querySelector(".artigo-sobre");
        const artigoAjuda = document.querySelector(".artigo-ajuda");

        artigo === "sobre" ? 
        artigoSobre.classList.remove("--open") : 
        artigoAjuda.classList.remove("--open");
    }
}


function eventos() {
    // REALCAR TOTAIS
    const checkboxRealcarTotais = document.getElementById("checkbox-realcar-totais");
    const cRt = checkboxRealcarTotais;
    cRt.addEventListener("change", () => cRt.checked ? menu.realcarTotaisSe(1) : menu.realcarTotaisSe(0));

    // Realcar totais no load do windows 
    if(localStorage.getItem(`${pCs}-realcarTotais`)) {
        checkboxRealcarTotais.setAttribute("checked", "checked");
        menu.realcarTotaisSe(1);
    }

    // IR PARA LINHA
    const btnAbrirIrPara = document.querySelector(".header__nav__btn-ir-para");
    btnAbrirIrPara.addEventListener("click", menu.irParaLinha().abrirDialogBox);

    const btnFecharIrPara = document.querySelector(".dialog-box-ir-para__btn");
    btnFecharIrPara.addEventListener("click", menu.irParaLinha().fecharDialogBox);

    const inputNumLinha = document.querySelector(".dialog-box-ir-para__input-linha");
    inputNumLinha.addEventListener("input", () => {
        inputNumLinha.value !== "" ? 
            menu.irParaLinha().goToLn(inputNumLinha.value) 
            : menu.irParaLinha().removeLnHighlight();
    });

    // Fechar dialog-boxes-default
    const btnsFecharDialogBox = document.querySelectorAll(".dialog-box-default__btn");
    btnsFecharDialogBox.forEach( btn => {
        btn.addEventListener("click", () => {
            let btnParent = btn.parentElement;
            btnParent.parentElement.classList.remove("--open");
        });
    });

    // ESVAZIAR FICHA 
    const btnEsvaziarFicha = document.querySelector(".header__nav__btn-esvaziar-ficha");
    btnEsvaziarFicha.addEventListener("click", menu.esvaziarFicha().abrirDialogBox);

    const btnCancelar = document.querySelector(".dialog-box-esvaziar-ficha__btn-cancelar");
    btnCancelar.addEventListener("click", menu.esvaziarFicha().fecharDialogBox);

    const btnConfirmar = document.querySelector(".dialog-box-esvaziar-ficha__btn-confirmar");
    btnConfirmar.addEventListener("click", menu.esvaziarFicha().confirmar);

    // IMPRIMIR 
    const btnImprimir = document.querySelector(".header__nav__btn-imprimir");
    btnImprimir.addEventListener("click", menu.imprimirFicha);

    // Artigos
    const btnAbrirSobre = document.querySelector(".header__nav__btn-sobre");
    btnAbrirSobre.addEventListener("click", () => menu.abrirArtigo("sobre"));

    const btnFecharSobre = document.querySelector(".artigo-sobre__btn-fechar")
    btnFecharSobre.addEventListener("click", () => menu.fecharArtigo("sobre"));

    const btnAbrirAjuda = document.querySelector(".header__nav__btn-ajuda");
    btnAbrirAjuda.addEventListener("click", () => menu.abrirArtigo("ajuda"));

    const btnFecharAjuda = document.querySelector(".artigo-ajuda__btn-fechar")
    btnFecharAjuda.addEventListener("click", () => menu.fecharArtigo("ajuda"));

};

window.addEventListener("load", eventos);