import Direction from 'logic/Direction'
import SpellCharge from 'logic/SpellCharge'
import BaseVisual from "../objects/BaseVisual";

export default interface IState {
	viewport: {
		changed: boolean
		value: unknown
	}
	field: IFieldCell[]
	players: IPlayer[]
	spells: ISpell[]
	bats: IBat[]
	trees: ITree[]
	doCleanUp: boolean
}

//////////////////////////////
// Game objects
//////////////////////////////

export interface IMovableObject {
	direction: Direction
	pos: IPoint
	size: ISize
}

export interface IPlayer extends IMovableObject {
	id: number,
	tintColor: number,
	nextStepColor: number,
	hp: number
	moveAction: Action | undefined
	fireSpell: boolean // todo later add type
	destroyed: boolean
	visual: BaseVisual
	lastAssignedMoveTime: number
	lastSpellTime: number
}

export interface ISpell extends IMovableObject {
	visual: BaseVisual
	leftMoves: number
}

export interface IBat extends IMovableObject {
	plannedStepInDirection: number
	visual: BaseVisual
	hp: number
}

export interface ITree extends IMovableObject {
	visual: BaseVisual
	hp: number
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
	i: number
	j: number
}

export interface ISpellCell extends ICell {
	collided: boolean
}

export interface IFieldCell extends ICell {
	type: unknown
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
