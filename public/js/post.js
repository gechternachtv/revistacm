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
        authors{
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
    footerCreator();
    const articleData = postData.data.article;

    document.querySelector('title').innerHTML = articleData.Title

    if (!articleData) {
        window.location.replace("./");
    }


    const pictures = {
        author1: (articleData.authors.length) ? (articleData.authors[0].Picture[0] ? articleData.authors[0].Picture[0].url : 'img/authorpic.png') : null,
        author2: (articleData.authors.length > 1) ? (articleData.authors[1].Picture[0] ? articleData.authors[1].Picture[0].url : 'img/authorpic.png') : null,
        entrevistado: articleData.entrevistado ? (articleData.entrevistado.Picture[0] ? articleData.entrevistado.Picture[0].url : 'img/authorpic.png') : null
    }
    const fullName = articleData.authors[1] ? `${articleData.authors[0].Name} E ${articleData.authors[1].Name}` : articleData.authors[0].Name;
    console.log(fullName)
    console.log(pictures)
    //header
    document.querySelector('body').classList.add(`${articleData.category.Class}--q`)
    const articleHeader = document.querySelector('.article-header')
    articleHeader.innerHTML = `
    <div class="article-header ${articleData.category.Class}">
    <div class="article-header__border"></div>
    <div class="article-header__author-card">
    <a class="post-author-link" href="/categoria?id=${articleData.category.id}"> 
      <img loading="lazy" src="${articleData.entrevistado ? pictures.entrevistado : pictures.author1}">
      ${pictures.author2 ? `<img class="secondary-author-pic" loading="lazy" src="${pictures.author2}">` : ``}
      <div>
        ${articleData.entrevistado ? articleData.entrevistado.Name : fullName}
        <div class="post-author-subtitle">${articleData.entrevistado ? ('<span class="por-span">Por </span>'+ fullName) : ''}</div>
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

        document.querySelectorAll('.article-container p > img').forEach((item, i) => {
            item.parentNode.classList.add('boof');

            if ((i + 2) % 2 == 0) {
                item.parentNode.classList.add('faar');
            }
        })
    }

    //galery
    //console.log('galery', postData.data.article.Galery);
    if (postData.data.article.Galery) {
        const galeryContainer = document.querySelector('.galery-container')

        postData.data.article.Galery.forEach((picture, i) => {
            const newEl = document.createElement('div');
            newEl.classList.add('cssbox');
            const legenda = picture.caption ? `<span class="galery-img-description">${picture.caption}</span>` : ``;
            newEl.innerHTML = `
        <a id="galerypic-${i}" href="#galerypic-${i}">
        <img loading="lazy" class="cssbox_thumb" src="${picture.url/*picture.formats.thumbnail.url*/}">
        <span class="cssbox_full">
          <img loading="lazy" src="${picture.url}">
          ${legenda}
        </span>
      </a>
      <a class="cssbox_close" href="#void"></a>
      ${(i > 0) ? `<a class="cssbox_prev" href="#galerypic-${i - 1}">&lt;</a>` : ''}
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
        el.classList.add(`saibamaix-box-${target.id}`);
        const bio = target.bio ? (target.bio.length ? `<div>${target.bio}</div>` : '') : ''
        el.innerHTML = `
        <a href="/colaboradores?${type}=${target.id}" class="saibamaix-box__img author-pic"><img loading="lazy" src="${target.Picture[0] ? target.Picture[0].url : 'img/authorpic.png'}"/></a>
        ${bio}
        `
        saibaMaisCont.append(el)
    }

    if (articleData.authors) {
        articleData.authors.forEach(author => {
            createBio(author, 'id');
        })
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



    const shareBox = document.createElement('div');
    shareBox.classList.add('shareBox')
    shareBox.innerHTML = `

    <!-- Sharingbutton Twitter -->
    <a class="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=${encodeURI(document.title)}&amp;url=${encodeURI(window.location)}" target="_blank" rel="noopener" aria-label="Twitter">
      <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg></div>Twitter</div>
    </a>
    
    
      
    <!-- Sharingbutton Facebook -->
    <a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=${encodeURI(window.location)}" target="_blank" rel="noopener" aria-label="Facebook">
      <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg></div>Facebook</div>
    </a>
    






    <!-- Sharingbutton WhatsApp -->
<a class="resp-sharing-button__link" href="whatsapp://send?text=${encodeURI(document.title)}%20${encodeURI(window.location)}" target="_blank" rel="noopener" aria-label="WhatsApp">
  <div class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/></svg></div>WhatsApp</div>
</a>


    
<!-- Sharingbutton LinkedIn -->
<a class="resp-sharing-button__link" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=${encodeURI(window.location)}&amp;title=${encodeURI(document.title)}&amp;summary=tempos%20modesno&amp;source=UR%20LL" target="_blank" rel="noopener" aria-label="LinkedIn">
  <div class="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"/></svg></div>LinkedIn</div>
</a>



    
<!-- Sharingbutton E-Mail -->
<a class="resp-sharing-button__link" href="mailto:?subject=${encodeURI(document.title)}&amp;body=${encodeURI(window.location)}" target="_self" rel="noopener" aria-label="E-Mail">
  <div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"/></svg></div>E-Mail</div>
</a>
      `
    document.querySelector('.share-item__compartilhar').parentElement.append(shareBox)



})
