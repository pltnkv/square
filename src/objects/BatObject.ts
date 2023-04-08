import {ICell} from "../logic/IState";
import {ObstacleComponent, ObstacleComponentKey} from "../components/ObstacleComponent";
import {SpellableComponent, SpellableComponentKey} from "../components/SpellableComponent";
import {EarthTransformerComponent, EarthTransformerComponentKey} from "../components/EarthTransformerComponent";
import EarthType from "../logic/EarthType";
import {HPComponent, HPComponentKey} from "../components/HPComponent";
import {PositionComponentKey} from "../components/PositionComponent";
import TreeVisual from "../visuals/objects/TreeVisual";
import {GameObject} from "../logic/GameObject";
import Controller from "../logic/Controller";
import {BatComponent, BatComponentKey} from "../components/BatComponent";
import {MovableComponent, MovableComponentKey} from "../components/MovableComponent";
import {BAT_SPEED, TILE_SIZE} from "../consts";
import {
	addVectors,
	directionToVector,
	findPath,
	getBBFromPoint,
	getDirectionByCell,
	isEqual,
	isPointInsideBB,
	positionToCell
} from "../utils/mathUtils";
import {hasCollisionsWithObstacles} from "../logic/GameLoopLogic";
import {EnemyComponent, EnemyComponentKey} from "../components/EnemyComponent";
import BatVisual from "../visuals/objects/BatVisual";

export class BatObject extends GameObject {
	constructor(ctrl: Controller, cell: ICell) {
		super(ctrl)

		this.addComponent(BatComponentKey, new BatComponent({
			needToMove: false,
		}))

		this.addPositionComponent(cell)

		this.addComponent(MovableComponentKey, new MovableComponent(undefined
			, (object) => {
				const batComp = object.require(BatComponentKey)
				batComp.state.needToMove = false
				const batPositionComp = object.require(PositionComponentKey)
				const batScanningAreaSize = TILE_SIZE * 6
				const batScanningArea = getBBFromPoint(batPositionComp.state.pos, batScanningAreaSize, batScanningAreaSize)
				const playerInAttackArea = this.ctrl.state.players.find(p => {
					return isPointInsideBB(p.require(PositionComponentKey).state.pos, batScanningArea)
				})

				if (playerInAttackArea) {
					batComp.state.needToMove = true
					const batPos = batPositionComp.state.pos
					const batCell = positionToCell(batPos)
					if (isEqual(batCell, batComp.state.lastProcessedCell)) {
						// skip processing
					} else {
						const playerPos = playerInAttackArea.require(PositionComponentKey).state.pos
						const playerCell = positionToCell(playerPos)
						const path = findPath(batCell, playerCell)
						if (path.length > 0) {
							const nextCell = path[0]
							const direction = getDirectionByCell(batCell, nextCell)
							batPositionComp.setDirection(direction)
							batComp.state.lastProcessedCell = batCell
						}
					}
				}

				if (batComp.state.needToMove) {
					const speed = directionToVector(batPositionComp.state.direction, BAT_SPEED)
					const newPos = addVectors(batPositionComp.state.pos, speed, false)
					const collided = hasCollisionsWithObstacles(object, newPos, this.ctrl.state.objects)
					if (!collided) {
						batPositionComp.setPos(newPos)
					} else {
						batComp.state.lastProcessedCell = undefined
					}
				}
			}))

		this.addComponent(HPComponentKey, new HPComponent({
				hp: 1,
			},
			() => {
				//todo
			},
			() => {
				this.destroyObject()
			}
		))

		this.addComponent(EnemyComponentKey, new EnemyComponent({
			attackPoints: 1
		}))

		this.addComponent(SpellableComponentKey, new SpellableComponent())

		this.addVisual(BatVisual)
	}
}
