window.addEventListener('DOMContentLoaded', async () => {
    const homeData = await graphqlQuery(`
query{

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
    footerCreator();
/*
    document.querySelector('.main-sobre-container .main-coluna').innerHTML = homeData.data.sobreTexto.Maincoluna; 
    document.querySelector('.sobre-container .coluna1').innerHTML = homeData.data.sobreTexto.Coluna1; 
    document.querySelector('.sobre-container .coluna2').innerHTML = homeData.data.sobreTexto.Coluna2; 
    document.querySelector('.sobre-container .coluna3').innerHTML = homeData.data.sobreTexto.Coluna3; 
*/

	
})
