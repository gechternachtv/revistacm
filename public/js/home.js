const params = (new URL(document.location)).searchParams;
const postId = params.get('ed');
const edition = postId ? `id:${postId}` : `frontpage: true`

window.addEventListener('load', async () => {
    const homeData = await graphqlQuery(`
	query{
    categories{
      id
      Title
    }
        editions(where: {
          ${edition}
        }){
          subTitle
      		CartaDosEditores
      		GaleryHome{
            	url
              caption
          }
      		bannerTitle{
            url
          }
      
          articles{
            Title
            id
            articleCardImage{
              url
            }
            category{
              id
            }
            author{
              Name
            }
          }
        }
            categories{
          id
          Title
          Class
        }

    }
    `);
    //console.log(homeData)
    footerCreator(homeData.data.categories);
    //banner
    homeData.data.editions[0].GaleryHome.forEach(banner => {
        console.log(banner);
        const ownitem = document.createElement('li');
        ownitem.innerHTML = `<a href="${banner.caption ? banner.caption : '#' }"><img src="${banner.url}"/></a>`
        ownitem.classList.add('glide__slide');
        document.querySelector('.glide__slides').append(ownitem)


    })


    const glideHero = new Glide('.banner-principal', {
        type: 'carousel',
        animationDuration: 2000,
        autoplay: 4500,
        focusAt: '1',
        startAt: 1,
        perView: 1,
    });

    glideHero.mount();





    //banner-title
    document.querySelector('.banner-title').innerHTML = `<img src="${homeData.data.editions[0].bannerTitle.url}"/>`
    document.querySelector('.banner-title__sub').innerHTML = homeData.data.editions[0].subTitle

    //categories
    const categories = homeData.data.categories;
    const mainContainer = document.querySelector('.main-container');
    categories.forEach(category => {
        const categoryBox = document.createElement('div');
        categoryBox.classList.add('article-holder-full');
        categoryBox.classList.add(`${category.Class}-holder`);
        categoryBox.style.backgroundColor = category.Color;
        categoryBox.innerHTML = `
        <div class="article-container">
          <div class="category-box ${category.Class}">
              <a href="/categoria?id=${category.id}" id="category-${category.id}" class="category-title">${category.Title}</a>
              <div id="article-holder-${category.id}" class="article-holder"></div>
          </div>
        </div>
        `
        mainContainer.append(categoryBox)
    })

    //articles
    const articles = homeData.data.editions[homeData.data.editions.length - 1].articles;
    //console.log(homeData.data.edition)

    articles.forEach(article => {
        //console.log(article);
        if (article) {
            const articleBox = document.createElement('div');
            articleBox.classList.add('article-box');
            articleBox.innerHTML = `
        <a href="/post?id=${article.id}">
            <div class="article-box__picture"><img loading="lazy" src="${article.articleCardImage.url}" /></div>
            <div class="article-box__box">
              <div class="article-box__title">${article.Title}</div>
              <div class="article-box__author">${article.author.Name}</div>
            </div>
        </a>
        `
            document.querySelector(`#article-holder-${article.category.id}`).append(articleBox)
        }
    })

    //
    document.querySelectorAll('.article-holder').forEach(item => {
        const articles = item.querySelectorAll('.article-box a');

        //console.log(item, articles.length)
        if (articles.length < 1) {
            item.parentNode.querySelector('.category-title').classList.add('hidden')
        } else if (articles.length < 2) {
            item.parentNode.querySelector('.category-title')
                .setAttribute('href', `${articles[0] ? articles[0].getAttribute('href') : '#' }`);
        }

    })
    //
    //carta
    const markd = new Remarkable();
    document.querySelector('.carta-container .max-container').innerHTML = markd.render(homeData.data.editions[0].CartaDosEditores)


})