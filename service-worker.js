const cache_version = "v19";
const cache_name = `cache-${cache_version}`;
const cache_files = [
	"/",
	"/es6/",
	"/es6/dist/site.js",
	"//fonts.googleapis.com/css?family=Roboto:300,400,700",
];

self.addEventListener('install', event => {
	console.log('sw install');
	
	event.waitUntil(
		caches.open(cache_name).then(cache => {
			return cache.addAll(cache_files);
		}).then(() => {
			console.log("sw install complete", cache_name);
			return self.skipWaiting();
		})
	);
});

self.addEventListener('activate', event => {
	console.log('sw activate');
	
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.filter((key) => {
					return key != cache_name
				}).map((key) => {
					return caches.delete(key);
				})
			);
		}).then(() => {
			console.log("sw activate complete");
			return self.clients.claim();
		}).catch((err) => {
			console.log(err);
		})
	);
});

self.addEventListener('fetch', event => {
	console.log('sw fetch', event.request.url);
	
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				console.log('sw fetch found', event.request);
				return response;
			} else {
				console.log('sw fetch not found', event.request);
				return fetch(event.request).then(function(response) {
					if (response.status === 404) {
						return caches.match('/es6/');
					} else {
						return caches.open(cache_name).then(function(cache) {
							cache.put(event.request.url, response.clone());
							return response;
						});
					}
		
				});
			}
		})
	);
});

self.addEventListener('push', event => {
	console.log('sw push', event.data.text());
	
	var data = JSON.parse(event.data.text());
	
	event.waitUntil(
		self.registration.showNotification(data.title, {
			icon: data.icon,
			body: data.body,
			data: {
				url:data.url
			}
		})
	);
});

self.addEventListener('notificationclick', function(event) {
	console.log('sw notificationclick', event.notification);
	
	event.notification.close();
	
	if (event.notification.data && event.notification.data.url && event.notification.data.url.length > 0)
		event.waitUntil(
			clients.openWindow(event.notification.data.url)
		);
})