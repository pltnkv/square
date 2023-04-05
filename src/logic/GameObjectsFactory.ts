import IState, {ICell} from 'logic/IState'
import Direction from 'logic/Direction'
import {MAX_BAT_STEPS_IN_LINE, MAX_PLAYER_HP, PLAYER_SPEED, SPELL_LIFESPAN, SPELL_SPEED, TILE_SIZE} from 'consts'
import BaseVisual from 'visuals/BaseVisual'
import {adjustPositionAfterTurn, hasCollisionsWithObstacles} from "./GameLoopLogic"
import SpellVisual from "../visuals/objects/SpellVisual"
import {getRandomDirection, posAndSizeToBoundingBox} from "../utils/stateUtils"
import PlayerVisual from "../visuals/objects/PlayerVisual"
import BatVisual from "../visuals/objects/BatVisual"
import {addVectors, cellToPosition, directionToVector} from "../utils/mathUtils"
import TreeVisual from "../visuals/objects/TreeVisual"
import WaterVisual from "../visuals/objects/WaterVisual"
import {GameObject} from "./GameObject";
import {PlayerComponent, PlayerComponentKey} from "../components/PlayerComponent";
import {VisualComponent, VisualComponentKey} from "../components/VisualComponent";
import {BatComponent, BatComponentKey} from "../components/BatComponent";
import {SpellCasterComponent, SpellCasterComponentKey} from "../components/SpellCasterComponent";
import {SpellComponent, SpellComponentKey} from "../components/SpellComponent";
import Controller from "./Controller";
import {PositionComponent, PositionComponentKey} from "../components/PositionComponent"
import {MovableComponent, MovableComponentKey} from "../components/MovableComponent";
import {HPComponent, HPComponentKey} from "../components/HPComponent";
import {ObstacleComponent, ObstacleComponentKey} from "../components/ObstacleComponent";
import {EnemyComponent, EnemyComponentKey} from "../components/EnemyComponent";
import {SpellableComponent, SpellableComponentKey} from "../components/SpellableComponent";

export default class GameObjectsFactory {

	constructor(private ctrl: Controller, private state: IState) {
	}

	private createObject(): GameObject {
		const object = new GameObject()
		this.state.objects.push(object)
		return object
	}

	createPlayer(cell: ICell, id: number, tintColor: number) {
		const object = this.createObject()
		object.addComponent(PlayerComponentKey, new PlayerComponent({
			id,
			tintColor,
			lastAssignedMoveTime: 0,
			lastSpellTime: 0,
		}))

		object.addComponent(PositionComponentKey, new PositionComponent({
			direction: Direction.Down,
			size: {width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.6},
			pos: cellToPosition(cell),
		}))

		object.addComponent(MovableComponentKey, new MovableComponent(undefined
			, (object) => {
				const playerComp = object.require(PlayerComponentKey)
				const positionComp = object.require(PositionComponentKey)
				if (playerComp.state.moveAction) {
					if (playerComp.state.moveAction.type === 'move') {
						const speed = directionToVector(positionComp.state.direction, PLAYER_SPEED)
						const newPos = addVectors(positionComp.state.pos, speed, false)
						if (playerComp.state.prevAction?.type === 'turn') {
							// adjustPositionAfterTurn(newPos, playerComp.state.prevAction.direction)
						}

						const collided = hasCollisionsWithObstacles(object, newPos, this.ctrl.state.objects)
						if (!collided) {
							positionComp.setPos(newPos)
						}
					} else if (playerComp.state.moveAction.type === 'turn') {
						positionComp.setDirection(playerComp.state.moveAction.direction)
					}
					playerComp.state.prevAction = playerComp.state.moveAction
					playerComp.state.moveAction = undefined
				}
			}))

		object.addComponent(HPComponentKey, new HPComponent({
				hp: MAX_PLAYER_HP,
			},
			(object) => {
				//todo
			},
			(object) => {
				//todo
			}
		))

		object.addComponent(SpellCasterComponentKey, new SpellCasterComponent({
				castSpell: false
			}, (object) => {
				this.createSpell(object.require(PositionComponentKey))
			}
		))

		object.addComponent(SpellableComponentKey, new SpellableComponent())

		this.addVisual(object, PlayerVisual)
		this.state.players.push(object) // todo rethink
	}

