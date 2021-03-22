const params = (new URL(document.location)).searchParams;
const postId = params.get('id');

if (!postId) {
    window.location.replace("./");
}

window.addEventListener('load', async () => {
    const postData = await graphqlQuery(`
    query{
      categories{
        id
        Title
      }
      article(id:${postId}){
        id
        Title
        Content
        published_at
        template
  			Galery{
          url
          caption
        }
        quotes{
          quote1
          quote2
          quote3
        }
        
        saibamais

        category{
          id
          Class
        }
        author{
          id
          Name
          bio
          Picture{
            url
          }
        }

        entrevistado{
          id
          Name
          bio
          Picture{
            url
          }
        }

      }
    }
    `);
    //console.log(postData);
    footerCreator(postData.data.categories);
    const articleData = postData.data.article;

    document.querySelector('title').innerHTML = articleData.Title

    if (!articleData) {
        window.location.replace("./");
    }


    const displayImg = articleData.entrevistado ? articleData.entrevistado.Picture : articleData.author.Picture
    const picture = displayImg[0] ? displayImg[0].url : 'img/authorpic.png';

    const secondarydisplay = articleData.entrevistado ? `<img class="secondary-pic" loading="lazy" src="${articleData.author.Picture[0] ? articleData.author.Picture[0].url : 'img/authorpic.png'}">` : '';


    //header
    const articleHeader = document.querySelector('.article-header')
    articleHeader.innerHTML = `
    <div class="article-header ${articleData.category.Class}">
    <div class="article-header__border"></div>
    <div class="article-header__author-card">
    <a class="post-author-link" href="/categoria?id=${articleData.category.id}"> 
      <img loading="lazy" src="${picture}">
      ${secondarydisplay}
      <div>
        ${articleData.entrevistado ? articleData.entrevistado.Name : articleData.author.Name}
        <div class="post-author-subtitle">${articleData.entrevistado ? ('<span class="por-span">Por </span>'+ articleData.author.Name) : ''}</div>
      </div>
    </a>
    </div>
    <div class="article-header__border"></div>
    </div>
    `




    //articleHeader.style.backgroundColor = articleData.category.Color
    //body
    const markd = new Remarkable();
    document.querySelector('.article-container').innerHTML = markd.render(articleData.Content);
    document.querySelector('.article-container').classList.add(articleData.template ? articleData.template : 'template1');
    if (document.querySelector('.article-container p > img')) {
        document.querySelector('.article-container p > img').parentNode.classList.add('article-Banner');
        document.querySelectorAll('.article-container p > img').forEach(item => {
            item.parentNode.classList.add('boof');
        })
    }

    //galery
    //console.log('galery', postData.data.article.Galery);
    if (postData.data.article.Galery) {
        const galeryContainer = document.querySelector('.galery-container')

        postData.data.article.Galery.forEach((picture, i) => {
            const newEl = document.createElement('div');
            newEl.classList.add('cssbox')
            newEl.innerHTML = `
        <a id="galerypic-${i}" href="#galerypic-${i}">
        <img loading="lazy" class="cssbox_thumb" src="${picture.url/*picture.formats.thumbnail.url*/}">
        <span class="cssbox_full">
          <img loading="lazy" src="${picture.url}">
          <span class="galery-img-description">${picture.caption}</span>
        </span>
      </a>
      <a class="cssbox_close" href="#void"></a>
      <a class="cssbox_next" href="#galerypic-${i + 1}">&gt;</a>`

            galeryContainer.append(newEl);
        })
    }

    //quotes
    const quotes = postData.data.article.quotes;

    const pNumber = document.querySelectorAll('.post-container p');

    function quoteCreate(quoteObj, classEl, num) {
        const quoteEl = document.createElement('div');
        quoteEl.classList.add('quoteEl');
        quoteEl.classList.add(classEl);
        quoteEl.innerHTML = quoteObj;
        pNumber[num].style.position = "relative"
        pNumber[num].append(quoteEl);
    }


    if (pNumber) {
        if (quotes) {
            if (quotes.quote1) {
                quoteCreate(quotes.quote1, 'quoteEl1', 2)
            }
            if (quotes.quote2) {
                quoteCreate(quotes.quote2, 'quoteEl2', Math.ceil(pNumber.length / 2))
            }
            if (quotes.quote3) {
                quoteCreate(quotes.quote3, 'quoteEl3', pNumber.length - 1)
            }
        }
    }

    //saibamais

    //console.log(articleData.saibamais);
    //console.log(articleData.author.bio);

    const saibaMaisCont = document.querySelector('.saiba-mais-container');



    function createBio(target, type) {
        const el = document.createElement('div');
        el.classList.add('saibamaix-box');
        const bio = target.bio ? `<div>${target.bio}</div>` : ''
        el.innerHTML = `
        <a href="/colaboradores?${type}=${target.id}" class="saibamaix-box__img author-pic"><img loading="lazy" src="${target.Picture[0] ? target.Picture[0].url : 'img/authorpic.png'}"/></a>
        ${bio}
        `
        saibaMaisCont.append(el)
    }

    if (articleData.author) {
        createBio(articleData.author, 'id');
    }

    if (articleData.entrevistado) {
        createBio(articleData.entrevistado, 'entid');
    }


    if (articleData.saibamais) {
        const el = document.createElement('div');
        el.classList.add('saibamaix-box-holder')
        el.innerHTML = `
      <div class="saibamaix-box">
        <img  loading="lazy" class="saibamaix-box__img" src="img/saiba_mais.jpg"/>
        <div>${articleData.saibamais}</div>
      </div>
      `
        saibaMaisCont.append(el)
    }

})