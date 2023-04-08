// Basic lerp funtion.
import {IBoundingBox, ICell, IEarthCell, IPoint, ISize} from "../logic/IState";
import Direction from "../logic/Direction";
import {TILE_SIZE} from "../consts";
import EarthType from "../logic/EarthType";


//////////////////////////////////////////////////////////////////////////////////////////
// CONVERT ONE TO ANOTHER
//////////////////////////////////////////////////////////////////////////////////////////

export function cellToCoord(i: number): number {
	return i * TILE_SIZE + TILE_SIZE / 2
}

export function positionToCell(point: IPoint): ICell {
	return {
		i: Math.floor(point.x / TILE_SIZE),
		j: Math.floor(point.y / TILE_SIZE)
	}
}

export function cellToPosition(cell: ICell): IPoint {
	return {
		x: cell.i * TILE_SIZE + TILE_SIZE / 2,
		y: cell.j * TILE_SIZE + TILE_SIZE / 2
	}
}

//origin is center
export function getBBFromPoint(point: IPoint, width: number, height: number): IBoundingBox {
	return {
		top: point.y - height / 2,
		bottom: point.y + height / 2,
		left: point.x - width / 2,
		right: point.x + width / 2,
	}
}

//todo same as getBBFromPoint
export function posAndSizeToBoundingBox(pos: IPoint, size: ISize): IBoundingBox {
	return {
		top: pos.y - size.height / 2,
		bottom: pos.y + size.height / 2,
		left: pos.x - size.width / 2,
		right: pos.x + size.width / 2,
	}
}

export function directionToRad(d: Direction | undefined): number {
	if (d === Direction.Down) {
		return 0
	}
	if (d === Direction.Up) {
		return Math.PI
	}
	if (d === Direction.Left) {
		return Math.PI / 2
	}
	if (d === Direction.Right) {
		return Math.PI * 3 / 2
	}
	return 0
}

/**
 * Returns normal vector by default
 */
export function directionToVector(direction: Direction, value = 1): IPoint {
	if (direction === Direction.Up) {
		return {x: 0, y: -value}
	}
	if (direction === Direction.Down) {
		return {x: 0, y: value}
	}
	if (direction === Direction.Left) {
		return {x: -value, y: 0}
	}
	if (direction === Direction.Right) {
		return {x: value, y: 0}
	}
	throw 'unknown direction'
}


//////////////////////////////////////////////////////////////////////////////////////////
// OVERLAPS utils
//////////////////////////////////////////////////////////////////////////////////////////

export function isBBsOverlaps(bb1: IBoundingBox, bb2: IBoundingBox): boolean {
	if (bb1.left > bb2.right
		|| bb1.right < bb2.left
		|| bb1.top > bb2.bottom
		|| bb1.bottom < bb2.top) {
		// no collision
		return false
	}

	// collision detected
	return true
}

export function isPointInsideBB(point: IPoint, bb: IBoundingBox): boolean {
	if (point.x >= bb.left
		&& point.x <= bb.right
		&& point.y >= bb.top
		&& point.y <= bb.bottom
	) {
		// no collision
		return true
	}

	// collision detected
	return false
}


//////////////////////////////////////////////////////////////////////////////////////////
// OPERATIONS ON VECTORS
//////////////////////////////////////////////////////////////////////////////////////////


export function lerp(a1: number, a2: number, t: number): number {
	return a1 * (1 - t) + a2 * t;
}

export function addVectors(target: IPoint, added: IPoint, mutate = true): IPoint {
	if (mutate) {
		target.x += added.x
		target.y += added.y
		return target
	} else {
		return {
			x: target.x + added.x,
			y: target.y + added.y
		}
	}
}

export function multVector(target: IPoint, value: number, mutate = true): IPoint {
	if (mutate) {
		target.x *= value
		target.y *= value
		return target
	} else {
		return {
			x: target.x * value,
			y: target.y * value
		}
	}
}


//////////////////////////////////////////////////////////////////////////////////////////
// OTHER UTILS
//////////////////////////////////////////////////////////////////////////////////////////


const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right]

export function getRandomDirection(): Direction {
	return directions[Math.floor(Math.random() * directions.length)]
}

//This implementation simply moves one step at a time towards the destination by checking the relative position of the current cell and the destination, and incrementing or decrementing either the i or j coordinate accordingly. It adds each new cell to the path, and continues until the destination is reached.
//Note that this implementation does not take into account any obstacles or other constraints that might be present in the environment, and may not always find the shortest path. It is intended as a simple example and may not be suitable for all use cases.
export function findPath(from: ICell, to: ICell): ICell[] {
	const path: ICell[] = []
	let current = from
	while (current.i !== to.i || current.j !== to.j) {
		if (current.i < to.i) {
			current = {i: current.i + 1, j: current.j}
		} else if (current.i > to.i) {
			current = {i: current.i - 1, j: current.j}
		} else if (current.j < to.j) {
			current = {i: current.i, j: current.j + 1}
		} else {
			current = {i: current.i, j: current.j - 1}
		}
		path.push(current);
	}
	return path;
}

export function getDirectionByCell(fromCell: ICell, toCell: ICell): Direction {
	if (fromCell.i === toCell.i) {
		if (fromCell.j > toCell.j) {
			return Direction.Up
		} else {
			return Direction.Down
		}
	} else {
		if (fromCell.i > toCell.i) {
			return Direction.Left
		} else {
			return Direction.Right
		}
	}
}

type AnyShape = ICell | IPoint | IBoundingBox | undefined

export function isEqual(a: AnyShape, b: AnyShape): boolean {
	if (a === undefined || b === undefined) {
		return false
	}

	if ('i' in a && 'j' in a && 'i' in b && 'j' in b) {
		return a.i === b.i && a.j === b.j
	}

	// find out which one is point
	if ('x' in a && 'y' in a && 'x' in b && 'y' in b) {
		return a.x === b.x && a.y === b.y
	}

	// find out which one is bounding box
	if ('top' in a && 'bottom' in a && 'left' in a && 'right' in a && 'top' in b && 'bottom' in b && 'left' in b && 'right' in b) {
		return a.top === b.top && a.bottom === b.bottom && a.left === b.left && a.right === b.right
	}

	return false
}

export function findCellToTransform(centerCell: ICell, earthType: EarthType, earthSells: IEarthCell[][]): ICell | undefined {
	// todo cделать нормальное заполнение потом
	return getCellsAround(centerCell, 2, earthSells, earthType)

}

function getCellsAround(centerCell: ICell, offset: number, earthSells: IEarthCell[][], earthType: EarthType): ICell | undefined {
	for (let j = -offset; j <= offset; j++) {
		for (let i = -offset; i <= offset; i++) {
			if (i === 0 && j === 0) {
				continue
			}
			const cell = earthSells[centerCell.j + j][centerCell.i + i]
			if (cell && cell.type !== earthType) {
				return {
					i: centerCell.i + i,
					j: centerCell.j + j
				}
			}
		}
	}
	return undefined
}