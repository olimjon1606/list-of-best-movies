const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';


const main = document.querySelector('.boxes');
const form = document.querySelector('form');
const input = document.querySelector('input');
const movieTitle = document.querySelector('.title');
const pageNo = document.querySelector('.pageNo');
let page = 1;

getMovies(APIURL + page)

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json()

    console.log(respData);
    showMovies(respData.results)
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const {
            poster_path, title, vote_average, overview, release_date
        } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('box')

        movieEl.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="${title}" width="320px"
                    height="400px">
                <div class="movie-info">
                    <p>${title}</p>
                    <span class="${getClass(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h5>Released:</h5>
                    ${release_date}
                    <h5>Overview</h5>
                    ${overview}
                </div>`;
        main.appendChild(movieEl);
    });
}

function getClass(vote) {
    if (vote >= 8){
        return 'green'
    } else if (vote >= 5){
        return 'orange';
    } else {
        return 'red';
    }
}
form.addEventListener('submit', e =>{
    e.preventDefault();
    const searchTerm = input.value;

    if (searchTerm) {
        movieTitle.textContent = searchTerm;
        getMovies(SEARCHAPI + searchTerm)
        input.value = ''
    };
});

// left, right

const nextBtn = document.getElementById('right')
const prevBtn = document.getElementById('left')
const upImg = document.getElementById('upImg')

nextBtn.addEventListener('click', () =>{
    page++;

    movieTitle.textContent = 'The Most Popular Movies';
    getMovies(APIURL + page);
    pageNo.textContent = page;
});

prevBtn.addEventListener('click', () =>{
    page--;
    if(page <= 0){
        page = 1
    }

    movieTitle.textContent = 'The Most Popular Movies';
    getMovies(APIURL + page);
    pageNo.textContent = page;
});









let modeBtn = document.getElementById("mode-btn")
let icon = document.querySelector('.far')
let header = document.getElementById("header")
let footer = document.getElementById("footer")
let search = document.getElementById("search")
let l = document.getElementById("l")
let isNightMode = 0;
 

modeBtn.addEventListener('click', () => {
    if (isNightMode) {
        document.body.style.background = '#22254b'
        header.style.background = '#3a3e7c';
        footer.style.background = '#3a3e7c';
        search.style.background = '#3a3e7c';
        icon.classList.add('fa-moon')
        icon.classList.remove('fa-sun')
        // l.style.background = '#3a3e7c';
        isNightMode = 0;
        console.log(isNightMode);
    } else {
        document.body.style.background = '#f0f0f0';
        header.style.background = '#76a9f7';
        footer.style.background = '#76a9f7';
        search.style.background = '#76a9f7';
        // l.style.background = '#76a9f7';
        icon.classList.remove('fa-moon')
        icon.classList.add('fa-sun')
        isNightMode = 1;
        console.log(isNightMode);
    };
})


var upBtn = document.getElementById('up')

window.onscroll = function(){
    scrollFunction()
};

function scrollFunction(){
    if(document.body.scroll > 300 || document.documentElement.scrollTop > 300){
        upBtn.style.display = 'block';
    } else {
        upBtn.style.display = 'none';
    }
}