import {ICell} from "../logic/IState";
import {ObstacleComponent, ObstacleComponentKey} from "../components/ObstacleComponent";
import {SpellableComponent, SpellableComponentKey} from "../components/SpellableComponent";
import {EarthTransformerComponent, EarthTransformerComponentKey} from "../components/EarthTransformerComponent";
import EarthType from "../logic/EarthType";
import {HPComponent, HPComponentKey} from "../components/HPComponent";
import {PositionComponent, PositionComponentKey} from "../components/PositionComponent";
import TreeVisual from "../visuals/objects/TreeVisual";
import {GameObject} from "../logic/GameObject";
import Controller from "../logic/Controller";
import {PlayerComponent, PlayerComponentKey} from "../components/PlayerComponent";
import Direction from "../logic/Direction";
import {MAX_PLAYER_HP, PLAYER_SPEED, TILE_SIZE} from "../consts";
import {addVectors, cellToPosition, directionToVector} from "../utils/mathUtils";
import {MovableComponent, MovableComponentKey} from "../components/MovableComponent";
import {hasCollisionsWithObstacles} from "../logic/GameLoopLogic";
import {SpellCasterComponent, SpellCasterComponentKey} from "../components/SpellCasterComponent";
import PlayerVisual from "../visuals/objects/PlayerVisual";

export class PlayerObject extends GameObject {
	constructor(ctrl: Controller, cell: ICell, id: number, tintColor: number) {
		super(ctrl)

		this.addComponent(PlayerComponentKey, new PlayerComponent({
			id,
			tintColor,
			lastAssignedMoveTime: 0,
			lastSpellTime: 0,
		}))

		this.addComponent(PositionComponentKey, new PositionComponent({
			direction: Direction.Down,
			size: {width: TILE_SIZE * 0.6, height: TILE_SIZE * 0.8},
			pos: cellToPosition(cell),
		}))

		this.addComponent(MovableComponentKey, new MovableComponent(undefined
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

		this.addComponent(HPComponentKey, new HPComponent({
				hp: MAX_PLAYER_HP,
			},
			() => {
				//todo
			},
			() => {
				//todo
			}
		))

		this.addComponent(SpellCasterComponentKey, new SpellCasterComponent({
				castSpell: false
			}, (object) => {
				this.ctrl.objectFactory.createSpell(object.require(PositionComponentKey))
			}
		))

		this.addComponent(SpellableComponentKey, new SpellableComponent())

		this.addVisual(PlayerVisual)
	}
}
