<script lang="ts">
	import { onMount } from "svelte";
	import { Square } from "./stuff";

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let squares: any[] = [];
	let lastMousePos = { x: 0, y: 0 };
	let currentMousePos = { x: 0, y: 0 };

	onMount(() => {
		ctx = canvas.getContext("2d")!;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		initializeSquares();
		drawSquares();
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
		ctx.fillStyle = "#FAFAFA";
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
		squares.forEach((square) => {
			square.updateOffset();
		});
		drawSquares();
	}

	// background

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
</script>

<div id="mouseBgEffect" style="--currentAccent: #FAFAFA;" on:mousemove={handleMouseMove}>
	<div class="MouseBGEffectBackground" />
	<canvas bind:this={canvas} />
</div>

<style>
	#mouseBgEffect {
		background-color: orchid;
	}
</style>
