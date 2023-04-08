import Direction from 'logic/Direction'
import IState, {IBoundingBox, IPoint, ISize} from 'logic/IState'
import {TILE_SIZE} from "../consts";
import {GameObject} from "../logic/GameObject";
import {PlayerComponentKey} from "../components/PlayerComponent";
import * as PIXI from 'pixi.js'
import {PositionComponentKey} from "../components/PositionComponent";
import {directionToRad} from "./mathUtils";

////////////////////////////////////////////
// There is no function that change state
////////////////////////////////////////////



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


export function findEmptySell(): IPoint {
	//TODO убедиться что в этой точке нет игроков

	return {
		x: Math.ceil(Math.random() * 5) * TILE_SIZE - TILE_SIZE / 2,
		y: Math.ceil(Math.random() * 5) * TILE_SIZE - TILE_SIZE / 2,
	}
}

export function getPlayer(state: IState, playerId: number): GameObject {
	return state.players.find(p => {
		const playerComp = p.require(PlayerComponentKey)
		return playerComp.state.id === playerId
	})!
}

