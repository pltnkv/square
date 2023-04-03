import * as PIXI from 'pixi.js'
import * as UserInput from 'UserInput'
import Controller from 'logic/Controller'
import Scene from 'Scene'
import {GAME_TICK_DURATION_IN_MS} from 'consts'
import DebugState from 'DebugState'
import * as controls from 'controls'
import {checkInputs} from "UserInput";

const app = new PIXI.Application({
	width: 1000, height: 1000, backgroundColor: 0x1099bb, resolution: 1,
})
document.body.appendChild(app.view)

const debug = new DebugState()
const scene = new Scene(app)
const ctrl = new Controller(scene)
ctrl.onGameStarted()
UserInput.init(ctrl)

let prevTurnTime = Date.now()
app.ticker.add((delta) => {
	const curTime = Date.now()
	let turnOccurred = false
	checkInputs(ctrl)
	if (curTime - prevTurnTime > GAME_TICK_DURATION_IN_MS) {
		turnOccurred = true
		ctrl.onGameTick()
		prevTurnTime = curTime
	}

	ctrl.visuals.forEach(o => {
		if (o.shouldUpdate()) {
			const turnTimePercent = (curTime - prevTurnTime) / GAME_TICK_DURATION_IN_MS
			o.update(turnTimePercent)
		}
	})

	if (turnOccurred) {
		ctrl.onGameTickCleanup()
	}

	debug.update(ctrl.state)
})

controls.init(app)
