
const getAllMatches = () => {
  loader.style.display = 'block'
  body.style.display = 'none'
  if ("caches" in window) {
    caches.match(`${base_uri}/matches`).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          console.log("Match Data: " + data);
        })
      }
    })
  }


  fetchAPI(`${base_uri}/matches`)
    .then(data => {
      console.log("Match Data: " + data);
      showMatches(data);
    })
    .catch(error => {
      console.log(error)
    })
}

const showMatches = (data) => {
  let matches = "";
  let matchesElement = document.getElementById("bodyMatches");

  if (isObjectEmpty(data.matches)) {
    // Object is empty (Would return true in this example)
    matches += `
    <div id="error-page">

        <div class="row">
          <div class="col s12">
            <div class="browser-window">
              <div class="top-bar">
                <div class="circles">
                  <div id="close-circle" class="circle"></div>
                  <div id="minimize-circle" class="circle"></div>
                  <div id="maximize-circle" class="circle"></div>
                </div>
              </div>
              <div class="content">
                  <div id="site-layout-example-right" class="col s12 m12 l12">
                    <div class="row center">
                      <h1 class="text-long-shadow col s12">404</h1>
                      <h5 class="text-long-shadow col s12">Page found but no match currently hold!</h5>

                    </div>
                    <div class="row center">
                      <p class="center white-text col s12">It seems that this page doesn’t exist.</p>
                      <p class="center s12">
                      <a href="index.html" class="btn waves-effect waves-light">Homepage</a>
                        </p><p>
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  } else {
    // Object is NOT empty
    data.matches.forEach(function(match) {
      date = new Date(match.utcDate);
      matches += `

      <div class="col s12 m6 xl4">
                    <div class="card">
                          <div class="card-content">


                              <div class="header-history">
                                  <div class="sub-header-history flex mb-1">
                                      <div class="time flex">
                                          <i class="material-icons ml-2 mr-2">access_time</i>
                                          <p>${date.toString().split('GMT')[0]}</p>
                                      </div>
                                      <div class="time flex">
                                        <a class="btn tooltipped" data-position="bottom" data-tooltip="Detail ${match.homeTeam.name} vs ${match.awayTeam.name}!" id="link-detail-upcoming" href="javascript:getMatchById(${match.id});">
                                            DETAIL
                                        </a>
                                      </div>
                                  </div>
                                  <div class="divider"></div>
                              </div>
                              <div class="container-history flex mt-2">
                                  <div class="homeTeam center basis-1">
                                      <a href="#team?id=${match.homeTeam.id}" id="link-team">
                                          <img class="club-logo-upcoming mr-1" src="https://crests.football-data.org/${match.homeTeam.id}.svg" alt="${match.homeTeam.name}">
                                          <p>${match.homeTeam.name}</p>
                                      </a>
                                  </div>
                                  <div class="mid">
                                      VS
                                  </div>
                                  <div class="awayTeam center basis-1">
                                      <a href="#team?id=${match.awayTeam.id}" id="link-team">
                                          <img class="club-logo-upcoming mr-1" src="https://crests.football-data.org/${match.awayTeam.id}.svg" alt="${match.awayTeam.name}">
                                          <p>${match.awayTeam.name}</p>
                                      </a>
                                  </div>
                              </div>

                          </div>
                      </div>
                  </div>
      `
    });
  }


  loader.style.display = 'none'
  body.style.display = 'block'
  matchesElement.innerHTML = matches;

  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems);
}

function getMatchById(idParam) {
  loader.style.display = 'block'
  body.style.display = 'none'
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)

    if ("caches" in window) {
      caches.match(base_uri + "/matches/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let referees = "";
            // Objek JavaScript dari response.json() masuk lewat variabel data.

            date = new Date(data.match.utcDate);
            var now = new Date();

            if (date < now) {
              button_save = `
                <a class="red waves-effect waves-light btn" href="#" onClick="window.location.reload();return false;">This match already passed!</a>
              `;
            } else {
              button_save = `
                <a class="green waves-effect waves-light btn" href="#" onClick="window.location.reload();return false;">Save and Notify Me!</a>
              `;
            }
            data.match.referees.forEach(function(referee) {
              referees += `

                          <tr>
                              <td>${referee.name}</td>
                              <td>${referee.nationality}</td>
                          </tr>
                  `;
            });

            insertReferee = `<table class="striped highlight responsive-table">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>Nationality</th>
                   </tr>
               </thead>
               <tbody id="bodyTable">
                   ${referees}
               </tbody>
           </table>`
            var articleHTML = `
                      <div class="row">
                        <!-- Status schedule match -->
                      </div>

                      <div class="detail-match">
                        <div class="col m6 s12">
                          <div class="card">
                            <div class="card-content">
                              Head to Head
                            </div>

                            <div class="card-action">
                              <div class="container-history mt-2">
                                <div class="flex">
                                  <div class="homeTeam center basis-1">
                                    <img class="club-logo-upcoming mr-1" src="https://crests.football-data.org/${data.match.homeTeam.id}.svg" alt="${data.match.homeTeam.name}">
                                    <p id="match-home-name">${data.match.homeTeam.name}</p>
                                  </div>

                                  <div class="winrate basis-1">
                                    <div class="win flex my-2">
                                      <span class="badge green white-text rounded-4 mr-3 ml-0">Win</span>
                                      <span id="h2h-win-home">${data.head2head.homeTeam.wins}</span>
                                    </div>
                                    <div class="draw flex my-2">
                                      <span class="badge grey white-text rounded-4 mr-3 ml-0">Draw</span>
                                      <span id="h2h-draw-home">${data.head2head.homeTeam.draws}</span>
                                    </div>
                                    <div class="lose flex my-2">
                                      <span class="badge red white-text rounded-4 mr-3 ml-0">lose</span>
                                      <span id="h2h-lose-home">${data.head2head.homeTeam.losses}</span>
                                    </div>
                                  </div>
                                </div>

                                <div class="divider my-2">
                                </div>
                                <div class="flex">
                                  <div class="awayTeam center basis-1">
                                    <img class="club-logo-upcoming mr-1" src="https://crests.football-data.org/${data.match.awayTeam.id}.svg" alt="${data.match.awayTeam.name}">
                                    <p id="match-away-name">${data.match.awayTeam.name}</p>
                                  </div>

                                  <div class="winrate basis-1">
                                    <div class="win flex my-2">
                                      <span class="badge green white-text rounded-4 mr-3 ml-0">Win</span>
                                      <span id="h2h-win-away">${data.head2head.awayTeam.wins}</span>
                                    </div>
                                    <div class="draw flex my-2">
                                      <span class="badge grey white-text rounded-4 mr-3 ml-0">Draw</span>
                                      <span id="h2h-draw-away">${data.head2head.awayTeam.draws}</span>
                                    </div>
                                    <div class="lose flex my-2">
                                      <span class="badge red white-text rounded-4 mr-3 ml-0">lose</span>
                                      <span id="h2h-lose-away">${data.head2head.awayTeam.losses}</span>
                                    </div>
                                  </div>
                                </div>

                                <div class="win flex my-2">
                                  <span class="badge mr-3">Number of Match</span>
                                  <span id="h2h-nom">${data.head2head.numberOfMatches}</span>
                                </div>
                                <div class="win flex my-2">
                                  <span class="badge mr-3">Total Goals</span>
                                  <span id="h2h-total-goals">${data.head2head.totalGoals}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col m6 s12">
                          <div class="card">
                            <div class="card-content">
                              <div class="header-history">
                                <div class="sub-header-history flex mb-1">
                                  <div class="time flex">
                                    <i class="material-icons ml-2 mr-2">access_time</i>
                                    <p>${date.toString().split('GMT')[0]}</p>
                                  </div>
                                </div>
                                <div class="divider"></div>
                              </div>
                              <div class="container-history flex mt-2">
                                <div class="homeTeam center basis-1">
                                  <a href="#team?id=${data.match.homeTeam.id}" id="link-team">
                                    <img class="club-logo-upcoming mr-1" src="https://crests.football-data.org/${data.match.homeTeam.id}.svg" alt="${data.match.homeTeam.name}">
                                    <p>${data.match.homeTeam.name}</p>
                                  </a>
                                </div>
                                <div class="mid">
                                  VS
                                </div>
                                <div class="awayTeam center basis-1">
                                  <a href="#team?id=${data.match.awayTeam.id}" id="link-team">
                                    <img class="club-logo-upcoming mr-1" src="https://crests.football-data.org/${data.match.awayTeam.id}.svg" alt="${data.match.awayTeam.name}">
                                    <p>${data.match.awayTeam.name}</p>
                                  </a>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                        <div class="col m6 s12 ml-auto">
                          <div class="card">
                            <div class="card-content">
                              <h5>Referees</h5>
                              ${insertReferee}

                            </div>
                          </div>
                        </div>

                        <div class="col m6 s12 ml-auto">
                          <div class="card">
                            <div class="card-content">
                              ${button_save}
                            </div>
                          </div>
                        </div>

                      </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("bodyMatches").innerHTML = articleHTML;
            loader.style.display = 'none'
            body.style.display = 'block'
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchAPI(base_uri + "/matches/" + idParam)
      .then(function(data) {
        let referees = "";
        date = new Date(data.match.utcDate);
        var now = new Date();

        if (date < now) {
          button_save = `
            <a class="red waves-effect waves-light btn" href="#" onClick="window.location.reload();return false;">This match already passed!</a>
          `;
        } else {
          button_save = `
            <a class="green waves-effect waves-light btn" href="#" onClick="window.location.reload();return false;">Save and Notify Me!</a>
          `;
        }

        data.match.referees.forEach(function(referee) {
          referees += `

                      <tr>
                          <td>${referee.name}</td>
                          <td>${referee.nationality}</td>
                      </tr>
              `;
        });

        insertReferee = `<table class="striped highlight responsive-table">
           <thead>
               <tr>
                   <th>Name</th>
                   <th>Nationality</th>
               </tr>
           </thead>
           <tbody id="bodyTable">
               ${referees}
           </tbody>
       </table>`

        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
              <div class="row">
                <!-- Status schedule match -->
              </div>


              <div class="detail-match">
                <div class="col m6 s12">
                  <div class="card">
                    <div class="card-content">
                      Head to Head
                    </div>

                    <div class="card-action">
                      <div class="container-history mt-2">
                        <div class="flex">
                          <div class="homeTeam center basis-1">
                            <img class="club-logo-upcoming mr-1" src="https://crests.football-data.org/${data.match.homeTeam.id}.svg" alt="${data.match.homeTeam.name}">
                            <p id="match-home-name">${data.match.homeTeam.name}</p>
                          </div>

                          <div class="winrate basis-1">
                            <div class="win flex my-2">
                              <span class="badge green white-text rounded-4 mr-3 ml-0">Win</span>
                              <span id="h2h-win-home">${data.head2head.homeTeam.wins}</span>
                            </div>
                            <div class="draw flex my-2">
                              <span class="badge grey white-text rounded-4 mr-3 ml-0">Draw</span>
                              <span id="h2h-draw-home">${data.head2head.homeTeam.draws}</span>
                            </div>
                            <div class="lose flex my-2">
                              <span class="badge red white-text rounded-4 mr-3 ml-0">lose</span>
                              <span id="h2h-lose-home">${data.head2head.homeTeam.losses}</span>
                            </div>
                          </div>
                        </div>

                        <div class="divider my-2">
                        </div>
                        <div class="flex">
                          <div class="awayTeam center basis-1">
                            <img class="club-logo-upcoming mr-1" src="https://crests.football-data.org/${data.match.awayTeam.id}.svg" alt="${data.match.awayTeam.name}">
                            <p id="match-away-name">${data.match.awayTeam.name}</p>
                          </div>

                          <div class="winrate basis-1">
                            <div class="win flex my-2">
                              <span class="badge green white-text rounded-4 mr-3 ml-0">Win</span>
                              <span id="h2h-win-away">${data.head2head.awayTeam.wins}</span>
                            </div>
                            <div class="draw flex my-2">
                              <span class="badge grey white-text rounded-4 mr-3 ml-0">Draw</span>
                              <span id="h2h-draw-away">${data.head2head.awayTeam.draws}</span>
                            </div>
                            <div class="lose flex my-2">
                              <span class="badge red white-text rounded-4 mr-3 ml-0">lose</span>
                              <span id="h2h-lose-away">${data.head2head.awayTeam.losses}</span>
                            </div>
                          </div>
                        </div>

                        <div class="win flex my-2">
                          <span class="badge mr-3">Number of Match</span>
                          <span id="h2h-nom">${data.head2head.numberOfMatches}</span>
                        </div>
                        <div class="win flex my-2">
                          <span class="badge mr-3">Total Goals</span>
                          <span id="h2h-total-goals">${data.head2head.totalGoals}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col m6 s12">
                  <div class="card">
                    <div class="card-content">
                      <div class="header-history">
                        <div class="sub-header-history flex mb-1">
                          <div class="time flex">
                            <i class="material-icons ml-2 mr-2">access_time</i>
                            <p>${date.toString().split('GMT')[0]}</p>
                          </div>
                        </div>
                        <div class="divider"></div>
                      </div>
                      <div class="container-history flex mt-2">
                        <div class="homeTeam center basis-1">
                          <a href="#team?id=${data.match.homeTeam.id}" id="link-team">
                            <img class="club-logo-upcoming mr-1" src="https://crests.football-data.org/${data.match.homeTeam.id}.svg" alt="${data.match.homeTeam.name}">
                            <p>${data.match.homeTeam.name}</p>
                          </a>
                        </div>
                        <div class="mid">
                          VS
                        </div>
                        <div class="awayTeam center basis-1">
                          <a href="#team?id=${data.match.awayTeam.id}" id="link-team">
                            <img class="club-logo-upcoming mr-1" src="https://crests.football-data.org/${data.match.awayTeam.id}.svg" alt="${data.match.awayTeam.name}">
                            <p>${data.match.awayTeam.name}</p>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="col m6 s12 ml-auto">
                  <div class="card">
                    <div class="card-content">
                      <h5>Referees</h5>
                      ${insertReferee}

                    </div>
                  </div>
                </div>

                <div class="col m6 s12 ml-auto">
                  <div class="card">
                    <div class="card-content">
                      ${button_save}
                    </div>
                  </div>
                </div>

              </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("bodyMatches").innerHTML = articleHTML;
        loader.style.display = 'none'
        body.style.display = 'block'
        resolve(data);

      });
  });
}
