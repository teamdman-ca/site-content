<script lang="ts">
	import { onMount } from "svelte";
	import { Square } from "./stuff";

	let reducedMotion = false;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let squares: any[] = [];
	let lastMousePos = { x: 0, y: 0 };
	let currentMousePos = { x: 0, y: 0 };
	let hue = 0;
	function updateBackgroundColor() {
		hue += 1;
		// https://css-tricks.com/randomcolor/
		if (hue % 100 == 0) {
			myDiv.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
		}
	}

	function initSize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function setupMotionPreferenceListener() {
		window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
			reducedMotion = e.matches;
		});
	}
	function setupCanvas() {
		ctx = canvas.getContext("2d")!;
		initSize();
		initializeSquares();
		drawSquares();
	}

	onMount(() => {
		setupMotionPreferenceListener();
		setupCanvas();
		requestAnimationFrame(animationLoop);
	});

	function initializeSquares() {
		const squareSize = 32;
		const rows = Math.ceil(canvas.height / squareSize);
		const cols = Math.ceil(canvas.width / squareSize);

		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				squares.push(
					new Square(x * squareSize, y * squareSize, squareSize, squareSize, y * cols + x),
				);
			}
		}
	}

	function drawSquares() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// ctx.fillStyle = "#FAFAFA";
		ctx.fillStyle = "#000000";
		squares.forEach((square) => {
			ctx.fillRect(
				square.x + square.offset_x,
				square.y + square.offset_y,
				square.width,
				square.height,
			);
		});
	}

	function handleMouseMove(event: MouseEvent) {
		currentMousePos.x = event.clientX;
		currentMousePos.y = event.clientY;
		const dx = lastMousePos.x - currentMousePos.x;
		const dy = lastMousePos.y - currentMousePos.y;
		const angle = Math.atan2(dy, dx);

		squares.forEach((square) => {
			square.setOffsetBasedOnPos(currentMousePos, angle);
		});

		lastMousePos.x = currentMousePos.x;
		lastMousePos.y = currentMousePos.y;
	}

	function animationLoop() {
		requestAnimationFrame(animationLoop);
		if (reducedMotion) return;
		squares.forEach((square) => {
			square.updateOffset();
		});
		drawSquares();
		updateBackgroundColor();
	}

	function paint(context: CanvasRenderingContext2D, t: number) {
		const { width, height } = context.canvas;
		const imageData = context.getImageData(0, 0, width, height);

		for (let p = 0; p < imageData.data.length; p += 4) {
			const i = p / 4;
			const x = i % width;
			const y = (i / width) >>> 0;

			const red = 64 + (128 * x) / width + 64 * Math.sin(t / 1000);
			const green = 64 + (128 * y) / height + 64 * Math.cos(t / 1000);
			const blue = 128;

			imageData.data[p + 0] = red;
			imageData.data[p + 1] = green;
			imageData.data[p + 2] = blue;
			imageData.data[p + 3] = 255;
		}

		context.putImageData(imageData, 0, 0);
	}

	let myDiv: HTMLDivElement;
</script>

<svelte:window on:resize={initSize} />

<div class="absolute">
	<a class="underline text-blue-400 bg-black" href="https://retool.com/visual-basic/">source</a>
	<a class="underline text-blue-400 bg-black" href="..">back</a>
</div>

<div class="ml-48 mt-20 absolute bg-slate-300 p-4">There was some blog content in the original</div>

<div bind:this={myDiv} id="mouseBgEffect" style="--bg-hue: 0;" on:mousemove={handleMouseMove}>
	<div class="MouseBGEffectBackground" />
	<canvas bind:this={canvas} />
</div>

<style>
	#mouseBgEffect {
		background-image: url("./Gandalf-30497766af4dd82cb3fa40d009e3f77d.jpg");
		background-size: cover;
		background-blend-mode: overlay;
		transition-duration: 1s;
		transition-timing-function: ease-in;
		transition-delay: 0s;
		transition-property: background-color;
	}
</style>
