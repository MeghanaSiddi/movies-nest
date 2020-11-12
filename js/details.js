var showId = window.location.search.split('=')[1];
const url = `http://api.tvmaze.com/shows/${showId}`;
async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    if (response.status === 200) {
        var myHtml = '';
        myHtml += `
							<div class="movieWrapper">
								<div class="resWrapper">
									<div class="abtMovie">

										<div class="imgDiv">
											<img src=${data.image?.medium} alt="" loading="lazy"/>
										</div>

										<div class="descMovie">
													<h1>${data.name}</h1>
													<h4>${data.summary}</h3>
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

    }

    document.getElementById('detailsSection').innerHTML = myHtml;


}


getapi(url);
