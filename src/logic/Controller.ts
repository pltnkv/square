import IState, {ICell} from 'logic/IState'
import Scene from 'Scene'
import Direction from 'logic/Direction'
import GameFieldLayer from 'visuals/GameFieldLayer'
import {
	FIELD_SIZE,
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

	constructor(scene: Scene) {
		this.scene = scene

		const fieldSells = []
		for (let i = 0; i < FIELD_SIZE; i++) {
			for (let j = 0; j < FIELD_SIZE; j++) {
				fieldSells.push({i, j, type: undefined})
			}
		}

		this.state = {
			objects: [],
			players: []
		}

		this.objectFactory = new GameObjectsFactory(this, this.state)
	}

	onGameStarted() {
		const panel = new PanelLayer(this.state)
		this.visuals.push(panel)
		this.scene.stage.addChild(panel.getView())

		const field = new GameFieldLayer(this.state)
		this.visuals.push(field)
		this.scene.objectsLayer.addChild(field.getView())

		this.effects = new EffectsLayer()
		this.visuals.push(this.effects)
		this.scene.effectsLayer.addChild(this.effects.getView())

		buildMap(map1, this)
	}


	//////////////////////////////////////////////////////////
	// GAME LOOP
	//////////////////////////////////////////////////////////

	onGameTick() {
		onGameTick(this, this.state)
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
}
