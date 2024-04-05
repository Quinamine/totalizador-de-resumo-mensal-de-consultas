"use strict"

var prefixoChaveStorage = "trmc";
var pCs = prefixoChaveStorage;

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

            fecharDialogBox(x) {
                menu.irParaLinha().dialogBox.classList.remove("--open");

                const numerosDeLinha = menu.irParaLinha().numerosDeLinha;
                for (const num of numerosDeLinha) {
                    num.classList.remove("ficha__num-de-linha--highlight");
                }
            },

            goToLn(numLinha) {
                if(numLinha < 0 || numLinha > 53) {
                    const retornoJSoutput = document.querySelector(".dialog-box__retornos-js-output");
                    retornoJSoutput.textContent = "Nenhuma linha correspondente. Certifique-se de que o número esteja no intervalo de 1 à 53."
                    retornoJSoutput.parentElement.classList.add("--open");

                } else {
                    numLinhaModificado = numLinha - 3;

                    for (const num of this.numerosDeLinha) {
                        num.textContent == numLinhaModificado && num.scrollIntoView();
                        num.textContent == numLinha && num.classList.add("ficha__num-de-linha--highlight");
                    }
                }
            }
        }
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
    const btnIrPara = document.querySelector(".header__nav__btn-ir-para");
    btnIrPara.addEventListener("click", menu.irParaLinha().abrirDialogBox);

    const btnFecharIrPara = document.querySelector(".dialog-box-ir-para__btn");
    btnFecharIrPara.addEventListener("click", menu.irParaLinha().fecharDialogBox);

    const inputNumLinha = document.querySelector(".dialog-box-ir-para__input-linha");
    inputNumLinha.addEventListener("input", () => {
        menu.irParaLinha().goToLn(inputNumLinha.value);
    })
    
}

window.addEventListener("load", eventos);