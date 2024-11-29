<!-- <div class="flex p-10">
	<div id="my-container" class="btn-container">
		<p id="my-p">
			<a id="my-button" href="#" class="btn btn-primary btn-download">Getting Started</a>
		</p>
	</div>
</div> -->
<main>
	<div class="main-page">
		<div class="banner-wrapper">
			<div class="btn-container">
				<p>
					<a href="https://diesel.rs/" class="btn btn-primary btn-download">Getting Started</a>
				</p>
			</div>
		</div>
	</div>
</main>
<svelte:head>
	<style>
		body {
			-webkit-text-size-adjust: 100%;
			box-sizing: inherit;
			font-feature-settings: "kern", "liga", "pnum";
			-webkit-font-smoothing: antialiased;
			font-family: "Roboto", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif,
				sans-serif;
			font-weight: 300;
			line-height: 1.5;
			color: #fff;
			position: relative;
			min-height: 100%;
			margin: 0;
			padding-bottom: 7.8em;
			font-size: 1.125em;
			background: linear-gradient(#535379, #c3c3d6);
			background-repeat: no-repeat;
			background-attachment: fixed;
		}
	</style>
</svelte:head>

<style>
	main {
		-webkit-text-size-adjust: 100%;
		font-feature-settings: "kern", "liga", "pnum";
		-webkit-font-smoothing: antialiased;
		font-family: "Roboto", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif, sans-serif;
		font-weight: 300;
		line-height: 1.5;
		color: #fff;
		font-size: 1.125em;
		box-sizing: inherit;
		display: block;
	}
	main > div.main-page {
		-webkit-text-size-adjust: 100%;
		font-feature-settings: "kern", "liga", "pnum";
		-webkit-font-smoothing: antialiased;
		font-family: "Roboto", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif, sans-serif;
		font-weight: 300;
		line-height: 1.5;
		color: #fff;
		font-size: 1.125em;
		box-sizing: inherit;
		text-align: center;
	}
	main > div.main-page > div.banner-wrapper {
		-webkit-text-size-adjust: 100%;
		font-feature-settings: "kern", "liga", "pnum";
		-webkit-font-smoothing: antialiased;
		font-family: "Roboto", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif, sans-serif;
		font-weight: 300;
		line-height: 1.5;
		color: #fff;
		font-size: 1.125em;
		text-align: center;
		box-sizing: inherit;
		width: 32.222222em;
		margin: 0 auto;
	}
	div.banner-wrapper > div.btn-container {
		-webkit-text-size-adjust: 100%;
		font-feature-settings: "kern", "liga", "pnum";
		-webkit-font-smoothing: antialiased;
		font-family: "Roboto", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif, sans-serif;
		font-weight: 300;
		line-height: 1.5;
		color: #fff;
		font-size: 1.125em;
		text-align: center;
		box-sizing: inherit;
	}
	div.btn-container > p {
		-webkit-text-size-adjust: 100%;
		font-feature-settings: "kern", "liga", "pnum";
		-webkit-font-smoothing: antialiased;
		font-family: "Roboto", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif, sans-serif;
		font-weight: 300;
		line-height: 1.5;
		color: #fff;
		font-size: 1.125em;
		text-align: center;
		box-sizing: inherit;
		margin: 0 0 1.5em;
	}
	.btn.btn-primary.btn-download:hover {
		background-position: 100% 50%;
	}

	.btn.btn-primary.btn-download {
		-webkit-text-size-adjust: 100%;
		font-feature-settings: "kern", "liga", "pnum";
		text-align: center;
		box-sizing: inherit;
		appearance: none;
		-webkit-font-smoothing: antialiased;
		border-radius: 1.5em;
		border: none;
		box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
		cursor: pointer;
		display: inline-block;
		font-family: "Roboto", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif, sans-serif;
		font-size: 1.125rem;
		font-weight: 400;
		line-height: 1;
		padding: 0.75em 1.25em;
		text-decoration: none;
		user-select: none;
		vertical-align: middle;
		white-space: nowrap;
		background-color: #ffcd57;
		color: #8a6100;
		background-image: url("liquid-bg.svg");
		background-position: 0 -50%;
		background-repeat: repeat-x;
		transition: background-position 3s ease;
	}
</style>
