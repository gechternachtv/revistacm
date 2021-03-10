const params = (new URL(document.location)).searchParams;
const postId = params.get('id');
console.log(postId);

const allAuthors = async () => {
    const authorData = await graphqlQuery(`
  query{
      authors{
        id
        About
        Name
        bio
        Picture{
          url
        }
        articles{
          id
        }
        id
      }
  }
  `);
    console.log(authorData)
    const authors = authorData.data.authors;

    //card grid
    authors.forEach(author => {
        const authorCard = document.createElement('div');
        authorCard.classList.add('author-card')
        authorCard.innerHTML = `
    <a href="?id=${author.id}"> 
      <img src="${author.Picture[0].url}"> 
      <div class="author-card__name">${author.Name}</div>
      <div class="author-card__about">${author.About}</div>
    </a>
  `
        document.querySelector('.author-card-container').append(authorCard)
    });

}

const singleAuthor = async () => {
    const authorData = await graphqlQuery(`
    query{
      authors(where:{
        id:${postId}
      }){
        About
        Name
        Picture{
          url
        }
        articles{
          id
          Title
          Description
          created_at
          articleCardImage{
            url
          }
        }
        id
      }
  }
`);
    //console.log(authorData)
    const authors = authorData.data.authors;

    //card grid
    authors.forEach(author => {
        const authorCard = document.createElement('div');
        authorCard.classList.add('author-card')
        authorCard.innerHTML = `
  <img src="${author.Picture[0].url}"> 
  <div class="author-card__name">${author.Name}</div>
  <div class="author-card__about">${author.About}</div>
`
        document.querySelector('.author-card-container').append(authorCard)
    });

    const articlesContainer = document.querySelector('.single-author-articles');

    authors[0].articles.forEach(article => {
        console.log(article);
        const articleBox = document.createElement('div');
        articleBox.classList.add('article-box');
        articleBox.innerHTML = `
        <a href="./post?id=${article.id}">
            <div class="article-box__picture"><img src="${article.articleCardImage.url}" /></div>
            <div class="article-box__title">${article.Title}</div>
        </a>
        `
        articlesContainer.append(articleBox);
    })

}











window.addEventListener('load', postId ? singleAuthor : allAuthors)