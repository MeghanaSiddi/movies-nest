let showId = window.location.search.split('=')[1];
const url = `http://api.tvmaze.com/shows/${showId}`;
async function getapi(url) {
	try{
	showLoader();
	const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
        let myHtml = '';
        myHtml += `
							<div class="movieWrapper">
								<div class="resWrapper">
									<div class="abtMovie">
										<div class="imgDiv">
											<img src=${data.image?.medium??'images/image-not-found.jpg'} alt="" loading="lazy"/>
										</div>
										<div class="descMovie">
													<h1>${data.name}</h1>
													<h4>${data.summary?data.summary:'No summary available'}</h4>
										</div>							

									</div>
									<div>
											<div class="otherDetails">
											<div>Rating: ${data.rating?.average ?? 'No ratings'}</div>
											<div>Streams on: ${data.network?.name}</div>
											<div>Run Time: ${data.runtime} minutes</div>
											<div>Language: ${data.language}</div>
											<div>Country: ${data.network?.country?.name}</div>											
											<div>Premiered on: ${data.premiered}</div>
											<div>Status: ${data.status}</div>
										</div>
									</div>
								</div>
							</div>

						`;
						 document.getElementById('detailsSection').innerHTML = myHtml;

    }
    else{
    	document.getElementById('detailsSection').innerHTML =`<h1 class="error-text">Something went wrong</h1>`;
    }
   		hideLoader();
	}
	catch(err){
		hideLoader();
		document.getElementById('detailsSection').innerHTML = `<h1 class="error-text">${err.message}</h1>`;
	}



}

function hideLoader() {
    if (document.getElementById('loading'))
        document.getElementById('loading').style.display = 'none';
}

function showLoader() {
    if (document.getElementById('loading'))
        document.getElementById('loading').style.display = 'flex';
}

getapi(url);
