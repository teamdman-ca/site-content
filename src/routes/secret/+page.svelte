<!-- ORIGINALLY HERE http://www.matmartinez.net/nsfw/  -->
<!-- and http://tppidev.github.io/secret/ -->
<!-- https://github.com/TPPIDev/TPPIDev.github.io/blob/master/secret/index.html -->
<!DOCTYPE html>
<svelte:head>
	<title>Secret - TeamDman</title>
</svelte:head>
<html lang="en">
	<head>
		<title>Loading…</title>
		<link rel="shortcut icon" href="http://tehnut.info/img/nutfavicon.png" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width" />
		<style type="text/css">
			article,
			aside,
			details,
			figcaption,
			figure,
			footer,
			header,
			hgroup,
			menu,
			nav,
			section {
				display: block;
			}

			html,
			body {
				margin: 0px;
				padding: 0px;
			}

			html {
				background-color: #000;
			}

			body {
				padding: 0px;
				margin: 0px;
				opacity: 0;

				display: block;
				overflow: hidden;
				position: absolute;
				height: auto;
				bottom: 20px;
				top: 20px;
				left: 20px;
				right: 20px;
				background-color: #9f9f9f;

				-webkit-transition: opacity 1.5s ease-in;
				-moz-transition: opacity 1.5s ease-in;
				-o-transition: opacity 1.5s ease-in;
				-ms-transition: opacity 1.5s ease-in;

				border-radius: 10px;

				cursor: wait;
			}

			.roll {
				opacity: 1;
				cursor: default;
			}

			figure.test {
				position: absolute;
				display: block;
				padding: 0px;
				margin: 0px;
				width: 499px;
				height: 439px;

				background-image: url(../images/test.png);
				background-repeat: no-repeat;
			}

			figure.test.hero {
				z-index: 0;

				position: absolute;
				left: 50%;
				margin-left: -95px;

				top: 50%;
				margin-top: -220px;
			}

			figure.fromLeft {
				-webkit-animation: fromLeft 3s linear;
				-moz-animation: fromLeft 3s linear;
				-ms-animation: fromLeft 3s linear;

				left: -100%;
			}

			figure.fromRight {
				-webkit-animation: fromRight 3s linear;
				-moz-animation: fromRight 3s linear;
				-ms-animation: fromRight 3s linear;

				right: -100%;
			}

			@-webkit-keyframes fromLeft {
				0% {
					left: -100%;
				}
				100% {
					left: 100%;
				}
			}

			@-moz-keyframes fromLeft {
				0% {
					left: -100%;
				}
				100% {
					left: 100%;
				}
			}

			@-ms-keyframes fromLeft {
				0% {
					left: -100%;
				}
				100% {
					left: 100%;
				}
			}

			@-webkit-keyframes fromRight {
				0% {
					right: -100%;
				}
				100% {
					right: 100%;
				}
			}

			@-moz-keyframes fromRight {
				0% {
					right: -100%;
				}
				100% {
					right: 100%;
				}
			}

			@-ms-keyframes fromRight {
				0% {
					right: -100%;
				}
				100% {
					right: 100%;
				}
			}

			@-webkit-keyframes appear {
				0% {
					opacity: 0;
				}
				100% {
					opacity: 1;
				}
			}

			@-moz-keyframes appear {
				0% {
					opacity: 0;
				}
				100% {
					opacity: 1;
				}
			}

			@-ms-keyframes appear {
				0% {
					opacity: 0;
				}
				100% {
					opacity: 1;
				}
			}

			figure.spinner {
				display: block !important;
				opacity: 1 !important;
				position: absolute;
				top: 100px;
				bottom: 100px;
				left: 0px;
				right: 0px;
				z-index: 1337;
			}
		</style>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script src="../scripts/spin.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function () {
				var r = $("html");
				var b = $("body");
				var c = $("section#dancefloor");
				var spawnRate = 400;
				var deallocDelay = 3000;
				var danceDelay = 1000;

				function newtest() {
					var scale = "scale(" + dice(0.1, 1.6) + ")";
					var fromLeft = diceInt(0, 1);
					var originY = dice(-10, 100) + "%";
					var opacity = dice(0.1, 1.0);
					var index = dice(-30, 10);
					var duration = dice(0.5, 3) + "s";

					var d = $("<figure/>").css({
						top: originY,
						opacity: opacity,
						"z-index": index,
						"-webkit-transform": scale,
						"-moz-transform": scale,
						"-o-transform": scale,
						"-webkit-animation-duration": duration,
						"-moz-animation-duration": duration,
						"-ms-animation-duration": duration,
					});

					r.css({
						"background-color": color(),
					});

					b.css({
						"background-color": color(),
					});

					d.addClass("test");
					d.addClass(fromLeft ? "fromLeft" : "fromRight");
					d.appendTo(c);

					setTimeout(function () {
						d.remove();
					}, deallocDelay);
				}

				document.getElementById("song").addEventListener("canplaythrough", kongatime, false);

				function kongatime() {
					// Let's roll
					document.title = "VICTORY!";
					b.addClass("roll");

					// Delete spinner
					$("figure#spinner").fadeOut(200);
					setTimeout(function () {
						$("figure#spinner").remove();
					}, 202);

					// Loop
					setTimeout(function () {
						setInterval(function () {
							newtest();
						}, spawnRate);
					}, danceDelay);
				}

				// Dirty isn't it?
				var opts = {
					lines: 13, // The number of lines to draw
					length: 7, // The length of each line
					width: 4, // The line thickness
					radius: 10, // The radius of the inner circle
					rotate: 0, // The rotation offset
					color: "#fff", // #rgb or #rrggbb
					speed: 1, // Rounds per second
					trail: 60, // Afterglow percentage
					shadow: true, // Whether to render a shadow
					hwaccel: false, // Whether to use hardware acceleration
					className: "spinner", // The CSS class to assign to the spinner
					zIndex: 2e9, // The z-index (defaults to 2000000000)
					top: "auto", // Top position relative to parent in px
					left: "auto", // Left position relative to parent in px
				};

				console.log("spin control");
				var spin = $("<figure/>").attr({
					id: "spinner",
				});
				$("html").append(spin);

				var target = document.getElementById("spinner");
				var spinner = new Spinner(opts).spin(target);
			});

			function dice(min, max) {
				return Math.random() * (max - min) + min;
			}

			function diceInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}

			function color() {
				return "#" + Math.floor(Math.random() * 16777215).toString(16);
			}
		</script>
	</head>
	<body>
		<section id="dancefloor">
			<figure class="test hero" />
		</section>

		<audio id="song" autoplay loop>
			<source src="victory.mp3" type="audio/mp3" />

			<embed src="victory.mp3" loop="true" />
		</audio>
	</body>
</html>
