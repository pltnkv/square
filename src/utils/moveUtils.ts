import * as PIXI from 'pixi.js'

import {IMovableObject, IPoint} from "../logic/IState";
import {TILE_SIZE} from "../consts";
import {directionToRad} from "./stateUtils";

export function applyPosition(view: PIXI.Container, obj: IMovableObject): void {
	view.x = obj.pos.x
	view.y = obj.pos.y
}

export function applyPositionAndRotation(view: PIXI.Container, obj: IMovableObject): void {
	view.x = obj.pos.x
	view.y = obj.pos.y
	view.rotation = directionToRad(obj.direction)
}
