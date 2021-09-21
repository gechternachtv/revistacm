const params = (new URL(document.location)).searchParams;
const postId = params.get('id');
const edNum = params.get('ed');


const categoriaPage = async () => {
    document.querySelector('body').classList.add('category-page-single')

    const authorData = await graphqlQuery(`
    query{

        editions{
            id
          }

        category(id:${postId}){

            Title
            Class

            articles(where : {revisao: false } ){
                published_at
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
                    id
                    Title
                }
                
            }


        }
    }
`);
    // console.log(authorData.data.editions)
    // console.log('pageData', authorData.data.category);
    document.querySelector('title').innerHTML = authorData.data.category.Title;
    footerCreator();

    const articlesRes = authorData.data.category.articles;
    const articles = articlesRes.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

    const partitionedPosts = [];

    authorData.data.editions.forEach(edition => {
        const partition = [];
        console.log(`%c ${edition.id}`, "color:turquoise;font-size:20px")
        articles.forEach(article => {
            console.log(`%c ${article.edition.id}`, "color:yellow")
            if (article.edition.id === edition.id) {
                partition.push(article)
            }
        })

        partitionedPosts.push(partition)
    })

    console.log(partitionedPosts)


    //card grid



    partitionedPosts.forEach((partition, i) => {
        const articlesContainer = document.createElement("div");
        articlesContainer.classList.add("single-author-articles");
        articlesContainer.classList.add("article-container");
        articlesContainer.setAttribute("id", `edition-${i + 1}`)

        document.querySelector(".category-pages").prepend(articlesContainer)

        const pagerNum = document.createElement("button");
        pagerNum.innerHTML = `${i+1}`
        pagerNum.addEventListener("click", () => {
            document.querySelectorAll(".single-author-articles, .pager button").forEach(item => {
                item.classList.remove("active")
            })
            pagerNum.classList.add("active")
            articlesContainer.classList.add("active")

        })
        document.querySelector(".pager").prepend(pagerNum)



        if (i === (edNum ? (edNum - 1) : partitionedPosts.length - 1)) {
            pagerNum.classList.add("active")
            articlesContainer.classList.add("active")
        }
        partition.forEach(article => {
            // console.log(article);
            if (article) {
                const articleBox = document.createElement('div');
                articleBox.classList.add('article-box');

                const fullname = article.entrevistado ? `<div class="article-box__author box__author--entrevistado">COM ${article.entrevistado.Name}` : `<div class="article-box__author box__author--author">${article.authors[0].Name}
                ${article.authors[1] ? ` <div class="article-box__author box__author--author">E ${article.authors[1].Name}</div>` : ''}
    `

                articleBox.innerHTML = `
            <a href="/post?id=${article.id}">
                <div class="article-box__picture"><img loading="lazy" src="${article.articleCardImage.url}" /></div>
                <div class="article-box__box">
                    <div class="article-box__title">${article.Title}</div>
                    ${fullname}
                    <div class="article-card__edition">${article.edition.Title}</div>
                </div>
    
                </div>
            </a>
            `
                articlesContainer.append(articleBox);
            }
        })
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
    const params = (new URL(document.location)).searchParams;
    const postId = params.get('ed');
    const editions = postId ? `id:${postId}` : `frontpage: true`


    const authorData = await graphqlQuery(`
    query{
        editions(where: {
            ${editions}
          }){
            id
        }
        categories{
            id
            Title
            Class

            articles(where : {revisao: false } ){
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

    const articlesContainer = document.createElement("div");
    articlesContainer.classList.add("single-author-articles");
    articlesContainer.classList.add("article-container");
    document.querySelector(".category-pages").prepend(articlesContainer)

    footerCreator();
    const categories = authorData.data.categories;
    const edition = authorData.data.editions[0].id;
    console.log(editions)
    // console.log('pageData', categories)
    //card grid

    document.querySelector('body').classList.add('category-page-all')
    document.querySelector('.main-container').classList.add('categoriasgrid')
    categories.forEach(category => {
        const el = document.createElement('div');
        el.classList.add('category-box-page')
        el.classList.add(category.Class)
        el.innerHTML = `

            <a href="/categoria?id=${category.id}&ed=${edition}" id="category-${category.id}">
                
                <div class="category-box-title">${category.Title}</div>
            
            </a>


        `

        articlesContainer.append(el)
    })

}


window.addEventListener('DOMContentLoaded', postId ? categoriaPage : Allcategories)