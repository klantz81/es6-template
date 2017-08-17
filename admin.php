<?php

require_once("config.php");

?><!DOCTYPE html>
<html>
<head>
        <meta charset="utf-8">
        <title>Admin Template</title>
        <meta name="keywords" content="">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="favicon.ico">
        
        <link href="//fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet" type="text/css">
        <script src="<?php echo WEB_ROOT; ?>dist/admin.js"></script>
        <script id="watcher">
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
        document.getElementById("watcher").appendChild(sc);
        </script>
</head>
<body>

<header>
        <a href="<?php echo WEB_ROOT; ?>" class="logout"></a>
        <h1>Admin Template</h1>
</header>

<article>
</article>

<footer>
</footer>

</body>
</html>