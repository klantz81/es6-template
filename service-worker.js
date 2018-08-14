self.addEventListener('install', event => {
	console.log('sw install');
});

self.addEventListener('activate', event => {
	console.log('sw activate');
});

self.addEventListener('fetch', event => {
	console.log('sw fetch', event.request.url);
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