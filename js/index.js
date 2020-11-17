var getAllGenres = [];
const api_url = "http://api.tvmaze.com/shows";
async function getapi(url) {
    try {
        const response = await fetch(url);
        var data = await response.json();
        console.log(data);
        if (response.status === 200) {

            if (data.length > 0) {
                hideLoader();
                let popularshows = [];
                popularshows = data.sort((a, b) => (a.rating.average * 10 > b.rating.average * 10) ? -1 : ((b.rating.average * 10 > a.rating.average * 10) ? 1 : 0));

                let len = popularshows.length;
                for (let i = 0; i < len; i++) {
                    if (popularshows[i].genres.length !== 0)
                        getAllGenres.push(popularshows[i].genres);
                }
                getAllGenres = getAllGenres.flat(Infinity);
                getAllGenres = [... new Set(getAllGenres)];
                let finaldata = {};
                finaldata = Object.fromEntries(getAllGenres.map(key => [key, []]));
                popularshows.forEach(function (v, i) {
                    v.genres.map(function (a, index) {
                        if (finaldata.hasOwnProperty(a)) {
                            console.log(v);
                            if (finaldata[a]) {
                                finaldata[a].push(popularshows[i]);
                            }
                        }

                    })
                });
                topPopuplarShows = popularshows.slice(0, 5);
                showPopularShows(topPopuplarShows);
                ShowAllMoviesByGenres(finaldata);

            }

            else {
                document.getElementById('resultsDiv').innerHTML = `<h1 class="error-text">No results found</h1>`;
            }


        }
        else {
            document.getElementById('resultsDiv').innerHTML = `<h1 class="error-text">Something went wrong</h1>`;
        }
        hideLoader();
    }
    catch (err) {
        hideLoader();
        document.getElementById('resultsDiv').innerHTML = `<h1 class="error-text">${err.message}</h1>`;
    }
}
getapi(api_url);
function hideLoader() {
    if (document.getElementById('loading'))
        document.getElementById('loading').style.display = 'none';
}

function showLoader() {
    if (document.getElementById('loading'))
        document.getElementById('loading').style.display = 'flex';
}
function showPopularShows(data) {
    var myHtml = '';
    var newHTml = '';

    for (var i = 0; i < data.length; i++) {
        myHtml += `<li class="" data-target="#myCarousel" data-slide-to=${i}></li>`;
        newHTml += `<div class="item">
         				<a href=detailsPage.html?id=${data[i].id} target="_self"><img src=${data[i].image.medium??'images/image-not-found.jpg'} alt=${data[i].name} style="width:50%;" loading="lazy" onclick="LeftClick(event)"/><div style="display:inline-block;width:50%;float:right;" class="slidesText"><h1>${data[i].name}</h1><h4>Rating: ${data[i].rating.average}</h4></div></a>
     				 </div>`;

    }
    document.getElementById('popularCarousel').innerHTML = myHtml;
    document.getElementById("popularCarousel").firstElementChild.className = 'active';
    document.getElementById('popularSlides').innerHTML = newHTml;
    var element = document.getElementById("popularSlides").firstElementChild;
    element.className += " " + "active";
}


function ShowAllMoviesByGenres(data) {
    var myHtml = '';
    for (var i in data) {
        myHtml += `<div class="eachSection">
		<h1>${i} Movies</h1>
		<div class="slide-wrapper">
		<img id="slideLeft" class="arrow" src="images/arrow-left.png" onclick="LeftClick(event)"/>		
		<ul id="autoWidth_${i}" class="cs-hidden slider">`;
        data[i].forEach(function (v, index) {
            myHtml += `<li class="item">
				  	<div class="box">
					<div class="slide-img">
						<img src=${v.image.medium??'images/image-not-found.jpg'} alt=${v.name} loading="lazy">
						<div class="overlay">
							<a href=detailsPage.html?id=${v.id} class="view-btn" target="_self">View Details</a>
						</div>
					</div>
					<div class="detail-box">
						<div class="type">
							<b href="#">${v.name}</b>
							<span>${v.language}</span>
						</div>
						<span class="rating">${v.rating?.average ?? 'No ratings'}</span>
					</div>
					</div>
				  </li>`;
        });
        myHtml += `</ul>
			<img id="slideRight" class="arrow" src="images/arrow-right.png" onclick="RightClick(event)"/>
			</div></div>  
			`;
    }

    document.getElementById('moviesSection').innerHTML = myHtml;
    getAllGenres.forEach(function (v, i) {
        let current = document.getElementById(`autoWidth_${v}`);
        if (current.scrollWidth <= current.clientWidth) {
            current.previousElementSibling.style.display = 'none';
            current.nextElementSibling.style.display = 'none';
        }
    });

}
function LeftClick(event) {
    event.target.nextElementSibling.scrollLeft -= 350;
}

function RightClick(event) {
    console.log(event);
    event.target.previousElementSibling.scrollLeft += 350;
}

function searchShows(event) {
    var txt = document.getElementById("Srchtext").value;
    const url = `http://api.tvmaze.com/search/shows?q=${txt}`;
    if (!txt) {
        window.location.reload();
        return;
    }

    async function getSearchResults(url) {
        try {
            showLoader();
            const response = await fetch(url);
            var data = await response.json();
            console.log(data);
            if (response.status === 200) {
                hideLoader();
                if (data.length > 0) {
                    let myHtml = '<h1>Results</h1>';
                    data.forEach(function (v, i) {
                        myHtml += `<div class="box resBox">
					<div class="slide-img">
						<img src=${v.show?.image?.medium??'images/image-not-found.jpg'} alt="" loading="lazy"/>
						<div class="overlay">
							<a href=detailsPage.html?id=${v.show.id} class="view-btn" target="_self">View Details</a>
						</div>
					</div>
					<div class="detail-box">
						<div class="type">
							<a href="#">${v.show?.name}</a>
							<span>${v.show?.language}</span>
						</div>
						<span class="rating">${v.show.rating?.average ?? 'No ratings'}</span>
					</div>
					</div>`;
                    });
                    if (document.getElementById('pageLoadDiv'))
                        document.getElementById('pageLoadDiv').style.display = 'none';
                    document.getElementById('resultsDiv').innerHTML = myHtml;
                }

                else {
                    document.getElementById('resultsDiv').innerHTML = `<h1 class="error-text">No results found</h1>`;
                }
            }
            else {
                document.getElementById('resultsDiv').innerHTML = `<h1 class="error-text">Something Went Wrong</h1>`;
            }
        }
        catch (err) {
            hideLoader();
            document.getElementById('resultsDiv').innerHTML = `<h1 class="error-text">${err.message}</h1>`;
        }
    }

    getSearchResults(url);

}
