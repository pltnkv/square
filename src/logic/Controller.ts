import IState, {IBoundingBox, ICell, IPoint, ISize} from 'logic/IState'
import Scene from 'Scene'
import Direction from 'logic/Direction'
import GameFieldLayer from 'visuals/GameFieldLayer'
import {
	APP_HEIGHT,
	APP_WIDTH,
	TIME_BETWEEN_MOVES,
	TIME_BETWEEN_SPELLS
} from 'consts'
import BaseVisual from 'visuals/BaseVisual'
import EffectsLayer from 'visuals/EffectsLayer'
import PanelLayer from 'visuals/PanelLayer'
import {onGameTick} from "./GameLoopLogic"
import {getPlayer} from "../utils/stateUtils"
import {buildMap} from "./MapBuilder"
import {map1} from "../map"
import {PlayerComponentKey} from "../components/PlayerComponent";
import {SpellCasterComponentKey} from "../components/SpellCasterComponent";
import GameObjectsFactory from "./GameObjectsFactory";
import {PositionComponentKey} from "../components/PositionComponent";

export default class Controller {

	state: IState

	visuals: BaseVisual[] = []
	scene: Scene

	effects!: EffectsLayer
	objectFactory: GameObjectsFactory

	constructor(app: PIXI.Application) {
		this.state = {
			canvasScale: 1,
			canvasScaleInv: 1,
			canvasPositionX: 0,
			canvasPositionY: 0,
			mapSize: {width: 0, height: 0},
			objects: [],
			players: [],
			earthCells: []
		}

		this.scene = new Scene(app, this.state)
		this.objectFactory = new GameObjectsFactory(this, this.state)
	}

	onGameStarted() {
		this.state.mapSize = buildMap(map1, this)

		const field = new GameFieldLayer(this.state)
		this.visuals.push(field)
		this.scene.bottomLayer.addChild(field.getView())

		this.effects = new EffectsLayer()
		this.visuals.push(this.effects)
		this.scene.effectsLayer.addChild(this.effects.getView())

		// const panel = new PanelLayer(this.state)
		// this.visuals.push(panel)
		// this.scene.stage.addChild(panel.getView())

	}


	//////////////////////////////////////////////////////////
	// GAME LOOP
	//////////////////////////////////////////////////////////

	onGameTick() {
		onGameTick(this, this.state)
		this.onCameraUpdate()
	}

	onCameraUpdate() {
		const playerObject = getPlayer(this.state, 1)
		const positionComp = playerObject.require(PositionComponentKey)
		const playerPosScreen = this.getCanvasToScreenPoint(positionComp.state.pos)
		const sceneSize = 900
		const offsetForMovingBox = 200
		const playersScreenBox: IBoundingBox = {
			top: offsetForMovingBox,
			left: offsetForMovingBox,
			right: sceneSize - offsetForMovingBox,
			bottom: sceneSize - offsetForMovingBox
		}

		const leftDiff = playersScreenBox.left - playerPosScreen.x
		const rightDiff = playerPosScreen.x - playersScreenBox.right
		const topDiff = playersScreenBox.top - playerPosScreen.y
		const bottomDiff = playerPosScreen.y - playersScreenBox.bottom

		if (leftDiff > 0) {
			this.state.canvasPositionX = -positionComp.state.pos.x * this.state.canvasScale + playersScreenBox.left
		}

		if (rightDiff > 0) {
			this.state.canvasPositionX = -positionComp.state.pos.x * this.state.canvasScale + playersScreenBox.right
		}

		if (topDiff > 0) {
			this.state.canvasPositionY = -positionComp.state.pos.y * this.state.canvasScale + playersScreenBox.top
		}

		if (bottomDiff > 0) {
			this.state.canvasPositionY = -positionComp.state.pos.y * this.state.canvasScale + playersScreenBox.bottom
		}

	}

	zoomIn() {
		this.state.canvasScale *= 1.1
		this.updateZoom()
	}

	zoomOut() {
		this.state.canvasScale /= 1.1
		this.updateZoom()
	}

	private updateZoom() {
		this.state.canvasScaleInv = 1 / this.state.canvasScale

		const playerObject = getPlayer(this.state, 1)
		const playerPosComp = playerObject.require(PositionComponentKey)

		this.state.canvasPositionX = -playerPosComp.state.pos.x * this.state.canvasScale + APP_WIDTH / 2
		this.state.canvasPositionY = -playerPosComp.state.pos.y * this.state.canvasScale + APP_HEIGHT / 2
	}

	// ##########################################
	// Inputs processing
	// ##########################################

	onPlayerMove(playerId: number, direction: Direction) {
		const playerObject = getPlayer(this.state, playerId)
		const playerComp = playerObject.require(PlayerComponentKey)
		const positionComp = playerObject.require(PositionComponentKey)

		const currentTime = Date.now()
		if (currentTime - playerComp.state.lastAssignedMoveTime < TIME_BETWEEN_MOVES) {
			return
		}
		playerComp.state.lastAssignedMoveTime = currentTime

		if (direction === positionComp.state.direction) {
			playerComp.state.moveAction = {
				type: 'move'
			}
		} else {
			playerComp.state.moveAction = {
				type: 'turn',
				direction
			}
		}
	}

	onPlayerSpell(playerId: number) {
		const playerObject = getPlayer(this.state, playerId)
		const playerComp = playerObject.require(PlayerComponentKey)
		const spellCasterComp = playerObject.require(SpellCasterComponentKey)

		const currentTime = Date.now()
		if (currentTime - playerComp.state.lastSpellTime < TIME_BETWEEN_SPELLS) {
			return
		}
		playerComp.state.lastSpellTime = currentTime
		spellCasterComp.state.castSpell = true
	}

	// ##########################################
	// Utils
	// ##########################################

	getCanvasToScreenX(cnsX: number): number {
		return cnsX * this.state.canvasScale + this.state.canvasPositionX
	}

	getCanvasToScreenY(cnsY: number): number {
		return cnsY * this.state.canvasScale + this.state.canvasPositionY
	}

	getScreenToCanvasX(screenX: number): number {
		return (screenX - this.state.canvasPositionX) * this.state.canvasScaleInv
	}

	getScreenToCanvasY(screenY: number): number {
		return (screenY - this.state.canvasPositionY) * this.state.canvasScaleInv
	}

	getCanvasToScreenBB(canvasBB: IBoundingBox): IBoundingBox {
		return {
			left: this.getCanvasToScreenX(canvasBB.left),
			right: this.getCanvasToScreenX(canvasBB.right),
			top: this.getCanvasToScreenY(canvasBB.top),
			bottom: this.getCanvasToScreenY(canvasBB.bottom),
		}
	}

	getCanvasToScreenPoint(canvasPoint: IPoint): IPoint {
		return {
			x: this.getCanvasToScreenX(canvasPoint.x),
			y: this.getCanvasToScreenY(canvasPoint.y),
		}
	}
}
