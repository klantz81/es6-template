<?php

require_once("config.php");

?><!DOCTYPE html>
<html>
<head>
        <meta charset="utf-8">
        <title>Site Template</title>
        <meta name="keywords" content="">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="favicon.ico">
        
        <link href="//fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet" type="text/css">
        <script src="<?php echo WEB_ROOT; ?>dist/site.js"></script>
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
        <a href="<?php echo WEB_ROOT; ?>admin/" class="login"></a>
        <h1>Site Template</h1>
</header>

<article>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed enim ut magna tempor dictum. Duis varius tellus ligula. Cras gravida nisi a malesuada mollis. Nulla facilisi. Praesent tincidunt lectus sed suscipit bibendum. Phasellus porta massa velit, quis consectetur massa volutpat lobortis. Donec maximus tempus erat in vulputate. Maecenas non magna faucibus, ornare ex sed, iaculis neque. Integer laoreet felis a justo suscipit malesuada sed a tellus. Quisque tortor nunc, pulvinar eu lacinia sit amet, facilisis ut urna. Ut posuere efficitur nisi, vitae dictum neque malesuada id. Donec a ex vel dolor placerat sodales ac vitae ante. Nam suscipit sem eget odio auctor lacinia.</p>
        <p>Proin eu libero non enim pharetra laoreet in vitae metus. Nulla a vulputate ante. Quisque laoreet eget nunc non tristique. Donec id semper nisl, in venenatis erat. Donec vehicula, nisi vitae accumsan pulvinar, magna sem viverra nisl, et dictum ligula ipsum ut nunc. Aliquam non lacinia nulla. Sed interdum molestie erat vel fermentum. Phasellus ultrices nisi vitae accumsan pretium.</p>
        <p>Cras vestibulum mi neque, vitae vulputate arcu bibendum at. Vestibulum et porta nibh, non mattis libero. Aenean non nibh in dolor venenatis tincidunt vel interdum nibh. Fusce iaculis rutrum varius. Pellentesque massa sapien, sagittis sed mi nec, convallis viverra est. Curabitur molestie interdum risus, vel sodales ipsum. In ornare dapibus felis, eu bibendum nulla. Morbi egestas porta dignissim. Nam porta purus id felis tincidunt, nec pellentesque magna sagittis. Aenean molestie vitae elit sed pharetra. Suspendisse bibendum urna et accumsan mollis. Proin placerat, purus sodales sagittis dictum, risus lectus sagittis mauris, non gravida eros erat id urna. Quisque euismod nibh quis elit egestas, auctor vehicula ipsum facilisis.</p>
        <p>Quisque quis maximus dolor. Nulla at nibh nisi. Etiam at arcu non tortor tempus dapibus. Nullam scelerisque lorem eu quam tempor tempus. Ut mattis ut arcu quis semper. Integer vehicula leo diam. Phasellus consectetur lorem vel nunc commodo blandit. Aenean mollis erat non justo ultrices ultricies. Praesent aliquam purus nec dui condimentum, ut lacinia mauris feugiat. Ut placerat ex nulla, eget tristique nunc tincidunt id. Donec hendrerit lorem nec ex sodales sagittis. Proin lorem diam, tempus et ex non, molestie accumsan enim. Ut leo ipsum, volutpat eu hendrerit non, dictum consequat mi.</p>
        <p>Nam nec leo quis neque aliquam efficitur et vitae felis. Phasellus porttitor convallis magna, id tempor nibh venenatis id. Fusce quam massa, porttitor vitae malesuada facilisis, convallis vel velit. Nam velit nisi, pretium et massa ut, suscipit tempor quam. Sed id ex lacus. Nulla quis tincidunt enim. Ut malesuada vel elit eget molestie. Nulla tristique diam eu eros ultrices, in euismod metus dignissim. Aliquam eget libero eget arcu maximus lobortis. Aliquam convallis pharetra elit, sed pellentesque lectus dignissim at. Fusce rutrum fermentum dolor, non facilisis orci luctus et. Cras convallis tincidunt gravida. Cras ut diam libero. Nullam at rutrum lectus. Proin commodo elit sed nibh auctor, id lobortis ipsum gravida. Aliquam sit amet scelerisque dui, sit amet rutrum lectus.</p>
</article>

<footer>
</footer>

</body>
</html>