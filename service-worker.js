const CACHE_NAME = "DiBola v0.8";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/team.html",

  "/assets/about.jpg",
  "/assets/background1.jpg",
  "/assets/comingsoon.jpg",
  "/assets/contact.jpg",
  "/assets/logo.png",
  "/assets/soccer-ball.png",
  "/assets/football-field.png",
  "/assets/tshirt.png",


  "/css/materialize.css",
  "/css/materialize.min.css",
  "/css/style.css",

  "/js/init.js",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/standings.js",
  "/js/matches.js",
  "/js/teams.js",
  "/js/service-register.js",

  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/league.html",
  "/pages/matches.html",
  "/pages/saved.html",



  "/images/icons/android-icon-36x36.png",
  "/images/icons/android-icon-48x48.png",
  "/images/icons/android-icon-72x72.png",
  "/images/icons/android-icon-96x96.png",
  "/images/icons/android-icon-144x144.png",
  "/images/icons/android-icon-192x192.png",

  "/images/icons/apple-icon.png",
  "/images/icons/apple-icon-57x57.png",
  "/images/icons/apple-icon-60x60.png",
  "/images/icons/apple-icon-72x72.png",
  "/images/icons/apple-icon-76x76.png",
  "/images/icons/apple-icon-114x114.png",
  "/images/icons/apple-icon-120x120.png",
  "/images/icons/apple-icon-144x144.png",
  "/images/icons/apple-icon-152x152.png",
  "/images/icons/apple-icon-180x180.png",
  "/images/icons/apple-icon-precomposed.png",

  "/images/icons/favicon.ico",
  "/images/icons/favicon-16x16.png",
  "/images/icons/favicon-32x32.png",
  "/images/icons/favicon-96x96.png",
  "/images/icons/favicon-512x512.png",

  "/images/icons/ms-icon-70x70.png",
  "/images/icons/ms-icon-144x144.png",
  "/images/icons/ms-icon-150x150.png",
  "/images/icons/ms-icon-310x310.png",

  "/images/loading/loading.gif",


  "images/logo_league/championsleague.png",
  "images/logo_league/portugueseprimeradivision.png",
  "images/logo_league/logo_premier_league.png",
  "images/logo_league/logo_eredivisie.png",
  "images/logo_league/logo_bundesliga.png",
  "images/logo_league/logo_ligue_1.png",
  "images/logo_league/logo_serie_a.png",
  "images/logo_league/logo_laliga.png",
  "images/logo_league/championship_england.png",
  "images/logo_league/logo_brazil_serie_a.png",
  "images/logo_league/logo_wc_2018.png",
  "images/logo_league/europe_championship.svg",

  "/images/showcase/1.jpg",
  "/images/showcase/2.jpg",
  "/images/showcase/3.jpg",
  "/images/showcase/4.jpg",
  "/images/showcase/5.jpg",
  "/images/showcase/6.jpg",

  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css2?family=Oswald&display=swap",
  "https://fonts.gstatic.com/s/oswald/v35/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvsUZiZQ.woff2",

  "https://code.jquery.com/jquery-2.1.1.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/v2";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {
        ignoreSearch: true
      }).then(function(response) {
        return response || fetch(event.request);
      })
    )
  }
});



self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
