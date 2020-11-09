var dbPromised = idb.open("DiBola-Database", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "shortName", { unique: false });
});

function saveForLater(teams)  {
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
    });
}
