const sessaoWeb = {
    verDisponiilidade: () => sessionStorage.getItem("trmc-session") ? "defined" : "undefined",

    mostrarAviso: () => aviso.classList.add("on"),

    omitirAviso: () => aviso.classList.remove("on"),

    criarSessao: () => sessionStorage.setItem("trmc-session", "on")
}

let aviso;
window.addEventListener("load", () => {

    aviso = document.querySelector("div.aviso-de-uso-de-cookies");
    const btnAceitar = document.querySelector("button.aceitar-cookies");

    if(sessaoWeb.verDisponiilidade() === "undefined") {
        setTimeout(sessaoWeb.mostrarAviso, 2000);

        btnAceitar.addEventListener("click", () => {
            sessaoWeb.criarSessao();
            sessaoWeb.omitirAviso();
        })
    }
})