const categoriaPage = async () => {
    const authorData = await graphqlQuery(`
    query{
            articles(where : {revisao: true } ){
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
`);
    console.log('pageData', authorData.data);
    document.querySelector('title').innerHTML = `Revisão`
    footerCreator();
    const articles = authorData.data.articles;

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
        <div class="article-header revisao-template">
        <div class="article-header__border"></div>
        <div class="article-header__author-card">
        </div>
        <div class="article-header__border"></div>
        </div>
        `

}



window.addEventListener('DOMContentLoaded', categoriaPage)