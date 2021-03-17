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
                        <li><a href="/colaboradores">Colaboradores</a></li>
                        <li><a href="/edicoes">Revistas anteriores</a></li>
                        <li><a href="/categoria">Categorias</a></li>
                        <li><a href="#">Fale conosco</a></li>
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
    
                        <li><a href="/colaboradores">Colaboradores</a></li>
                        <li><a href="/edicoes">Revistas anteriores</a></li>
                        <li><a href="/categoria">Categorias</a></li>
                        <li><a href="#">Fale conosco</a></li>
    
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
    constructor(categoryArr) {
        super();
        this.innerHTML = `

        <footer>
        <div class="max-container ">
            <section class="footer-links">
                <ul>

                    <li><a href="/colaboradores"> colaboradores </a></li>
                    <li><a href="/edicoes">revistas anteriores</a></li>
                    <li><a href="/fale-conosco">fale conosco</a></li>

                </ul>
                <ul class="footer-categorias">
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
        const footerCategorias = this.querySelector('.footer-categorias')

        categoryArr.forEach(categoria => {
            const el = document.createElement('li');
            el.innerHTML = `<a href="/categoria?id=${categoria.id}">${categoria.Title}</a>`;
            footerCategorias.append(el);
        })

    }
}

window.customElements.define(`footer-component`, footerComponent);






function footerCreator(arr){
    document.querySelector('footer').append(new footerComponent(arr))
}