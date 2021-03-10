const params = (new URL(document.location)).searchParams;
const postId = params.get('ed');
const edition = postId ? `id:${postId}` : `frontpage: true`

window.addEventListener('load', async () => {
    const homeData = await graphqlQuery(`
	query{
        editions{
            id
            Title
            Picture{
                url
            }
          }
    }
    `);


    //console.log(homeData.data)
    console.log(homeData)

    const edicoesContainer = document.querySelector('.edicoes-container')
    const editions = homeData.data.editions

    editions.forEach(edition => {
        console.log(edition);
        const editionBox = document.createElement('div');
        editionBox.classList.add('article-box');
        editionBox.innerHTML = `
            <a href="/?ed=${edition.id}">
                <div class="article-box__picture"><img src="${edition.Picture.url}" /></div>
                <div class="article-box__title">${edition.Title}</div>
            </a>
            `
        edicoesContainer.append(editionBox)

    })

})