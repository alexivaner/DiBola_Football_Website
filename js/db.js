var dbPromised = idb.open("DiBola-Database", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "shortName", {
    unique: false
  });
});

const saveForLater = (teams) => {
  return new Promise(function(resolve, reject) {

    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(teams);
        store.add(teams);
        return tx.complete;
      })
      .then(function() {
        console.log("Team di simpan.");
        resolve('Successfully added to favorite');

      })
      .catch(function() {
        console.log("Data available");
        reject("You already save this team as favorite!");

      });
  });
}

const deleteTeam = (teams) => {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(teams);
      store.delete(teams.id);
      return tx.complete;
    })
    .then(function() {
      console.log("Team di hapus.");
    });
}



const getAll = () => {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}
