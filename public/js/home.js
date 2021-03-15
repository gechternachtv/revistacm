const params = (new URL(document.location)).searchParams;
const postId = params.get('ed');
const edition = postId ? `id:${postId}` : `frontpage: true`

window.addEventListener('load', async () => {
    const homeData = await graphqlQuery(`
	query{
        editions(where: {
          ${edition}
        }){
          subTitle
      		CartaDosEditores
      		GaleryHome{
            	url
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
    console.log(homeData)

    //banner
    homeData.data.editions[0].GaleryHome.forEach(banner => {
        const bannerEl = document.createElement('img');
        bannerEl.setAttribute('src', banner.url)
        document.querySelector('.banner-principal').append(bannerEl)

    })
    //banner-title
    document.querySelector('.banner-title').innerHTML = `<img src="${homeData.data.editions[0].bannerTitle.url}"/>`
    document.querySelector('.banner-title__sub').innerHTML = homeData.data.editions[0].subTitle

    //categories
    const categories = homeData.data.categories;
    const mainContainer = document.querySelector('.main-container')
    categories.forEach(category => {
        const categoryBox = document.createElement('div');
        categoryBox.classList.add('article-holder-full');
        categoryBox.style.backgroundColor = category.Color;
        categoryBox.innerHTML = `
        <div class="article-container">
          <div class="category-box ${category.Class}">
              <div id="category-${category.id}" class="category-title">${category.Title}</div>
              <div id="article-holder-${category.id}" class="article-holder"></div>
          </div>
        </div>
        `
        mainContainer.append(categoryBox)
    })

    //articles
    const articles = homeData.data.editions[homeData.data.editions.length - 1].articles;
    console.log(homeData.data.edition)
    articles.forEach(article => {
        console.log(article);
        const articleBox = document.createElement('div');
        articleBox.classList.add('article-box');
        articleBox.innerHTML = `
        <a href="/post?id=${article.id}">
            <div class="article-box__picture"><img src="${article.articleCardImage.url}" /></div>
            <div class="article-box__box">
              <div class="article-box__title">${article.Title}</div>
              <div class="article-box__author">${article.author.Name}</div>
            </div>
        </a>
        `
        document.querySelector(`#article-holder-${article.category.id}`).append(articleBox)

    })
    //carta
    const markd = new Remarkable();
    document.querySelector('.carta-container .max-container').innerHTML = markd.render(homeData.data.editions[0].CartaDosEditores)


})