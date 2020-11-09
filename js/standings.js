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
                    <td><a href="javascript:getTeamById(${standing.team.id})">${standing.team.name}</a></td>
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
      <h5 class="header text-center">Click on teams to go to detail and save your favorite teams!</h5>
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
}
