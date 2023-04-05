import Controller from "./Controller";
import IState, {IBoundingBox, IPoint} from "./IState";
import {TILE_SIZE} from "../consts";
import Direction from "./Direction";
import {SpellCasterComponentKey} from "../components/SpellCasterComponent";
import {GameObject} from "./GameObject";
import {MovableComponentKey} from "../components/MovableComponent";
import {HPComponentKey} from "../components/HPComponent";
import {SpellComponentKey} from "../components/SpellComponent";
import {EnemyComponentKey} from "../components/EnemyComponent";
import {SpellableComponentKey} from "../components/SpellableComponent";
import {PositionComponentKey} from "../components/PositionComponent";
import {posAndSizeToBoundingBox} from "../utils/stateUtils";
import {ObstacleComponentKey} from "../components/ObstacleComponent";

/**
 * modify state only here
 */

export function onGameTick(ctrl: Controller, state: IState) {
	// LOGIC:
	// move or process all objects
	// create all new objects
	// check collisions
	// remove destroyed objects in "onGameTickCleanup"

	////////////////////////////////////////////////
	// MOVE OR PROCESS
	////////////////////////////////////////////////

	//toto iterate only over objects with MovableComponent
	state.objects.forEach(object => {
		// Move object
		const movable = object.as(MovableComponentKey)
		if (movable) {
			movable.onMove(object)
		}

		// Cast a spell
		const spellCaster = object.as(SpellCasterComponentKey)
		if (spellCaster && spellCaster.state.castSpell) {
			spellCaster.onCreateSpell(object)
			spellCaster.state.castSpell = false
		}
	})


	////////////////////////////////////////////////
	// CREATE NEW OBJECTS
	////////////////////////////////////////////////

	// spawn bats
	// if (state.bats.length < 1) {
	// if (state.bats.length < 3 && Math.random() > 0.8) {
	// ctrl.createBat()
	// }


	////////////////////////////////////////////////
	// CHECK COLLISIONS
	////////////////////////////////////////////////

	state.objects.forEach(object => {
		const spellComp = object.as(SpellComponentKey)
		if (spellComp) {
			//TODO iterate only over objects with position
			state.objects.forEach(object2 => {
				if (object === object2) {  // ignore overlap with itself
					return
				}
				if (object2.has(SpellableComponentKey)) {
					if (hasCollisionInObjects(object, object2)) {
						tryReduceHP(object)
						tryReduceHP(object2)
					}
				}
			})
		}

		const enemyComp = object.as(EnemyComponentKey)
		if (enemyComp) {
			state.players.forEach(object2 => {
				if (hasCollisionInObjects(object, object2)) {
					tryReduceHP(object)
					tryReduceHP(object2)
				}
			})
		}
	})
}

function tryReduceHP(object: GameObject) {
	const objectHPComp = object.as(HPComponentKey)
	if (objectHPComp) {
		objectHPComp.state.hp--
		if (objectHPComp.state.hp > 0) {
			objectHPComp.onDamaged(object)
		} else {
			objectHPComp.onDestroyed(object)
		}
	}
}

export function hasCollisionsWithObstacles(object: GameObject, targetPos: IPoint, objects: GameObject[]): boolean {
	const posComp = object.require(PositionComponentKey)
	const targetBB = posAndSizeToBoundingBox(targetPos, posComp.state.size)
	for (let i = 0; i < objects.length; i++) {
		if (object !== objects[i] && objects[i].has(ObstacleComponentKey)) {
			const obj2PosComp = objects[i].require(PositionComponentKey)
			if (hasCollisionInBB(targetBB, obj2PosComp.state.boundingBox)) {
				return true
			}
		}
	}
	return false
}


export function adjustPositionAfterTurn(pos: IPoint, direction: Direction) {
	if (direction === Direction.Up || direction === Direction.Down) {
		pos.x = adjustCoord(pos.x)
	}
	if (direction === Direction.Left || direction === Direction.Right) {
		pos.y = adjustCoord(pos.y)
	}
}

function adjustCoord(val: number): number {
	const remainder = val % TILE_SIZE
	if (Math.abs(TILE_SIZE / 2 - remainder) < 30) {
		// center of current cell
		return (val - remainder) + TILE_SIZE / 2
	} else {
		return val
	}
}

function hasCollisionInObjects(obj1: GameObject, obj2: GameObject): boolean {
	const pos1 = obj1.require(PositionComponentKey)
	const pos2 = obj2.require(PositionComponentKey)
	return hasCollisionInBB(pos1.state.boundingBox, pos2.state.boundingBox)
}

function hasCollisionInBB(bb1: IBoundingBox, bb2: IBoundingBox): boolean {
	if (bb1.left > bb2.right
		|| bb1.right < bb2.left
		|| bb1.top > bb2.bottom
		|| bb1.bottom < bb2.top) {
		// no collision
		return false
	}

	// collision detected
	return true
}
