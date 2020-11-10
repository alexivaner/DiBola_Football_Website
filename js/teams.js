const getTeamById = () => {
  loader.style.display = 'block'
  body.style.display = 'none'
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    console.log(idParam);
    if ("caches" in window) {
      caches.match(base_uri + "/teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let squads = "";
            data.squad.forEach(function(squad) {
              shirtnum = squad.shirtNumber || "-";
              borndate = new Date(squad.dateOfBirth);
              if (borndate.getMonth() == 0) {
                month = "No Month";
              } else {
                month = borndate.getMonth();
              }
              position = squad.position || "-"
              squads += `

                  <tr>
                      <td>${position}</td>
                      <td>${squad.name}</td>
                      <td>${shirtnum}</td>
                      <td>${squad.nationality}</td>
                      <td>${borndate.getFullYear()+"-"+month+"-"+borndate.getDate()}</td>
                  </tr>
                  `;
            });

            // Menyusun komponen card artikel secara dinamis
            var articleHTML = `
            <div class="container" id="content">
              <div class="collection center white-text orange darken-1">
                <h5>Team Details</h5>
              </div>
              <div class="card mt-2 p2">
                <div class="row">
                  <div class="col s12 m4 center">
                    <img src="https://crests.football-data.org/${data.id}.svg" alt="${data.name}" class="responsive-img">
                  </div>
                  <div class="col s12 m8">
                    <table class="striped highlight">
                      <tbody>
                        <tr>
                          <th>Team Name</th>
                          <td>${data.name}</td>
                        </tr>
                        <tr>
                          <th>Short Name</th>
                          <td>${data.shortName}</td>
                        </tr>
                        <tr>
                          <th>Colors</th>
                          <td>${data.clubColors}</td>
                        </tr>
                        <tr>
                          <th>Stadium</th>
                          <td>${data.venue}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>${data.email}</td>
                        </tr>
                        <tr>
                          <th>Country</th>
                          <td>${data.area.name}</td>
                        </tr>
                        <tr>
                          <th>Founded</th>
                          <td>${data.email}</td>
                        </tr>
                        <tr>
                          <th>Address</th>
                          <td>${data.address}</td>
                        </tr>
                        <tr>
                          <th>Phone</th>
                          <td>${data.phone}</td>
                        </tr>
                        <tr>
                          <th>Website</th>
                          <td><a target="_blank" href="${data.website}">${data.website}</a> </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="collection center white-text orange darken-1">
                    <h5>Squads</h5>
                  </div>
                  <div>
                    <table class="striped highlight responsive-table">
                      <thead>
                        <tr>
                          <th>Position</th>
                          <th>Name</th>
                          <th>Shirt Number</th>
                          <th>Nationality</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody id="squadContainer">
                        ${squads}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="fixed-action-btn">
                <a class="btn-floating btn-large orange tooltipped" data-position="bottom" data-tooltip="Save this as favorite team!" id="save">
                  <i class="large material-icons">save</i>
                </a>
              </div>
            </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;
            loader.style.display = 'none'
            body.style.display = 'block'
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchAPI(base_uri + "/teams/" + idParam)
      .then(function(data) {
        let squads = "";
        data.squad.forEach(function(squad) {
          shirtnum = squad.shirtNumber || "-";
          borndate = new Date(squad.dateOfBirth);
          if (borndate.getMonth() == 0) {
            month = "No Month";
          } else {
            month = borndate.getMonth();
          }
          position = squad.position || "-"
          squads += `

              <tr>
                  <td>${position}</td>
                  <td>${squad.name}</td>
                  <td>${shirtnum}</td>
                  <td>${squad.nationality}</td>
                  <td>${borndate.getFullYear()+"-"+month+"-"+borndate.getDate()}</td>
              </tr>
              `;
        });

        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
        <div class="container" id="content">
          <div class="collection center white-text orange darken-1">
            <h5>Team Details</h5>
          </div>
          <div class="card mt-2 p2">
            <div class="row">
              <div class="col s12 m4 center">
                <img src="https://crests.football-data.org/${data.id}.svg" alt="${data.name}" class="responsive-img">
              </div>
              <div class="col s12 m8">
                <table class="striped highlight">
                  <tbody>
                    <tr>
                      <th>Team Name</th>
                      <td>${data.name}</td>
                    </tr>
                    <tr>
                      <th>Short Name</th>
                      <td>${data.shortName}</td>
                    </tr>
                    <tr>
                      <th>Colors</th>
                      <td>${data.clubColors}</td>
                    </tr>
                    <tr>
                      <th>Stadium</th>
                      <td>${data.venue}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>${data.email}</td>
                    </tr>
                    <tr>
                      <th>Country</th>
                      <td>${data.area.name}</td>
                    </tr>
                    <tr>
                      <th>Founded</th>
                      <td>${data.email}</td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>${data.address}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>${data.phone}</td>
                    </tr>
                    <tr>
                      <th>Website</th>
                      <td><a target="_blank" href="${data.website}">${data.website}</a> </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="collection center white-text orange darken-1">
                <h5>Squads</h5>
              </div>
              <div>
                <table class="striped highlight responsive-table">
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>Name</th>
                      <th>Shirt Number</th>
                      <th>Nationality</th>
                      <th>Date of Birth</th>
                    </tr>
                  </thead>
                  <tbody id="squadContainer">
                    ${squads}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        loader.style.display = 'none'
        body.style.display = 'block'
        resolve(data);

      });
  });
}

const getSavedTeams = () => {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    if (isObjectEmpty(teams)) {
      articlesHTML=`
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
                        <h5 class="text-long-shadow col s12">Page found but team not found! Add your favorite team!</h5>

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
      teams.forEach(function(data) {
        articlesHTML += `
        <div class="card">
          <div class="card-content">
            <div class="row">
              <div class="col s12 m4 center">
                <img src="https://crests.football-data.org/${data.id}.svg" alt="${data.name}" class="responsive-img">
              </div>
              <div class="col s12 m8">
              <h5 class="text-long-shadow col s12"><a href="./team.html?id=${data.id}&saved=true">${data.name}</a></h5>
                <table class="striped highlight">
                  <tbody>
                    <tr>
                      <th>Team Name</th>
                      <td>${data.name}</td>
                    </tr>
                    <tr>
                      <th>Short Name</th>
                      <td>${data.shortName}</td>
                    </tr>
                    <tr>
                      <th>Country</th>
                      <td>${data.area.name}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        `;
      });
    }



    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("bodyMatches").innerHTML = articlesHTML;
  });
}
