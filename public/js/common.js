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
                        <li><a href="/apresentacao">Apresentação</a></li>
                        <li><a href="/expediente">Expediente</a></li>
                        <li><a href="/colaboradores">Colaboradores</a></li>
                        <li><a href="/edicoes">Edições anteriores</a></li>
                        <li><a href="/categoria">Seções</a></li>
                        <li><a href="/fale-conosco">Fale conosco</a></li>
                        <li class="sociais">
                            <a href="https://www.linkedin.com/company/22295805" target="_blank"><i class="fab fa-linkedin"></i></a>
                            <a href="https://www.youtube.com/channel/UCPQsvZbAV9pSVfSOlJgXU7A" target="_blank"><i class="fab fa-youtube"></i></a>
                            <a href="https://www.instagram.com/amemoriaoficial/" target="_blank"><i class="fab fa-instagram"></i></a>
                            <a href="https://www.facebook.com/amemoriaoficial/" target="_blank"><i class="fab fa-facebook-square"></i></a>
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
                        <li><a href="/apresentacao">Apresentação</a></li>
                        <li><a href="/expediente">Expediente</a></li>
                        <li><a href="/colaboradores">Colaboradores</a></li>
                        <li><a href="/edicoes">Edições anteriores</a></li>
                        <li><a href="/categoria">Seções</a></li>
                        <li><a href="/fale-conosco">Fale conosco</a></li>
    
                    </ul>
                    <ul>
                        <li class="sociais">
                            <a href="https://www.linkedin.com/company/22295805" target="_blank"><i class="fab fa-linkedin"></i></a>
                            <a href="https://www.youtube.com/channel/UCPQsvZbAV9pSVfSOlJgXU7A" target="_blank"><i class="fab fa-youtube"></i></a>
                            <a href="https://www.instagram.com/amemoriaoficial/" target="_blank"><i class="fab fa-instagram"></i></a>
                            <a href="https://www.facebook.com/amemoriaoficial/" target="_blank"><i class="fab fa-facebook-square"></i></a>
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

                    <li><a href="/apresentacao"> Apresentação </a></li>
                    <li><a href="/expediente"> Expediente </a></li>
                    <li><a href="/colaboradores"> Colaboradores </a></li>
                    <li><a href="/categoria"> Seções </a></li>
                    <li><a href="/edicoes">Edições anteriores</a></li>
                    <li><a href="/fale-conosco">Fale conosco</a></li>

                </ul>
                <ul>
                    <li><a href="/categoria?id=9">Editorial</a></li>
                    <li><a href="/categoria?id=4">Revisitando</a></li>
                    <li><a href="/categoria?id=3">Dossie</a></li>
                    <li><a href="/categoria?id=1">Entrevista</a></li>
                    <li><a href="/categoria?id=2">Olhares</a></li>
                    <li><a href="/categoria?id=5">Por dentro do documento</a></li>
                    <li><a href="/categoria?id=6">Resenhas</a></li>
                    <li><a href="/categoria?id=8">Comunicando</a></li>
                </ul>
                <div class="footer-logo">
                <a href="https://memoriadaeletricidade.com.br" target="_blank"><img loading="lazy" src="/img/logofooter.png"/></a>
                </div>
            </section>
            <section class="memorial">
                <img src="" alt="">
            </section>
            <section class="instituidores">
                <header>
                    <h2>Instituidores e Mantenedores</h2>
                </header>
                <article>
                    <img loading="lazy" src="img/Logo-ABCE.png" alt="">
                    <img loading="lazy" src="img/Logo-Light.png" alt="">
                    <img loading="lazy" src="img/Logo-ACEE.png" alt="">
                    <img loading="lazy" src="img/Logo-Ons.png" alt="">
                    <img loading="lazy" src="img/Logo-Itaipu.png" alt="">
                    <img loading="lazy" src="img/Logo-Eletrobras.png" alt="">


                </article>
            </section>
        </div>
    </footer>
           `;
        // const footerCategorias = this.querySelector('.footer-categorias')

        // categoryArr.forEach(categoria => {
        //     const el = document.createElement('li');
        //     el.innerHTML = `<a href="/categoria?id=${categoria.id}">${categoria.Title}</a>`;
        //     footerCategorias.append(el);
        // })

    }
}

window.customElements.define(`footer-component`, footerComponent);






function footerCreator() {
    document.querySelector('footer').append(new footerComponent())
}

