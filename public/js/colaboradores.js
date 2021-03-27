const params = (new URL(document.location)).searchParams;
const postId = params.get('id');
const postentId = params.get('entid');
console.log(postId);

const allAuthors = async () => {
    const authorData = await graphqlQuery(`
  query{
    categories{
      id
      Title
    }
    colaboradorestexto{
      colaboradorestexto
    }
    
      authors{
        id
        Name
        bio
        shortbio
        Picture{
          url
        }
        articles{
          id
        }
      }



      entrevistados{
        id
        Name
        bio
        shortbio
        active
        Picture{
          url
        }
        articles{
          id
        }
      }
  }
  `);
    console.log('authorData', authorData);
    footerCreator(authorData.data.categories);
    const authors = authorData.data.authors;
    const entrevistados = authorData.data.entrevistados;
    const markd = new Remarkable();

    document.querySelector('.author-card-text').innerHTML = authorData.data.colaboradorestexto ? markd.render(authorData.data.colaboradorestexto.colaboradorestexto) : ''
    //card grid


    const colaboradores = authors.concat(entrevistados);


    const colaboradoresAlf = colaboradores.sort((a, b) => {
        const nameA = a.Name.toLowerCase(),
            nameB = b.Name.toLowerCase()

        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })

    colaboradoresAlf.forEach(author => {
        console.log(author)
        const authorCard = document.createElement('div');
        authorCard.classList.add('author-card');
        authorCard.classList.add(`author-card-${author.id}`)
        authorCard.innerHTML = `
    <a href="${author.active ? '?entid=' : '?id='}${author.id}"> 
      <img loading="lazy" src="${author.Picture[0] ? author.Picture[0].url : 'img/authorpic.png'}">
      <div>
        <div class="author-card__name">${author.Name}</div>
        <div class="author-card__about">${author.shortbio ? author.shortbio : ''}</div>
        <div class="author-card__bio">${author.bio ? author.bio : ''}</div>
      </div>

      ${author.bio ? (author.bio.length ? `<div class="author-card__tooltip">${author.bio}</div>` : '') : ''}

    </a>
  `
        document.querySelector('.author-card-grid').append(authorCard)
    });

}

const singleAuthor = async () => {

    const query = {
        author: `    query{
    categories{
      id
      Title
    }
    authors(where:{
      id:${postId}
    }){
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
}`,
        entrevistado: ` query{
    categories{
      id
      Title
    }
    entrevistados(where:{
      id:${postentId}
    }){
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
}`
    }



    const authorData = await graphqlQuery(postId ? query.author : query.entrevistado);
    console.log('authorData', authorData);
    footerCreator(authorData.data.categories);
    const authors = authorData.data[postId ? 'authors' : 'entrevistados'];

    //card grid
    authors.forEach(author => {
        const authorCard = document.createElement('div');
        authorCard.classList.add('author-card')
        authorCard.innerHTML = `
        <a href="?id=${author.id}"> 
        <img loading="lazy" src="${author.Picture[0] ? author.Picture[0].url : 'img/authorpic.png'}">
        <div>
          <div class="author-card__name">${author.Name}</div>
          <div class="author-card__about">${author.shortbio ? author.shortbio : ''}</div>
          <div class="author-card__bio">${author.bio ? author.bio : ''}</div>
        </div>

        ${author.bio ? (author.bio.length ? `<div class="author-card__tooltip">${author.bio}</div>` : '') : ''}

      </a>
`
        document.querySelector('title').innerHTML = author.Name
        document.querySelector('.author-card-container').classList.add('single-author')
        document.querySelector('.author-card-grid').append(authorCard)
    });

    const articlesContainer = document.querySelector('.single-author-articles');

    authors[0].articles.forEach(article => {
        console.log(article);
        if (article) {
            const articleBox = document.createElement('div');
            articleBox.classList.add('article-box');
            articleBox.innerHTML = `
        <a href="/post?id=${article.id}">
            <div class="article-box__picture"><img loading="lazy" src="${article.articleCardImage.url}" /></div>
            <div class="article-box__box">
              <div class="article-box__title">${article.Title}</div>
              <div class="article-card__edition">Revista ${article.edition.id}</div>
              <div class="article-box__category ${article.category.Class}">${article.category.Title}</div>
            </div>
        </a>
        `
            articlesContainer.append(articleBox);
        }
    })

}











window.addEventListener('DOMContentLoaded', (postId ? postId : postentId) ? singleAuthor : allAuthors)