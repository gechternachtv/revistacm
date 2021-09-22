const params = (new URL(document.location)).searchParams;
const postId = params.get('ed');
const edition = postId ? `id:${postId}` : `frontpage: true`

const showrevisao = params.get('revisao') ? true : false;


window.addEventListener('load', async () => {
    const homeData = await graphqlQuery(`
	query{
        editions(where: {
          ${edition}
        }){
          id
          subTitle
      		CartaDosEditores
      		GaleryHome{
            	url
              caption
          }
          GaleryMobile{
            url
            caption
        }
      
          articles${showrevisao ? "" : "(where : {revisao: false } )"}{
            ordem
            Title
            id
            articleCardImage{
              url
            }
            category{
              id
            }
            authors{
              Name
            }
            entrevistado{
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


    // console.log(homeData)
    footerCreator();
    //banner
    homeData.data.editions[0][(screen.width > 580) ? 'GaleryHome' : 'GaleryMobile'].forEach(banner => {
        //console.log(homeData)
        const ownitem = document.createElement('li');
        ownitem.innerHTML = `<a href="${banner.caption ? banner.caption : '#' }"><img src="${banner.url}"/></a>`
        ownitem.classList.add('glide__slide');
        document.querySelector('.glide__slides').append(ownitem);


    })


    let imgloaded = 0;
    let caroulSelrunning = false;

    $('.glide__slides img').on('load', () => {
        imgloaded++;

        if (!caroulSelrunning && imgloaded === $('.glide__slides img').length) {
            caroulSelrunning = true;

            // console.log(imgloaded, $('.glide__slides img').length)
            $('.glide__slides').slick({
                infinite: true,
                arrows: true,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 4400,
                dots: true
            });
        }

    });



    //banner-title
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
              <a href="/categoria?id=${category.id}&ed=${homeData.data.editions[0].id}" class="category-title">${category.Title}</a>
              <div id="article-holder-${category.id}" class="article-holder"></div>
          </div>
        </div>
        `
        mainContainer.append(categoryBox)
    })


    //articles
    const articles = homeData.data.editions[homeData.data.editions.length - 1].articles;
    //console.log(homeData.data.edition)
    const orderedArticles = articles.sort((a, b) => (a.ordem > b.ordem) ? 1 : -1);


    orderedArticles.forEach(article => {
        //console.log(article.ordem);
        if (article) {
            const articleBox = document.createElement('div');
            articleBox.classList.add('article-box');
            articleBox.innerHTML = `
        <a href="/post?id=${article.id}">
            <div class="article-box__picture"><img loading="lazy" src="${article.articleCardImage.url}" /></div>
            <div class="article-box__box">
              <div class="article-box__title">${article.Title}</div>
              <div class="article-box__author box__author--author">${article.authors[0].Name}</div>
              ${article.authors[1] ? ` <div class="article-box__author box__author--author">E ${article.authors[1].Name}</div>` : ''}
              ${(article.entrevistado ? `<div class="article-box__author box__author--entrevistado">COM ${article.entrevistado.Name}` : '')}
            </div>
        </a>
        `
            document.querySelector(`#article-holder-${article.category.id}`).append(articleBox)
        }
    })

    //
    document.querySelectorAll('.article-container').forEach(item => {
        const articlesa = item.querySelectorAll('.article-box a');

        //console.log(item, articles.length)
        if (articlesa.length < 1) {
            item.classList.add('hidden')
        } else if (articlesa.length < 2) {
            item.parentNode.querySelector('.category-title')
                .setAttribute('href', `${articlesa[0] ? articlesa[0].getAttribute('href') : '#' }`)
        }

    })
    //
    //carta
    const markd = new Remarkable();
    document.querySelector('.carta-container .max-container').innerHTML = markd.render(homeData.data.editions[0].CartaDosEditores)


})