import Controller from "./Controller";
import IState, {ICell, IEarthCell, IPoint} from "./IState";
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
import {ObstacleComponentKey} from "../components/ObstacleComponent";
import {findCellToTransform, isBBsOverlaps, posAndSizeToBoundingBox, positionToCell} from "../utils/mathUtils";
import {EarthTransformerComponentKey} from "../components/EarthTransformerComponent";
import EarthType from "./EarthType";
import {getPlayer} from "../utils/stateUtils";
import {DestroyableByEarthComponentKey} from "../components/DestroyableByEarthComponent";

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

		// check that object can exist on his type of earth
		const destroyableByEarthComponent = object.as(DestroyableByEarthComponentKey)
		if(destroyableByEarthComponent) {
			// todo может мне добавить кеш на основные функции поика? и сбрасывать его в конце каждого тика?
			const cell = positionToCell(object.require(PositionComponentKey).state.pos)
			const earthType = getEarthByCell(state.earthCells, cell)?.type
			if(earthType) {
				if(!destroyableByEarthComponent.state.allowedEarthTypes.includes(earthType)) {
					object.require(HPComponentKey).reduceHP()
				}
			}
		}


		// transform earth
		const earthTransformer = object.as(EarthTransformerComponentKey)
		if (earthTransformer) {
			const centerCell = positionToCell(object.require(PositionComponentKey).state.pos)
			iterateEarthCellsFromCenter(state.earthCells, centerCell, earthTransformer.state.impactDistance, (cell) => {
				const distance = calcDistanceBetweenCells(centerCell, cell) || 1 // prevent division by zero
				const impact = earthTransformer.state.impactDistance / distance
				const earthType = earthTransformer.state.earthType
				if (cell.impactingTransformers[earthType] === undefined) {
					cell.impactingTransformers[earthType] = impact
				} else {
					// @ts-ignore
					cell.impactingTransformers[earthType] += impact
				}
			})
		}
	})

	// calculate types of earth cells
	const MIN_IMPACT = 0.2
	iterateAllEarthCells(state.earthCells, (cell) => {
		let biggest = MIN_IMPACT
		for (const tKey in cell.impactingTransformers) {
			const val = cell.impactingTransformers[tKey as EarthType]
			if (val && val > biggest) {
				biggest = val
				cell.type = tKey as EarthType
			}
		}
		// no impacting transformers
		if (biggest === MIN_IMPACT) {
			cell.type = EarthType.Regular
		}
		cell.impactingTransformers = {}
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
		objectHPComp.reduceHP()
	}
}

export function hasCollisionsWithObstacles(object: GameObject, targetPos: IPoint, objects: GameObject[]): boolean {
	const posComp = object.require(PositionComponentKey)
	const targetBB = posAndSizeToBoundingBox(targetPos, posComp.state.size)
	for (let i = 0; i < objects.length; i++) {
		if (object !== objects[i] && objects[i].has(ObstacleComponentKey)) {
			const obj2PosComp = objects[i].require(PositionComponentKey)
			if (isBBsOverlaps(targetBB, obj2PosComp.state.boundingBox)) {
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
	return isBBsOverlaps(pos1.state.boundingBox, pos2.state.boundingBox)
}

function iterateAllEarthCells(earthCells: IEarthCell[][], callback: (cell: IEarthCell) => boolean | void): void {
	for (let j = 0; j < earthCells.length; j++) {
		for (let i = 0; i < earthCells[j].length; i++) {
			const cell = earthCells[j][i]
			if (callback(cell)) {
				return
			}
		}
	}
}

function iterateEarthCellsFromCenter(earthCells: IEarthCell[][], centerCell: ICell, distance: number, callback: (cell: IEarthCell) => boolean | void): void {
	for (let j = -distance; j <= distance; j++) {
		const row = earthCells[centerCell.j + j]
		if (row) {
			for (let i = -distance; i <= distance; i++) {
				const cell = row[centerCell.i + i]
				if (cell) {
					if (callback(cell)) {
						return
					}
				}

			}
		}
	}
}

function calcDistanceBetweenCells(c1: ICell, c2: ICell):number {
	return Math.abs(c1.i - c2.i) + Math.abs(c1.j - c2.j)
}

function getEarthByCell(earthCells: IEarthCell[][], cell:ICell): IEarthCell | undefined {
	return earthCells[cell.j] && earthCells[cell.j][cell.i]
}