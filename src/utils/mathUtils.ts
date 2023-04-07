// Basic lerp funtion.
import {IBoundingBox, ICell, IPoint} from "../logic/IState";
import Direction from "../logic/Direction";
import {TILE_SIZE} from "../consts";
import {GameObject} from "../logic/GameObject";
import {PositionComponentKey} from "../components/PositionComponent";

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

export function getBoundingBoxFromObj(object: GameObject): IBoundingBox {
	const positionComp = object.require(PositionComponentKey)
	return {
		left: positionComp.state.pos.x - positionComp.state.size.width / 2,
		right: positionComp.state.pos.x + positionComp.state.size.width / 2,
		top: positionComp.state.pos.y - positionComp.state.size.height / 2,
		bottom: positionComp.state.pos.y + positionComp.state.size.height / 2,
	}
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

export function cellToCoord(i: number): number {
	return i * TILE_SIZE + TILE_SIZE / 2
}

export function cellToPosition(cell:ICell):IPoint {
	return {
		x: cell.i * TILE_SIZE + TILE_SIZE / 2,
		y: cell.j * TILE_SIZE + TILE_SIZE / 2
	}
}
