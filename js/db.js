var dbPromised = idb.open("DiBola-Database", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("matches", {
    keyPath: "ID"
  });
  articlesObjectStore.createIndex("post_title", "post_title", { unique: false });
});

function saveForLater(matches)  {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("matches", "readwrite");
      var store = tx.objectStore("matches");
      console.log(matches);
      store.add(matches.id);
      store.add(matches.homeTeam.name);
      store.add(matches.awayTeam.name);
      store.add(matches.homeTeam.id);
      store.add(matches.awayTeam.id);

      return tx.complete;
    })
    .then(function() {
      console.log("Match di simpan.");
    });
}
