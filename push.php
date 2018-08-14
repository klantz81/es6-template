<?php

require_once("config.php");
require_once("vendor/autoload.php");

use Minishlink\WebPush\WebPush;

$auth = [
	'VAPID' => [
		'subject' => '',
		'publicKey' => APPLICATION_SERVER_KEY,
		'privateKey' => APPLICATION_PRIVATE_KEY
	],
];

$json = $_REQUEST['json'];
$json = json_decode($json,true);

$webPush = new WebPush($auth);
$res = $webPush->sendNotification(
	$json['endpoint'],
	json_encode(
		[
			"title" => "Lorem Ipsum",
			"body"  => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu tristique mauris. Ut ut viverra turpis. Duis sed faucibus ligula. Integer eu vestibulum sem, cursus molestie arcu.",
			"icon"  => "//".$_SERVER['HTTP_HOST'].WEB_ROOT."assets/images/notification.png",
			"url"   => "https://github.com/klantz81",
		]
	),
	$json['keys']['p256dh'],
	$json['keys']['auth'],
	true
);

header("Content-type: text/javascript");
echo json_encode(array("res"=>$res));
