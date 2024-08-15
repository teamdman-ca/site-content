export class Square {
	constructor(
		public x: number,
		public y: number,
		public width: number,
		public height: number,
		public index: number,
	) {
		this.mid_x = 0;
		this.mid_y = 0;
		this.offset_x = 0;
		this.offset_y = 0;
		this.updatePos(x, y);
		this.randomSeed = Math.random();
	}
	mid_x: number;
	mid_y: number;
	offset_x: number;
	offset_y: number;
	randomSeed: number;

	updatePos(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.mid_x = this.x + this.width / 2;
		this.mid_y = this.y + this.height / 2;
		this.offset_x = 0;
		this.offset_y = 0;
	}

	setOffsetBasedOnPos(mousePos: { x: number; y: number }, angle: number) {
		const dx = this.mid_x - mousePos.x;
		const dy = this.mid_y - mousePos.y;
		if (Math.abs(dx) < 32 && Math.abs(dy) < 32) {
			this.offset_x -= 80 * Math.cos(angle) * 16 * this.randomSeed;
			this.offset_y -= 80 * Math.sin(angle) * 16 * this.randomSeed;
		}
	}

	updateOffset() {
		this.offset_x *= 0.88;
		this.offset_y *= 0.88;
	}
}
 
export interface SquareGridContext {
	reducedMotion: boolean;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	squares: Square[];
	lastMousePos: { x: number; y: number };
	currentMousePos: { x: number; y: number };
	lastDimensions: {rows: number, cols: number},
	hue: number;
	myDiv: HTMLDivElement;
}

export function createContext(
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	myDiv: HTMLDivElement,
): SquareGridContext {
	return {
		reducedMotion: false,
		canvas,
		ctx,
		squares: [],
		lastDimensions: {rows: 0, cols: 0},
		lastMousePos: { x: 0, y: 0 },
		currentMousePos: { x: 0, y: 0 },
		hue: 0,
		myDiv,
	};
}

export function mountHandler(canvas: HTMLCanvasElement, myDiv: HTMLDivElement) {
	const ctx = setupCanvas(canvas);
	if (!ctx) return;
	const context = createContext(canvas, ctx, myDiv);
	resizeCanvasToWindowAndInitSquares(context);
	drawSquares(context);
	setupMotionPreferenceListener(context);
	requestAnimationFrame(() => animationLoop(context));
	return context;
}

export function updateBackgroundColor(context: SquareGridContext) {
	// context.hue += 1;
	// // https://css-tricks.com/randomcolor/
	// if (context.hue % 100 == 0) {
	// 	context.myDiv.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
	// }
}

export function resizeCanvasToWindowAndInitSquares(context: SquareGridContext) {
	context.canvas.width = window.innerWidth;
	context.canvas.height = window.innerHeight;
	initializeSquares(context);
}

export function setupMotionPreferenceListener(context: SquareGridContext) {
	window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
		context.reducedMotion = e.matches;
	});
}

export function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		console.error("Could not get canvas context");
		return null;
	}
	return ctx;
}

export function initializeSquares(context: SquareGridContext) {
	const squareSize = 32;
	const rows = Math.ceil(context.canvas.height / squareSize);
	const cols = Math.ceil(context.canvas.width / squareSize);
	if (context.lastDimensions.rows === rows && context.lastDimensions.cols === cols) {
		return;
	}
	context.squares = [];
	context.lastDimensions.rows = rows;
	context.lastDimensions.cols = cols;
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			context.squares.push(
				new Square(x * squareSize, y * squareSize, squareSize, squareSize, y * cols + x),
			);
		}
	}
}

export function drawSquares(context: SquareGridContext) {
	context.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
	// context.ctx.fillStyle = "#FAFAFA";
	context.ctx.fillStyle = "#000000";
	context.squares.forEach((square) => {
		context.ctx.fillRect(
			square.x + square.offset_x,
			square.y + square.offset_y,
			square.width,
			square.height,
		);
	});
}

export function handleMouseMove(event: MouseEvent, context: SquareGridContext) {
	context.currentMousePos.x = event.clientX;
	context.currentMousePos.y = event.clientY;
	const dx = context.lastMousePos.x - context.currentMousePos.x;
	const dy = context.lastMousePos.y - context.currentMousePos.y;
	const angle = Math.atan2(dy, dx);

	context.squares.forEach((square) => {
		square.setOffsetBasedOnPos(context.currentMousePos, angle);
	});

	context.lastMousePos.x = context.currentMousePos.x;
	context.lastMousePos.y = context.currentMousePos.y;
}

export function animationLoop(context: SquareGridContext) {
	requestAnimationFrame(() => animationLoop(context));
	if (context.reducedMotion) return;
	context.squares.forEach((square) => {
		square.updateOffset();
	});
	drawSquares(context);
	updateBackgroundColor(context);
}
