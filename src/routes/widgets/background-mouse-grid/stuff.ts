// Class to handle square logic
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
