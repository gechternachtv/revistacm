window.addEventListener('DOMContentLoaded', async () => {
    const homeData = await graphqlQuery(`
query{
categories{
    id
    Title
  }

  sobreTexto
          
          {
            Maincoluna
            Coluna1
            Coluna2
            Coluna3
          }
      
}
`);


    //console.log(homeData.data)
    console.log(homeData)
    footerCreator(homeData.data.categories);

    const markd = new Remarkable();
    document.querySelector('.main-sobre-container .main-coluna').innerHTML = markd.render(homeData.data.sobreTexto.Maincoluna); 
    document.querySelector('.sobre-container .coluna1').innerHTML = markd.render(homeData.data.sobreTexto.Coluna1); 
    document.querySelector('.sobre-container .coluna2').innerHTML = markd.render(homeData.data.sobreTexto.Coluna2); 
    document.querySelector('.sobre-container .coluna3').innerHTML = markd.render(homeData.data.sobreTexto.Coluna3); 

})