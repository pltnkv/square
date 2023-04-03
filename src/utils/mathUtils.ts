// Basic lerp funtion.
import {IBoundingBox, IMovableObject, IPoint} from "../logic/IState";
import Direction from "../logic/Direction";

export function lerp(a1: number, a2: number, t: number): number {
	return a1 * (1 - t) + a2 * t;
}

export function addVectors(target: IPoint, added: IPoint): IPoint {
	target.x += added.x
	target.y += added.y
	return target
}

export function multVector(target: IPoint, value: number): IPoint {
	target.x *= value
	target.y += value
	return target
}

export function getBoundingBoxFromObj(obj: IMovableObject): IBoundingBox {
	return {
		left: obj.pos.x - obj.size.width / 2,
		right: obj.pos.x + obj.size.width / 2,
		top: obj.pos.y - obj.size.height / 2,
		bottom: obj.pos.y + obj.size.height / 2,
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