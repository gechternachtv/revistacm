
const params = (new URL(document.location)).searchParams;
const postId = params.get('id');

if (!postId) {
    window.location.replace("./");
}

window.addEventListener('load', async () => {
    const postData = await graphqlQuery(`
    query{
      article(id:${postId}){
        id
        Title
        Content
        published_at
        template
  			Galery{
          url
        }
        quotes{
          quote1
          quote2
          quote3
        }
        category{
          Class
        }
        author{
          id
          Name
          Picture{
            url
          }
        }
      }
    }
    `);
    console.log(postData)
    const articleData = postData.data.article;
    if (!articleData) {
        window.location.replace("./");
    }
    //header
    const articleHeader = document.querySelector('.article-header')
    articleHeader.innerHTML = `
    <div class="article-header ${articleData.category.Class}">
    <div class="article-header__border"></div>
    <div class="article-header__author-card">
    <a href="/colaboradores?id=${articleData.author.id}"> 
      <img src="${articleData.author.Picture[0] ? articleData.author.Picture[0].url : 'img/authorpic.png'}"> 
      <span>${articleData.author.Name}</span>
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
    if (document.querySelector('.article-container p > img')){
      document.querySelector('.article-container p > img').parentNode.classList.add('article-Banner');
      document.querySelectorAll('.article-container p > img').forEach(item =>{ 
      item.parentNode.classList.add('boof');
      })
    }

    //galery
    console.log('galery',postData.data.article.Galery);
    if (postData.data.article.Galery){
      const galeryContainer = document.querySelector('.galery-container')
      
      postData.data.article.Galery.forEach((picture,i) =>{
        const newEl = document.createElement('div');
        newEl.classList.add('cssbox')
        newEl.innerHTML = `
        <a id="galerypic-${i}" href="#galerypic-${i}">
        <img lloadingoad=lazy class="cssbox_thumb" src="${picture.url}">
        <span class="cssbox_full">
          <img loading=lazy src="${picture.url}">
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

function quoteCreate(quoteObj,classEl,num){
  const quoteEl = document.createElement('div');
  quoteEl.classList.add('quoteEl');
  quoteEl.classList.add(classEl);
  quoteEl.innerHTML = quoteObj;
  pNumber[num].style.position = "relative"
  pNumber[num].append(quoteEl);
}


if (pNumber){
  if (quotes){
    if (quotes.quote1){
      quoteCreate(quotes.quote1,'quoteEl1',0)
    }
    if (quotes.quote2){
      quoteCreate(quotes.quote2,'quoteEl2',Math.ceil(pNumber.length/2))
    }
    if (quotes.quote3){
      quoteCreate(quotes.quote3,'quoteEl3',pNumber.length -1)
    }
  }
}


})