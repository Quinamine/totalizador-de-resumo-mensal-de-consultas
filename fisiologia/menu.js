"use strict";
const menu = {
    destacarFundoDeTotais() {
        for (let e of readonlyCels)
            readonlyCelsDarker.checked ? e.classList.add("bg-gray") : e.classList.remove("bg-gray")
    },
    mostrarCaixaDePesquisa() {
        srcContainer.classList.add("on"),
        srcInput.focus(),
        srcInput.select()
    },
    omitirCaixaDePesquisa() {
        srcContainer.classList.remove("on"),
        srcInput.value = "",
        this.resetarFundoDoNumeroDaLinha()
    },
    pesquisarLinha(e) {
        if ("" === e)
            return this.resetarFundoDoNumeroDaLinha(),
            !1;
        if (e < 1 || e > 53) {
            let o = document.querySelector("div.caixa-de-alerta.query-out-of-range");
            o.querySelector("b.entered-num").textContent = e,
            o.classList.add("on"),
            srcInput.setAttribute("readonly", ""),
            desfoqueDoFundo.on(),
            this.resetarFundoDoNumeroDaLinha()
        } else {
            let t = e - 1;
            if (rowNumbers[t].getBoundingClientRect().bottom < 0 || rowNumbers[t].getBoundingClientRect().top > window.innerHeight) {
                if (t < 3) {
                    let r = document.querySelector("body");
                    r.scrollIntoView()
                } else
                    rowNumbers[t - 3].scrollIntoView()
            }
            this.resetarFundoDoNumeroDaLinha(),
            rowNumbers[t].classList.add("fundo-laranja")
        }
    },
    resetarFundoDoNumeroDaLinha() {
        for (let e of rowNumbers)
            e.classList.remove("fundo-laranja")
    },
    esvaziamento() {
        let e = document.querySelector("div.caixa-de-confirmacao")
          , o = document.querySelectorAll("div.inputs-container input");
        return {
            mostrarCaixaDeConfirmacao() {
                let t = 0;
                for (let r of o)
                    "" != r.value && t++;
                if (t > 0)
                    e.classList.add("on"),
                    desfoqueDoFundo.on();
                else {
                    let a = document.querySelector("div.caixa-de-alerta.ficha-vazia");
                    a.classList.add("on"),
                    desfoqueDoFundo.on()
                }
            },
            omitirCaixaDeConfirmacao() {
                e.classList.remove("on"),
                desfoqueDoFundo.off()
            },
            limparDados() {
                for (let e = 0; e < o.length; e++)
                    o[e].value = "",
                    "undefined" != typeof Storage && localStorage.removeItem(`trmc-cel${e}`),
                    inputValidation.adicionarOuRemoverFundoVermelho(o[e], "-");
                let t = document.querySelectorAll("ul.limpadores-de-dados-adicionais input");
                t.forEach(e=>{
                    if (e.checked) {
                        let o = e.dataset.for
                          , t = document.querySelector(`#${o}`);
                        t.value = "",
                        "undefined" != typeof Storage && localStorage.removeItem(`trmc-${o}`),
                        ("nome-da-us" === o || "nota" === o) && t.classList.remove("bold")
                    }
                }
                ),
                desfoqueDoFundo.off()
            }
        }
    },
    imprimirFicha() {
        "" === textArea.value ? textArea.parentElement.classList.add("no-print") : textArea.parentElement.classList.remove("no-print"),
        window.print()
    },
    abrirArtigoSobre() {
        document.querySelector("section#sobre").classList.add("on"),
        desfoqueDoFundo.on()
    },
    abrirArtigoCookies() {
        document.querySelector("section#cookies").classList.add("on"),
        desfoqueDoFundo.on(),
        window.innerWidth < 1024 && document.querySelector("body").classList.add("--body--overflow-hidden")
    },
    salvarComoPdf() {
        window.innerWidth < 1024 ? this.imprimirFicha() : (document.querySelector("section#conversao-pdf").classList.add("on"),
        desfoqueDoFundo.on())
    }
}
  , desfoqueDoFundo = {
    on() {
        divDesfocante.classList.add("on")
    },
    off() {
        let e = document.querySelectorAll("div.caixa-de-confirmacao, div.caixa-de-alerta, div.hamburguer")
          , o = 0;
        for (let t of e)
            t.classList.contains("on") && o++;
        if (o > 0)
            return !1;
        divDesfocante.classList.remove("on")
    }
};
let readonlyCelsDarker, readonlyCels, srcContainer, srcInput, rowNumbers, textArea, hamburguer, divDesfocante;
function init() {
    readonlyCelsDarker = document.querySelector("#readonlyinputs-darker"),
    readonlyCels = document.querySelectorAll("input[readonly]"),
    srcContainer = document.querySelector("div.caixa-de-pesquisa"),
    srcInput = document.querySelector("div.caixa-de-pesquisa input.pesquisar-linha"),
    rowNumbers = document.querySelectorAll("div.coluna-de-enumeracao-das-linhas span"),
    textArea = document.querySelector("textarea#nota"),
    hamburguer = document.querySelector("div.hamburguer"),
    divDesfocante = document.querySelector("div.desfoque")
}
function eventListeners() {
    readonlyCelsDarker.addEventListener("change", ()=>menu.destacarFundoDeTotais());
    let e = document.querySelector("button.ir-para")
      , o = document.querySelector("div.caixa-de-pesquisa button.fechar");
    e.addEventListener("click", ()=>menu.mostrarCaixaDePesquisa()),
    o.addEventListener("click", ()=>menu.omitirCaixaDePesquisa()),
    srcInput.addEventListener("keyup", ()=>menu.pesquisarLinha(srcInput.value));
    let t = document.querySelectorAll("div.caixa-de-alerta button");
    for (let r of t)
        r.addEventListener("click", ()=>{
            r.parentElement.classList.remove("on"),
            srcInput.removeAttribute("readonly"),
            srcInput.select(),
            desfoqueDoFundo.off()
        }
        );
    readonlyCels.forEach(e=>{
        e.addEventListener("click", ()=>{
            if (e.matches(".nao-aplicavel")) {
                let o = document.querySelector("div.caixa-de-alerta.indicador-nao-aplicavel")
                  , t = o.querySelector("span.sexo-output");
                o.classList.add("on"),
                e.parentElement.matches(".sexo-m") ? t.textContent = "masculino" : t.textContent = "feminino"
            } else
                document.querySelector("div.caixa-de-alerta.restricao-de-acesso-celular").classList.add("on");
            desfoqueDoFundo.on()
        }
        )
    }
    );
    let a = document.querySelector("button.esvaziar-ficha");
    a.addEventListener("click", ()=>menu.esvaziamento().mostrarCaixaDeConfirmacao());
    let s = document.querySelector("button.cancelar");
    s.addEventListener("click", ()=>menu.esvaziamento().omitirCaixaDeConfirmacao());
    let i = document.querySelector("button.confirmar");
    i.addEventListener("click", ()=>{
        menu.esvaziamento().limparDados(),
        menu.esvaziamento().omitirCaixaDeConfirmacao()
    }
    );
    let n = document.querySelector("button.imprimir");
    n.addEventListener("click", ()=>menu.imprimirFicha());
    let l = document.querySelector("button.abrir-artigo-sobre");
    l.addEventListener("click", ()=>menu.abrirArtigoSobre()),
    "#sobre" === location.hash && menu.abrirArtigoSobre();
    let d = document.querySelector("button.abrir-artigo-cookies");
    d.addEventListener("click", ()=>menu.abrirArtigoCookies());
    let c = document.querySelectorAll("button.fechar-artigo");
    c.forEach(e=>{
        e.addEventListener("click", ()=>{
            e.parentElement.classList.remove("on"),
            desfoqueDoFundo.off(),
            document.querySelector("body").classList.remove("--body--overflow-hidden")
        }
        )
    }
    );
    let u = document.querySelector("section#cookies")
      , m = u.querySelector("h1")
      , f = u.querySelector("button.fechar-artigo");
    u.addEventListener("scroll", ()=>{
        m.getBoundingClientRect().top <= 0 ? (m.classList.add("sticky"),
        f.classList.add("with-h1-sticky")) : (m.classList.remove("sticky"),
        f.classList.remove("with-h1-sticky"))
    }
    ),
    document.querySelector("button.salvar-como-pdf").addEventListener("click", ()=>menu.salvarComoPdf());
    let v = {
        title: "Totalizador de Resumo Mensal de Consultas",
        text: "O Totalizador de Resumo Mensal de Consultas \xe9 um servi\xe7o online gratuito que auxilia na elabora\xe7\xe3o do resumo mensal de consultas externas, atrav\xe9s do c\xe1lculo autom\xe1tico dos subtotais e totais a partir dos dados preenchidos pelo usu\xe1rio (Profissional de Sa\xfade).",
        url: "https://quinamine.github.io/totalizador-de-resumo-mensal-de-consultas/index.html"
    }
      , y = document.querySelector("button.partilhar");
    y.addEventListener("click", ()=>{
        try {
            navigator.share(v).then(()=>{
                console.log("Endere\xe7o do totalizador partilhado com sucesso.")
            }
            ).catch(e=>{
                console.log(`N\xe3o foi poss\xedvel partilhar devido ao erro: ${e}.`)
            }
            )
        } catch (e) {
            console.log("O seu navegador n\xe3o tem suporte ao m\xe9todo 'navigator.share()'.")
        }
    }
    )
}
window.addEventListener("keyup", e=>{
    if ("enter" === e.key.toLowerCase()) {
        let o = document.querySelectorAll("div.caixa-de-alerta");
        o.forEach(e=>{
            e.matches(".on") && (e.classList.remove("on"),
            srcInput.removeAttribute("readonly"),
            srcInput.select(),
            desfoqueDoFundo.off())
        }
        )
    }
}
),
window.addEventListener("load", ()=>{
    init(),
    eventListeners()
}
);
