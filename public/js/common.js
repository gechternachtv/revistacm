console.log('Desenvolvido por: Gabriel Echternacht')
async function graphqlQuery(queryBody) {
    return (await fetch('/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: queryBody
        })
    })).json()
}



class headerComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `

        <!-- MAIN HEAD -->
        <header class="main-head">
            <div class="max-container">
                <div id="menuToggle">
    
                    <input type="checkbox" />
    
    
                    <span></span>
                    <span></span>
                    <span></span>
    
                    <ul id="menu">
                        <li><a href="#">uma revista da Memória da Eletricidade</a></li>
                        <li><a href="/colaboradores">colaboradores</a></li>
                        <li><a href="/edicoes">revistas anteriores</a></li>
                        <li><a href="/edicoes">revistas em PDF</a></li>
                        <li><a href="#">fale conosco</a></li>
                        <li class="sociais">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-whatsapp"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-facebook-square"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="container-logo">
                    <a href="/"><img src="img/logo.png" alt="Logo" class="logo" /></a>
                </div>
    
    
            </div>
            <!-- NAVBAR -->

        </header>
    
    
           `;

    }
}

window.customElements.define(`header-component`, headerComponent)







class navComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <!-- NAVBAR -->

            <nav class="menu-container">
                <div>
                    <ul class="main-menu">
    
                        <li><a href="/colaboradores">colaboradores</a></li>
                        <li><a href="/edicoes">revistas anteriores</a></li>
                        <li><a href="#">fale conosco</a></li>
    
                    </ul>
                    <ul>
                        <li class="sociais">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-whatsapp"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-facebook-square"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>

    
    
           `;

    }
}

window.customElements.define(`nav-component`, navComponent)










class footerComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `

        <footer>
        <div class="max-container ">
            <section class="footer-links">
                <ul>

                    <li><a href=""> colaboradores </a></li>
                    <li><a href="">revistas anteriores</a></li>
                    <li><a href="">fale conosco</a></li>

                </ul>
                <ul>
                    <li><a href="">revistando</a></li>
                    <li><a href="">dossie</a></li>
                    <li><a href="">entrevista</a></li>
                    <li><a href="">artigos livres</a></li>
                    <li><a href="">por dentro do documento</a></li>
                    <li><a href="">resenhas</a></li>
                    <li><a href="">comunicando</a></li>

                </ul>
            </section>
            <section class="memorial">
                <img src="" alt="">
            </section>
            <section class="instituidores">
                <header>
                    <h2>Instituidores e Mantenedores</h2>
                </header>
                <article>
                    <img loading="lazy" src="img/Marca_-_ABCE.png" alt="">
                    <img loading="lazy" src="img/Marca_-_CEMIG.png" alt="">
                    <img loading="lazy" src="img/Marca_-_LIGHT.png" alt="">
                    <img loading="lazy" src="img/Marca_-_CEEE.png" alt="">
                    <img loading="lazy" src="img/Marca_-_ITAIPU.png" alt="">
                    <img loading="lazy" src="img/Marca_-_ELETROBRAS.png" alt="">


                </article>
            </section>
        </div>
    </footer>
           `;

    }
}

window.customElements.define(`footer-component`, footerComponent);








// class lazyImg extends HTMLElement {
//     constructor() {
//         super();
//           let observer = new IntersectionObserver(e=>{
//             console.log('tinkle tinkle hoy!', e);

//                     setTimeout(()=>{
//                         this.outerHTML = `
//                         <img src="${this.getAttribute('src')}">
//                     `;
//                     },2000)

//             }, 
//               {
//                 rootMargin: "0px 0px 150px 0px",
//               });

//           observer.observe(this)
//     }
// }

// window.customElements.define(`lazy-img`, lazyImg);