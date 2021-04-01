const params = (new URL(document.location)).searchParams;
const postId = params.get('ed');
const edition = postId ? `id:${postId}` : `frontpage: true`

window.addEventListener('DOMContentLoaded', async () => {
    const homeData = await graphqlQuery(`
	query{
        edicoesTexto{
            edicoestexto
          }
        editions{
            id
            Title
            Picture{
                url
            }
          	pdf{
              url
            }
          }
    }
    `);


    //console.log(homeData.data)
    console.log(homeData)
    footerCreator();
    
    const edicoesContainer = document.querySelector('.edicoes-container')
    const editions = homeData.data.editions

    editions.forEach(edition => {
        console.log(edition);
        const editionBox = document.createElement('div');
        editionBox.classList.add('edition-box')
        editionBox.innerHTML = `
                <div class="edition-box__picture"><img alt="${edition.Title}" src="${edition.Picture.url}" /></div>
                <div class="edition-title">${edition.Title}</div>
                <a class="edition-box__online" href="/?ed=${edition.id}"><i class="fas fa-link"></i> Edição online</a>
                ${edition.pdf ? '<a class="edition-box__pdf" target="_blank"1 href="'+edition.pdf.url+'"><i class="far fa-file-pdf"></i>PDF</a>' : ''}
            `
        edicoesContainer.append(editionBox)

    })
    const markd = new Remarkable();
    document.querySelector('.edicoes-texto').innerHTML = markd.render(homeData.data.edicoesTexto.edicoestexto)

})