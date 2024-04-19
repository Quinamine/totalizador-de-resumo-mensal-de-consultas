var keyPrefix = "trmc";

function desfoqueDoFundo(accao) {
    const desfoque = document.querySelector(".desfoque");
    accao === "desfocar" ? 
    desfoque.classList.add("on") :
    desfoque.classList.remove("on");
}

function alertarSobre(msg) {
    const dialogBoxDefault = document.querySelector(".dialog-box-default--width-s");
    const dialogBoxDefault__console = dialogBoxDefault.querySelector(".dialog-box--width-s__console");

    dialogBoxDefault__console.textContent = msg;

    clearInterval(btnAutoCloseLoop);
    let time = 15;
    const btn__outputTime = document.querySelector(".btn__output-autoclose-time");
    btn__outputTime.textContent = `(${time--}s)`;
    btnAutoCloseLoop = setInterval(() => {
        btn__outputTime.textContent = `(${time--}s)`;
        if(time < 0) {
            dialogBoxDefault.classList.remove("--open");
            clearInterval(btnAutoCloseLoop);
        }

    }, 1000);
    dialogBoxDefault.classList.add("--open");
}

function destacarCelulasSaturadas() {
    const celulas = document.querySelectorAll("[data-totalgeraleixox], [readonly]");

    let celulasSaturadas = 0;
    for(const c of celulas) {
        if(c.value.length > 7) {
            c.classList.add("celula-saturada");
            celulasSaturadas++;
        }
    }
    
    if(celulasSaturadas > 0) {
        setTimeout(() => {
            motivoDeSaturacao = document.querySelector(".details-motivo-de-red-cells");

            menu.abrirArtigo("ajuda");
            motivoDeSaturacao.setAttribute("open", "");
            motivoDeSaturacao.scrollIntoView();
        }, 2500);
    }  
}

function removerDestaqueDeRedCells() {
    const celulas = document.querySelectorAll("[data-totalgeraleixox], [readonly]");

    for (const c of celulas) c.classList.remove("celula-saturada");
}


const aqd = {
    mostrarAviso() {
        if(!sessionStorage.getItem(`${keyPrefix}-aviso-aqd`)) {
            const avisoDeAQD = document.querySelector(".dialog-box-alerta-sobre-aqd");
            setTimeout(() => avisoDeAQD.classList.add("--open"), 3000);
        }
    },

    salvarCiencia() {
        sessionStorage.setItem(`${keyPrefix}-aviso-aqd`, `user:aware`);
    }
}

function actualizarAno() {
    const tempo = new Date();
    anoActual = tempo.getFullYear();

    if(anoActual < 2022) anoActual = 2022;

    const currentYearOutput = document.querySelector(".footer__current-year");
    currentYearOutput.textContent = anoActual;
}

function sugerirMes() {
    const mesDatalist = document.getElementById("datalist-meses");
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const tempo = new Date();
    let mesIndex = tempo.getMonth();

    mesDatalist.innerHTML = `<option value="${meses[mesIndex]}"></option>`;
}

function formatarNumeros() {
    const numeros = document.querySelectorAll(".number-format");

    for (const n of numeros) {
        n.textContent = Number(n.textContent).toLocaleString();
    }
}

function animarJanelaAberta(event) {
    const janela = document.querySelector(".dialog-box-esvaziar-ficha");
    if(janela.matches(".--open")) {
        event === "mousedown" ? 
        janela.classList.add("--mexer") : 
        janela.classList.remove("--mexer");
    }
}

let btnAutoCloseLoop;
window.addEventListener("load", () => {
    const readonlyInputs = document.querySelectorAll("[readonly]");
    readonlyInputs.forEach ( input => input.addEventListener("click", () => {
        const readonlyInputsMsg = "Os totais estão inacessíveis para assegurar que não sejam modificados.";
        alertarSobre(readonlyInputsMsg);
    }));

    const gridInputs = document.querySelectorAll("[data-totalgeraleixox]");
    gridInputs.forEach (gi => gi.addEventListener("input", () => destacarCelulasSaturadas()));
    destacarCelulasSaturadas();

    
    aqd.mostrarAviso();
    const dialogBoxAQD__btn = document.querySelector(".dialog-box-aqd__btn");
    dialogBoxAQD__btn.addEventListener("click", aqd.salvarCiencia);

    // Actualizar o ano 
    actualizarAno();
    sugerirMes();
    formatarNumeros();

    // Animar Janela Aberta
    const desfoque = document.querySelector(".desfoque");
    desfoque.addEventListener("mousedown", event => animarJanelaAberta(event.type));
    desfoque.addEventListener("mouseup", event => animarJanelaAberta(event.type));

});
