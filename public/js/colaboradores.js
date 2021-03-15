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
    console.log('authorData',authorData)
    const authors = authorData.data.authors;

    //card grid
    authors.forEach(author => {
        const authorCard = document.createElement('div');
        authorCard.classList.add('author-card')
        authorCard.innerHTML = `
    <a href="?id=${author.id}"> 
      <img src="${author.Picture[0] ? author.Picture[0].url : 'img/authorpic.png'}">
      <div>
        <div class="author-card__name">${author.Name}</div>
        <div class="author-card__about">${author.About}</div>
        <div class="author-card__bio">${author.bio}</div>
      </div>

      <div class="author-card__tooltip">${author.bio}</div>
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
        bio
        Picture{
          url
        }
        articles{
          id
          Title
          edition{
            id
          }
          category{
            Title
            Class
          }
          created_at
          articleCardImage{
            url
          }
        }
        id
      }
  }
`);
    console.log('authorData',authorData)
    const authors = authorData.data.authors;

    //card grid
    authors.forEach(author => {
        const authorCard = document.createElement('div');
        authorCard.classList.add('author-card')
        authorCard.innerHTML = `
        <a href="?id=${author.id}"> 
        <img src="${author.Picture[0] ? author.Picture[0].url : 'img/authorpic.png'}">
        <div>
          <div class="author-card__name">${author.Name}</div>
          <div class="author-card__about">${author.About}</div>
          <div class="author-card__bio">${author.bio}</div>
        </div>
  
        <div class="author-card__tooltip">${author.bio}</div>
      </a>
`       
        document.querySelector('.author-card-container').classList.add('single-author')
        document.querySelector('.author-card-container').append(authorCard)
    });

    const articlesContainer = document.querySelector('.single-author-articles');

    authors[0].articles.forEach(article => {
        console.log(article);
        const articleBox = document.createElement('div');
        articleBox.classList.add('article-box');
        articleBox.innerHTML = `
        <a href="/post?id=${article.id}">
            <div class="article-box__picture"><img src="${article.articleCardImage.url}" /></div>
            <div class="article-box__box">
              <div class="article-box__title">${article.Title}</div>
              <div class="article-card__edition">Revista ${article.edition.id}</div>
              <div class="article-box__category ${article.category.Class}">${article.category.Title}</div>
            </div>
        </a>
        `
        articlesContainer.append(articleBox);
    })

}











window.addEventListener('load', postId ? singleAuthor : allAuthors)