import Direction from 'logic/Direction'
import {GameObject} from "./GameObject";

export default interface IState {
	// viewport: {
	// 	changed: boolean
	// 	value: unknown
	// }

	// spells: ISpell[]
	// bats: IBat[]
	// trees: ITree[]
	// waters: IWater[]

	// cells: IFieldCell[][]

	canvasScale: number
	canvasScaleInv: number
	canvasPositionX: number,
	canvasPositionY: number,
	mapSize: ISize
	objects: GameObject[]
	players: GameObject[]
}

//////////////////////////////
// Common
//////////////////////////////

export type TurnAction = {
	type: 'turn'
	direction: Direction
}
export type MoveAction = {
	type: 'move'
}
export type Action = TurnAction | MoveAction

export interface ICell {
	i: number // x
	j: number // y
}


//////////////////////////////
// Math
//////////////////////////////

export interface IPoint {
	x: number
	y: number
}

export interface ISize {
	width: number
	height: number
}

export interface IRect {
	x: number
	y: number
	width: number
	height: number
}

export interface IBoundingBox {
	left: number
	top: number
	right: number
	bottom: number
}
