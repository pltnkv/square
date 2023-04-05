import Direction from 'logic/Direction'
import IState, {IBoundingBox, IPoint, ISize} from 'logic/IState'
import {TILE_SIZE} from "../consts";
import {GameObject} from "../logic/GameObject";
import {PlayerComponentKey} from "../components/PlayerComponent";

////////////////////////////////////////////
// There is no function that change state
////////////////////////////////////////////

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

export function findEmptySell(): IPoint {
	//TODO убедиться что в этой точке нет игроков

	return {
		x: Math.ceil(Math.random() * 5) * TILE_SIZE - TILE_SIZE / 2,
		y: Math.ceil(Math.random() * 5) * TILE_SIZE - TILE_SIZE / 2,
	}
}

const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right]

export function getRandomDirection(): Direction {
	return directions[Math.floor(Math.random() * directions.length)]
}

export function getPlayer(state: IState, playerId: number): GameObject {
	return state.players.find(p => {
		const playerComp = p.require(PlayerComponentKey)
		return playerComp.state.id === playerId
	})!
}

export function posAndSizeToBoundingBox(pos:IPoint, size:ISize):IBoundingBox {
	return {
		left: pos.x - size.width / 2,
		right: pos.x + size.width / 2,
		top: pos.y - size.height / 2,
		bottom: pos.y + size.height / 2,
	}
}