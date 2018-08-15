import "css/styles.css";
import "css/styles.less";
import "css/styles.scss";

export function loadWatcher() {
	var sc = document.createElement("script");
	sc.type = "text/javascript";
	sc.charset = "UTF-8";
	sc.async = true;
	sc.src = window.location.protocol + "//" + window.location.hostname + ":22280/socket.io/socket.io.js";
	sc.onload = function() {
		var socket = io(window.location.protocol + "//" + window.location.hostname + ":22280");
		socket.on("file-changed", function(msg){
			window.location.reload();
		});
	}
	document.head.appendChild(sc);
}

export var testing = true;

export function test() {
        console.log(testing);
}

export var request = {
	get: function(url, params, callback) {
		if (url.length < 1)
			url = window.location.href;

		var list = Array();
		for (var i in params)
			list.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));

		var xhr = new XMLHttpRequest();
		xhr.open('GET', url + (/\?/.test(url) ? '&' : '?') + list.join("&"), true);
		xhr.onreadystatechange = function(evt) {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (typeof callback == 'function')
					callback(xhr.responseText);
				xhr.onreadystatechange = null;
				xhr = null;
			}
		};
		xhr.send(null);
	},
	post: function(url, params, callback) {
		if (url.length < 1)
			url = window.location.href;

		var list = Array();
		for (var i in params)
			list.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));

		var xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(evt) {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (typeof callback == 'function')
					callback(xhr.responseText);
				xhr.onreadystatechange = null;
				xhr = null;
			}
		};
		xhr.send(list.join("&"));
	}
};

export var jsonp = {
	callback_id: 0,
	request:function(url, params, func) {
		var callback = 'jsonp' + jsonp.callback_id++;
		jsonp[callback] = func;

		var query_string = Array();
		for (var i in params)
			query_string.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]));
		query_string.push('callback=jsonp.' + callback);
		
		url = url + (/\?/.test(url) ? '&' : '?') + query_string.join('&');

		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.setAttribute('charset', 'UTF-8');
		s.setAttribute('async', true);
		s.setAttribute('src', url);
		document.body.appendChild(s);
	}
};

export var cookie = {
	set: function(name, value, expire_seconds) {
		if (typeof(expire_seconds) != 'undefined') {
			var d = new Date();
			d.setTime(d.getTime() + expire_seconds * 1000);
			document.cookie = name + '=' + encodeURIComponent(value) + '; expires='+d.toUTCString();
		} else {
			document.cookie = name + '=' + encodeURIComponent(value);
		}
	},
	get: function(name) {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var x = cookies[i].substr(0, cookies[i].indexOf('='));
			var y = cookies[i].substr(cookies[i].indexOf('=') + 1);
			x = x.replace(/^\s+|\s+$/g, '');
			if (x == name)
				return decodeURIComponent(y);
		}
		return null;
	}
};

export function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export var swReg = null;

function registerServiceWorker() {
	if (navigator.serviceWorker) {
		
		navigator.serviceWorker.register(web_root+'service-worker.js');
		
		navigator.serviceWorker.ready.then(function(registration) {
			swReg = registration;
			
		}).catch(function(err) {
			console.log(err);
			
		});
		
	} else {

	}
}

function sendNotification(json) {
	request.post("push.php", {json:JSON.stringify(json)}, function(r) {
		console.log("sendNotification response", JSON.parse(r));
	});
}

function requestPermission() {
	if (swReg) {
		Notification.requestPermission().then(function(permission) {
			console.log("permission="+permission);
			if (permission !== 'granted') {
				throw new Error('Permission not granted.');
				
			} else {
				swReg.pushManager.getSubscription().then(function(subscription) {
					console.log("subscription",subscription);
					
					if (subscription) {
						subscription.unsubscribe().then(function(successful) {
							swReg.pushManager.subscribe({
								userVisibleOnly: true,
								applicationServerKey: urlBase64ToUint8Array(app_server_key)
							}).then(function(subscription) {
								console.log("subscription",subscription);
								sendNotification(subscription.toJSON());
							});
						}).catch(function(e) {
					
						})
					} else {
						swReg.pushManager.subscribe({
							userVisibleOnly: true,
							applicationServerKey: urlBase64ToUint8Array(app_server_key)
						}).then(function(subscription) {
							console.log("subscription",subscription);
							sendNotification(subscription.toJSON());
						});
					}
				});
			}
			
		}).catch(function(err) {
			console.log(err);
			
		});
	}
}


document.addEventListener("DOMContentLoaded", function(event) {
        console.log("DOMContentLoaded");
	
	registerServiceWorker();
	
	document.getElementById('get-notified').onclick = function() {
		requestPermission();
	};
});
