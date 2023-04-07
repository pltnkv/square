import * as PIXI from 'pixi.js'
import * as UserInput from 'UserInput'
import Controller from 'logic/Controller'
import Scene from 'Scene'
import {GAME_TICK_DURATION_IN_MS} from 'consts'
import DebugState from 'DebugState'
import * as controls from 'controls'
import {checkInputs} from "UserInput";

const app = new PIXI.Application({
	width: 920, height: 950, backgroundColor: 0x222222, resolution: 1,
})
document.body.appendChild(app.view)

const debug = new DebugState()
const ctrl = new Controller(app)
ctrl.onGameStarted()
UserInput.init(ctrl)

let prevTurnTime = Date.now()
app.ticker.add((delta) => {
	const curTime = Date.now()
	checkInputs(ctrl)
	if (curTime - prevTurnTime > GAME_TICK_DURATION_IN_MS) {
		ctrl.onGameTick()
		prevTurnTime = curTime
	}

	ctrl.visuals.forEach(o => {
		if (o.shouldUpdate()) {
			const turnTimePercent = (curTime - prevTurnTime) / GAME_TICK_DURATION_IN_MS
			o.update(turnTimePercent)
		}
	})

	ctrl.scene.updateCamera()

	debug.update(ctrl.state)
})

controls.init(app)
