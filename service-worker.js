importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

// asset appshell
workbox.precaching.precacheAndRoute([
    { url: './index.html', revision: '1' },
    { url: './manifest.json', revision: '1' },
    { url: './nav.html', revision: '1' },
    { url: './team.html', revision: '1' },
    { url: './css/materialize.css', revision: '1' },
    { url: './css/style.css', revision: '1' },
    { url: './js/init.js', revision: '1' },
    { url: './js/materialize.js', revision: '1' },
    { url: './js/nav.js', revision: '1' },
    { url: './js/api.js', revision: '1' },
    { url: './js/db.js', revision: '1' },
    { url: './js/idb.js', revision: '1' },
    { url: './js/standings.js', revision: '1' },
    { url: './js/teams.js', revision: '1' },
    { url: './js/service-register.js', revision: '1' }
], {
    // Ignore all URL parameters.
    ignoreURLParametersMatching: [/.*/]
});

// img cache
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|PNG|)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
    }),
)

// caching page
workbox.routing.registerRoute(
    new RegExp('./pages/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'dynamic-pages'
    })
);

// api
var base_url = 'https://api.football-data.org/v2';
workbox.routing.registerRoute(
    new RegExp(base_url),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'api-cache'
    })
);

//Google fonts
workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
);

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts'
  })
);

//Font-awesome
workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome',
  new workbox.strategies.CacheFirst({
    cacheName: 'font-awesome-fonts-webfonts'
  })
);


//Notification
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: './images/icons/favicon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
