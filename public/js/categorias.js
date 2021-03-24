const params = (new URL(document.location)).searchParams;
const postId = params.get('id');


const categoriaPage = async () => {
    const authorData = await graphqlQuery(`
    query{
        categories{
            id
            Title
          }
        category(id:${postId}){

            Title
            Class

            articles{
                id
                Title
                articleCardImage{
                    url
                }
                authors{
                    Name
                }
                entrevistado{
                    Name
                }
                edition{
                    Title
                }
                
            }


        }
    }
`);
    console.log('pageData', authorData.data.category);
    document.querySelector('title').innerHTML = authorData.data.category.Title;
    footerCreator(authorData.data.categories);
    const articles = authorData.data.category.articles;

    //card grid

    const articlesContainer = document.querySelector('.single-author-articles');

    articles.forEach(article => {
        console.log(article);
        if (article) {
            const articleBox = document.createElement('div');
            articleBox.classList.add('article-box');

            const fullname = article.entrevistado ? `<div class="article-box__author box__author--entrevistado">COM ${article.entrevistado.Name}` : `<div class="article-box__author box__author--author">${article.authors[0].Name}</div>
            ${article.authors[1] ? ` <div class="article-box__author box__author--author">E ${article.authors[1].Name}</div>` : ''}
`

            articleBox.innerHTML = `
        <a href="/post?id=${article.id}">
            <div class="article-box__picture"><img loading="lazy" src="${article.articleCardImage.url}" /></div>
            <div class="article-box__box">
            <div class="article-box__title">${article.Title}</div>
            ${fullname}
            </div>
              <div class="article-card__edition">${article.edition.Title}</div>
            </div>
        </a>
        `
            articlesContainer.append(articleBox);
        }
    })


    //header
    const articleHeader = document.querySelector('.article-header')
    articleHeader.innerHTML = `
        <div class="article-header ${authorData.data.category.Class}">
        <div class="article-header__border"></div>
        <div class="article-header__author-card">
        </div>
        <div class="article-header__border"></div>
        </div>
        `

}





const Allcategories = async () => {
    const authorData = await graphqlQuery(`
    query{
        categories{
            id
            Title
            Class

            articles{
                id
                Title
                articleCardImage{
                    url
                }
                authors{
                    Name
                }
                edition{
                    Title
                }
                
            }


        }
    }
`);
    footerCreator(authorData.data.categories);
    const categories = authorData.data.categories;
    console.log('pageData', categories)
    //card grid

    const articlesContainer = document.querySelector('.single-author-articles');
    document.querySelector('body').classList.add('category-page-all')

    categories.forEach(category => {
        const el = document.createElement('div');
        el.innerHTML = `
        <div class="article-container">
        <div class="category-box-page ${category.Class}">
            <a href="/categoria?id=${category.id}" id="category-${category.id}">${category.Title}</a>
        </div>
      </div>
        `

        articlesContainer.append(el)
    })

}


window.addEventListener('load', postId ? categoriaPage : Allcategories)