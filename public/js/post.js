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
  			Galery{
          url
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
      <img src="${articleData.author.Picture[0].url}"> 
      <span>${articleData.author.Name}</span>
    </a>
    </div>
    <div class="article-header__border"></div>
    </div>
    `




    //articleHeader.style.backgroundColor = articleData.category.Color
    //body
    const markd = new Remarkable();
    document.querySelector('.article-container').innerHTML = markd.render(articleData.Content)


    //galery







})