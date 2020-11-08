const base_uri = "https://api.football-data.org/v2";
const api_key = "6fe42109b978474d98bae41b5b829796"
const loader = document.querySelector('#loading')
const body = document.querySelector('#body-content')

const fetchAPI = url => {
  return fetch(url, {
      headers: {
        'X-Auth-Token': api_key
      }
    })
    .then(res => {
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText))
      } else {
        return Promise.resolve(res)
      }
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
};

const getAllStandings = (id_standing) => {
  loader.style.display = 'block'
  body.style.display = 'none'

  if ("caches" in window) {
    caches.match(`${base_uri}/competitions/${id_standing}/standings`).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          console.log("Competition Data: " + data);
          showStanding(data);
        })
      }
    })
  }

  fetchAPI(`${base_uri}/competitions/${id_standing}/standings`)
    .then(data => {
      loader.style.display = 'none'
      body.style.display = 'block'

      showStanding(data);
    })
    .catch(error => {
      console.log(error)
    })
}

const showStanding = (data) => {
  let standings = "";
  let standingElement = document.getElementById("bodyTable");

  heading1 = data.competition.name;
  data.standings[0].table.forEach(function(standing) {
    standings += `

                <tr>
                    <td>${standing.position}</td>
                    <td><img src="${standing.team.crestUrl}" alt="${standing.team.name}" height="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.playedGames}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                    <td>${standing.points}</td>
                </tr>
        `;
  });

  standingElement.innerHTML = `
    <div class="col m12 s12">
      <h3 class="header text-center">${heading1}</h3>
      <div class="progress" id="progress" style="display: none;">
        <div class="indeterminate"></div>
      </div>
    </div>
    <div class="col m12 s12">
    <a class="waves-effect waves-light btn" href="#" onClick="window.location.reload();return false;"><i class="material-icons left">arrow_back</i>Back</a>
    </div>
    <div class="col m12 s12">
     <table class="striped highlight responsive-table">
        <thead>
            <tr>
                <th>Position</th>
                <th>Icon</th>
                <th>Name</th>
                <th>Played Games</th>
                <th>Won</th>
                <th>Draw</th>
                <th>Loses</th>
                <th>Goals For</th>
                <th>Goals Againts</th>
                <th>Goal Difference</th>
                <th>Point</th>
            </tr>
        </thead>
        <tbody id="bodyTable">
            ${standings}
        </tbody>
    </table>
    </div>

    `;
  document.getElementById("progress").style.display = "none";
}

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

  data.matches.forEach(function(match) {
    date= new Date(match.utcDate);
    matches += `
    <div class="col s12 m6 xl4">
                  <div class="card">
                        <div class="card-content">

                            <a id="link-detail-upcoming" href="#detailMatch?id=${match.id}">
                                <img src="./images/icons/icon.png" height="60px" alt="link">
                            </a>
                            <div class="header-history">
                                <div class="sub-header-history flex mb-1">
                                    <div class="time flex">
                                        <i class="material-icons ml-2 mr-2">access_time</i>
                                        <p>${date.toString('YYYY-MM-dd')}</p>
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

  loader.style.display = 'none'
  body.style.display = 'block'
  matchesElement.innerHTML=matches;
  console.log(matches)


}

const addToSaved = (id) => {
  const tanya = confirm("Simpan Ke Favorit?")
  let item = getIdDetailTeam();
  if (tanya) {
    item.then(function(teams) {
      saveForLater(teams)
      M.toast({
        html: `Berhasil Menambah ${teams.name} Ke Favorite`
      })
    })
  }
}

function getSavedTeam() {
  getAll()
    .then(function(articles) {

      if (articles == "") {
        document.getElementById("favorite").innerHTML =
          `
            <h3 class="header text-center">Upss...</h3>
            <br>
            <p class="flow-text text-center" >Anda Belum Mempunyai Favorite</p>
            `

      } else {
        // Menyusun komponen card artikel secara dinamis
        let articlesHTML = "";
        articles.forEach(function(teams) {
          articlesHTML += `
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${teams.crestUrl ? teams.crestUrl : "./images/404.jpg"}" height="50px" width="50px" />
                    </div>
                    <div class="card-content">
                        <span class="card-title ">${teams.name}</span>
                        <p>${teams.address}</p>
                    </div>
                    <div class="card-action">
                        <a href="./detailteam.html?id=${teams.id}" class="waves-effect waves-light btn "><i class="material-icons">remove_red_eye</i></a>
                        <button onclick="deleteOnFavorite(${teams.id},'${teams.name}')" class="waves-effect waves-light btn red"><i class="material-icons">clear</i></button>
                    </div>
                </div>
                    `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #favorite
        document.getElementById("favorite").innerHTML = articlesHTML;
      }
    });
}



const deleteOnFavorite = (id, name) => {

  const tanya = confirm("Yakin Ingin Menghapus?")
  if (tanya) {
    deleteFavorite(id)
    M.toast({
      html: `Berhasil Menghapus ${name}`
    })
    getSavedTeam()

  } else {
    getSavedTeam()
  }
}
