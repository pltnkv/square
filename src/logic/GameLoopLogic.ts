import Controller from "./Controller";
import IState, {ICell, IMovableObject, IPoint, ISpell, ISpellCell} from "./IState";
import {BAT_SPEED, FIELD_SIZE, MAX_BAT_STEPS_IN_LINE, PLAYER_SPEED, SPELL_LIFESPAN, SPELL_SPEED} from "../consts";
import Direction from "./Direction";
import {addVectors, directionToVector, getBoundingBoxFromObj} from "../utils/mathUtils";
import {getRandomDirection} from "../utils/stateUtils";

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

	//run spell or move player
	state.players.forEach(player => {
		if (player.destroyed) {
			return
		}

		if (player.moveAction) {
			if (player.moveAction.type === 'move') {
				const speed = directionToVector(player.direction, PLAYER_SPEED)
				addVectors(player.pos, speed)
			} else if (player.moveAction.type === 'turn') {
				// do nothing
			}
			player.moveAction = undefined
		}

		if (player.fireSpell) {
			ctrl.createSpell(player)
			player.fireSpell = false
		}
	})

	// move bats
	state.bats.forEach(bat => {
		if (bat.plannedStepInDirection > 0) {
			// do move
			bat.plannedStepInDirection--

			// todo
			// const speed = getSpeedByDirection(bat.direction, BAT_SPEED)
			// addVectorPointWithMutation(bat.pos, speed)
		} else {
			//change direction
			bat.direction = getRandomDirection()
			// bat.plannedStepInDirection = Math.round(Math.random() * MAX_BAT_STEPS_IN_LINE)
			bat.plannedStepInDirection = MAX_BAT_STEPS_IN_LINE
		}
	})

	//move spell
	state.spells.forEach(spell => {
		if (spell.leftMoves > 0) {
			spell.leftMoves--
			const speed = directionToVector(spell.direction, SPELL_SPEED)
			addVectors(spell.pos, speed)
		}
	})

	////////////////////////////////////////////////
	// CREATE NEW OBJECTS
	////////////////////////////////////////////////

	// spawn bats
	if (state.bats.length < 1) {
		// if (state.bats.length < 3 && Math.random() > 0.8) {
		ctrl.createBat()
	}


	////////////////////////////////////////////////
	// CHECK COLLISIONS
	////////////////////////////////////////////////

	//check spell collision
	state.spells.forEach(spell => {
		state.players.forEach(player => {
			if (hasCollision(spell, player)) {
				spell.leftMoves = 0
				reduceHP(player)
			}
		})
		state.bats.forEach(bat => {
			if (hasCollision(spell, bat)) {
				spell.leftMoves = 0
				reduceHP(bat)
			}
		})
	})

	//check collision player with bats
	state.bats.forEach(bat => {
		state.players.forEach(player => {
			if (hasCollision(bat, player)) {
				reduceHP(bat)
				reduceHP(player)
			}
		})
	})

	////////////////////////////////////////////////
	// CLEAN UP
	////////////////////////////////////////////////

	state.spells = state.spells.filter(o => {
		const destroyed = o.leftMoves === 0
		if (destroyed) {
			ctrl.removeVisual(o.visual)
		}
		return !destroyed
	})

	state.bats = state.bats.filter(o => {
		const destroyed = o.hp === 0
		if (destroyed) {
			ctrl.removeVisual(o.visual)
			ctrl.effects.showExplosion(o.pos)
		}
		return !destroyed
	})

	state.players.forEach(o => {
		const destroyed = o.hp === 0
		if (destroyed) {
			ctrl.removeVisual(o.visual)
			ctrl.effects.showExplosion(o.pos)
		}
	})
}

function hasCollision(obj1: IMovableObject, obj2: IMovableObject): boolean {
	const box1 = getBoundingBoxFromObj(obj1)
	const box2 = getBoundingBoxFromObj(obj2)
	if (box1.left > box2.right || box1.right < box2.left || box1.top > box2.bottom || box1.bottom < box2.top) {
		// no collision
		return false
	}

	// collision detected
	return true
}

function reduceHP(obj: { hp: number }) {
	if (obj.hp > 0) {
		obj.hp--
	}
}