	createBat(cell: ICell) {
		const object = this.createObject()
		object.addComponent(BatComponentKey, new BatComponent({
			plannedStepInDirection: 0,
		}))

		object.addComponent(PositionComponentKey, new PositionComponent({
			pos: cellToPosition(cell),
			direction: Direction.Down,
			size: {width: TILE_SIZE * 0.8, height: TILE_SIZE * 0.8},
		}))

		object.addComponent(MovableComponentKey, new MovableComponent(undefined
			, (object) => {
				const batComp = object.require(BatComponentKey)
				const positionComp = object.require(PositionComponentKey)
				if (batComp.state.plannedStepInDirection > 0) {
					// do move
					batComp.state.plannedStepInDirection--

					// todo
					// const speed = getSpeedByDirection(bat.direction, BAT_SPEED)
					// addVectorPointWithMutation(bat.pos, speed)
				} else {
					//change direction
					positionComp.setDirection(getRandomDirection())
					// bat.plannedStepInDirection = Math.round(Math.random() * MAX_BAT_STEPS_IN_LINE)
					batComp.state.plannedStepInDirection = MAX_BAT_STEPS_IN_LINE
				}
			}))

		object.addComponent(HPComponentKey, new HPComponent({
				hp: 1,
			},
			(object) => {
				//todo
			},
			(object) => {
				this.destroyObject(object)
			}
		))

		object.addComponent(EnemyComponentKey, new EnemyComponent({
			attackPoints: 1
		}))

		object.addComponent(SpellableComponentKey, new SpellableComponent())

		this.addVisual(object, BatVisual)
	}

	createSpell(position: PositionComponent) {
		const object = this.createObject()

		object.addComponent(SpellComponentKey, new SpellComponent({
			leftMoves: SPELL_LIFESPAN
		}))

		const shift = directionToVector(position.state.direction, TILE_SIZE * 0.6)
		object.addComponent(PositionComponentKey, new PositionComponent({
			pos: addVectors({...position.state.pos}, shift),
			size: {width: TILE_SIZE / 3, height: TILE_SIZE / 3},
			direction: position.state.direction,
		}))

		object.addComponent(MovableComponentKey, new MovableComponent(undefined
			, (object) => {
				const positionComp = object.require(PositionComponentKey)
				const spellComp = object.require(SpellComponentKey)
				if (spellComp.state.leftMoves > 0) {
					spellComp.state.leftMoves--
					const speed = directionToVector(positionComp.state.direction, SPELL_SPEED)
					addVectors(positionComp.state.pos, speed)
					positionComp.calcBoundingBox()
				} else {
					//todo это норм менять массив во время forEach?
					this.destroyObject(object)
				}
			}))

		object.addComponent(HPComponentKey, new HPComponent({
				hp: 1,
			},
			(object) => {
			},
			(object) => {
				const positionComp = object.require(PositionComponentKey)
				this.ctrl.effects.showExplosion(positionComp.state.pos)
				this.destroyObject(object)
			}
		))

		object.addComponent(SpellableComponentKey, new SpellableComponent())

		this.addVisual(object, SpellVisual)
	}

	createTree(cell: ICell) {
		const object = this.createObject()

		object.addComponent(PositionComponentKey, new PositionComponent({
			direction: Direction.Down,
			pos: cellToPosition(cell),
			size: {width: TILE_SIZE * 0.9, height: TILE_SIZE * 0.9},
		}))

		object.addComponent(ObstacleComponentKey, new ObstacleComponent({cell}))

		object.addComponent(SpellableComponentKey, new SpellableComponent())

		this.addVisual(object, TreeVisual)
	}

	createWater(cell: ICell) {
		const object = this.createObject()

		object.addComponent(PositionComponentKey, new PositionComponent({
			direction: Direction.Down,
			pos: cellToPosition(cell),
			size: {width: TILE_SIZE * 0.9, height: TILE_SIZE * 0.9},
		}))

		object.addComponent(ObstacleComponentKey, new ObstacleComponent({cell}))

		this.addVisual(object, WaterVisual)
	}

	private addVisual<T extends BaseVisual>(object: GameObject, visualClass: new (state: any) => T) {
		const visual = new visualClass(object)
		//todo по хорошему рендер система тоже должна бегать по обхектам с визуалами
		// т.Е. массив this.visuals мы можем грохнуть
		object.addComponent(VisualComponentKey, new VisualComponent({visual}))
		this.ctrl.visuals.push(visual)

		//todo рендерить только объекты во вьюпорте
		this.ctrl.scene.objectsLayer.addChild(visual.getView())
	}

	//////////////////////////////////////////////////////////
	// REMOVE OBJECTS
	//////////////////////////////////////////////////////////

	destroyObject(object: GameObject) {
		const index = this.state.objects.indexOf(object)
		if (index !== -1) {
			this.state.objects.splice(index, 1)
			this.removeVisual(object)
		}
	}

	removeVisual(object: GameObject) {
		const visualComp = object.as(VisualComponentKey)
		if (visualComp) {
			const index = this.ctrl.visuals.findIndex(v => v === visualComp.state.visual)
			if (index !== -1) {
				this.ctrl.visuals.splice(index, 1)
				const view = visualComp.state.visual.getView()
				view.parent.removeChild(view)
			}
		}
	}

}
