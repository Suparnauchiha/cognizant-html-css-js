const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=7df53dc012e016a585b15fb9883911b7&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=7df53dc012e016a585b15fb9883911b7&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getMovies(url){
    const res= await fetch(url);
    console.log(res.json());
}


//for fetch use async aswit
async function getMovies(url){
    try{
        const response= await fetch(url); //by default fetch(url) makes a GET request.
        const data= await response.json(); // to parse the response body as JSON.
        console.log(data);
        showMovies(data.results);
    }
    catch(error){
        console.error("error in fetching:", error);
    }
    
}
getMovies(API_URL)

const getRatingClass= (rating)=>{
    if(rating >= 8) return 'green';
    if(rating>= 5) return 'orange';
    else return 'red';
}

function showMovies(movies) {
    main.innerHTML=''; //clear all before stuff
   


    movies.forEach((movie)=>{
        const {title,poster_path,vote_average,overview}= movie;
        const movieEl= document.createElement('div');
        movieEl.classList.add('movie'); // if class is not preexisting then add a class
        

        movieEl.innerHTML=`
        <img src= "${IMG_PATH+poster_path}" alt= "${title}">
        <div class="movie-info">
            <h3> ${title}</h3>
            <span class="${getRatingClass(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
        
        `
        main.appendChild(movieEl);
    })
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm= search.value.trim();;
    if(searchTerm && searchTerm!== ''){
        getMovies(SEARCH_API +searchTerm);
        search.value= ''
    }
    else{
        const noitem= document.createElement('div');
        noitem.classList.add('no-results');
        noitem.textContent=`
        ${searchTerm} doesn't exist ,please check again
        `
         main.innerHTML = '';
         main.appendChild(noitem);
    
    }
})