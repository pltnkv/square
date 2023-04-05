import * as PIXI from 'pixi.js'
import {directionToRad} from "./stateUtils";
import {GameObject} from "../logic/GameObject";
import {PositionComponentKey} from "../components/PositionComponent";

export function applyPosition(view: PIXI.Container, object: GameObject): void {
	const comp = object.require(PositionComponentKey)
	view.x = comp.state.pos.x
	view.y = comp.state.pos.y
}

export function applyPositionAndRotation(view: PIXI.Container, object: GameObject): void {
	const comp = object.require(PositionComponentKey)
	view.x = comp.state.pos.x
	view.y = comp.state.pos.y
	view.rotation = directionToRad(comp.state.direction)
}
