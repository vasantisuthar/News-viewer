const button = document.querySelector('.searchBtn');
const alert = document.querySelector('.warning');
const input = document.querySelector('.searchArea');
const divContainer = document.querySelector('.result');

button.addEventListener('click', function(e){
    e.preventDefault();

    // check fields
    if(input.value === ''){
        alert.classList.add('show','alert', 'alert-danger');
        alert.innerHTML = "Please enter value to search";
        setTimeout(function(){
            alert.innerHTML = "";
            alert.classList.remove('show','alert','alert-danger');
        }, 2000);
    } else {
        divContainer.innerText = "";
        const ajax = new XMLHttpRequest();
         var url = `https://newsapi.org/v2/everything?q=${input.value}&from=2022-01-10&sortBy=popularity&apiKey=650c76400703470f835d491065da0f9a`;  
           

        ajax.open('GET', url, true);

        ajax.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            let data = JSON.parse(this.response);
            console.log(data);
            showResults(data);
            if(data.articles.length == 0){
                window.alert("There are no results for your search");
            }
        }
    }
     ajax.send();
    }  
});

function showResults(data){
    
    for(var i in data.articles){
        
        // create div
        const url = data.articles[i].url
        const div = document.createElement('div');
        div.innerHTML = `  <div class = "container">
        <a href="${url}">
        <p class = "title"> ${data.articles[i].title}</p> 
        </a> 
            <p class ="content"> ${data.articles[i].description}</p>
            <a href="${url}">read more</a>
            <p>Published At : <span>${data.articles[i].publishedAt}</span></p>
        </div>`
         divContainer.appendChild(div);
    }
}






// 650c76400703470f835d491065da0f9a