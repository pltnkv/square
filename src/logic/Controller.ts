import IState, {IBat, ICell, IPlayer, ISpell, ITree} from 'logic/IState'
import Scene from 'Scene'
import Direction from 'logic/Direction'
import GameFieldLayer from 'objects/GameFieldLayer'
import {FIELD_SIZE, MAX_HP, SPELL_LIFESPAN, TILE_SIZE, TIME_BETWEEN_MOVES, TIME_BETWEEN_SPELLS} from 'consts'
import BaseVisual from 'objects/BaseVisual'
import EffectsLayer from 'objects/EffectsLayer'
import PanelLayer from 'objects/PanelLayer'
import {onGameTick} from "./GameLoopLogic";
import SpellVisual from "../objects/movable/SpellVisual";
import {cellToCoord, findEmptySell, getPlayer} from "../utils/stateUtils";
import PlayerVisual from "../objects/movable/PlayerVisual";
import BatVisual from "../objects/movable/BatVisual";
import {addVectors, directionToVector} from "../utils/mathUtils";
import TreeVisual from "../objects/movable/TreeVisual";

export default class Controller {

	state: IState

	visuals: BaseVisual[] = []
	private scene: Scene
	effects!: EffectsLayer

	constructor(scene: Scene) {
		this.scene = scene

		const fieldSells = []
		for (let i = 0; i < FIELD_SIZE; i++) {
			for (let j = 0; j < FIELD_SIZE; j++) {
				fieldSells.push({i, j, type: undefined})
			}
		}

		this.state = {
			viewport: {
				changed: true,
				value: undefined,
			},
			field: fieldSells,
			players: [],
			spells: [],
			bats: [],
			trees: [],
			doCleanUp: false
		}
	}

	onGameStarted() {
		const panel = new PanelLayer(this.state)
		this.visuals.push(panel)
		this.scene.stage.addChild(panel.getView())

		const field = new GameFieldLayer(this.state)
		this.visuals.push(field)
		this.scene.mainLayer.addChild(field.getView())

		this.createPlayer(0, 0x2ec4b6, 0x2ec4b6)
		this.createPlayer(1, 0xfd4976, 0xfd4976)

		this.createBat()
		this.createBat()
		this.createBat()

		this.createTree({i: 3, j: 3})
		this.createTree({i: 6, j: 6})

		this.effects = new EffectsLayer()
		this.visuals.push(this.effects)
		this.scene.mainLayer.addChild(this.effects.getView())
	}

	//////////////////////////////////////////////////////////
	// CREATE OBJECTS
	//////////////////////////////////////////////////////////

	private createPlayer(id: number, tintColor: number, nextStepColor: number) {
		const pos = id === 0 ? {
			x: TILE_SIZE / 2,
			y: TILE_SIZE / 2
		} : {
			x: TILE_SIZE * 3 + TILE_SIZE / 2,
			y: TILE_SIZE / 2
		}

		const playerState: IPlayer = {
			id,
			direction: Direction.Down,
			destroyed: false,
			tintColor,
			nextStepColor,
			hp: MAX_HP,
			moveAction: undefined,
			visual: undefined!,
			size: {width: TILE_SIZE * 0.8, height: TILE_SIZE * 0.8},
			pos,
			fireSpell: false,
			lastAssignedMoveTime: 0,
			lastSpellTime: 0
		}

		this.state.players.push(playerState)
		const player = new PlayerVisual(playerState)
		playerState.visual = player
		this.visuals.push(player)
		this.scene.mainLayer.addChild(player.getView())
	}

	createBat() {
		// create state
		const newBatState: IBat = {
			pos: findEmptySell(),
			size: {width: TILE_SIZE * 0.8, height: TILE_SIZE * 0.8},
			plannedStepInDirection: 0,
			direction: Direction.Down,
			hp: 1,
			visual: undefined!
		}
		this.state.bats.push(newBatState)

		// create visual
		const batLayer = new BatVisual(newBatState)
		newBatState.visual = batLayer
		this.visuals.push(batLayer)
		this.scene.mainLayer.addChild(batLayer.getView())
	}

	createSpell(player: IPlayer) {
		const shift = directionToVector(player.direction, TILE_SIZE / 3)
		const newSpell: ISpell = {
			direction: player.direction,
			pos: addVectors({...player.pos}, shift),
			size: {width: TILE_SIZE / 3, height: TILE_SIZE / 3},
			visual: undefined!,
			leftMoves: SPELL_LIFESPAN
		}

		this.state.spells.push(newSpell)

		// create visual
		const spellLayer = new SpellVisual(newSpell)
		newSpell.visual = spellLayer
		this.visuals.push(spellLayer)
		this.scene.mainLayer.addChild(spellLayer.getView())
	}

	createTree(cell: ICell) {
		const newTree: ITree = {
			direction: Direction.Down,
			pos: {x: cellToCoord(cell.i), y: cellToCoord(cell.j)},
			size: {width: TILE_SIZE *0.9, height: TILE_SIZE *0.9},
			visual: undefined!,
			hp: 1
		}

		this.state.trees.push(newTree)

		// create visual
		const visual = new TreeVisual(newTree)
		newTree.visual = visual
		this.visuals.push(visual)
		this.scene.mainLayer.addChild(visual.getView())
	}

	//////////////////////////////////////////////////////////
	// REMOVE OBJECTS
	//////////////////////////////////////////////////////////

	removeVisual(visual: BaseVisual) {
		const index = this.visuals.findIndex(v => v === visual)
		if (index !== -1) {
			this.visuals.splice(index, 1)
			const view = visual.getView()
			view.parent.removeChild(view)
		}
	}

	//////////////////////////////////////////////////////////
	// GAME LOOP
	//////////////////////////////////////////////////////////

	onGameTick() {
		onGameTick(this, this.state)
	}

	onGameTickCleanup() {
	}

	// ##########################################
	// Inputs processing
	// ##########################################

	onPlayerMove(playerId: number, direction: Direction) {
		const player = getPlayer(this.state, playerId)

		const currentTime = Date.now()
		if (currentTime - player.lastAssignedMoveTime < TIME_BETWEEN_MOVES) {
			return
		}
		player.lastAssignedMoveTime = currentTime

		if (direction === player.direction) {
			player.moveAction = {
				type: 'move'
			}
		} else {
			player.moveAction = {
				type: 'turn',
				direction
			}
			//apply immediately
			player.direction = direction
		}
	}

	onPlayerSpell(playerId: number) {
		const player = getPlayer(this.state, playerId)

		const currentTime = Date.now()
		if (currentTime - player.lastSpellTime < TIME_BETWEEN_SPELLS) {
			return
		}
		player.lastSpellTime = currentTime
		player.fireSpell = true
	}
}
