function getTeamById() {
  loader.style.display = 'block'
  body.style.display = 'none'
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

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
