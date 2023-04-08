import Controller from 'logic/Controller'
import Direction from 'logic/Direction'

const pressedKeys = new Set<string>()

export function init(ctrl: Controller) {
	window.addEventListener('keydown', e => {
		checkInputs(ctrl)
		pressedKeys.add(e.key)
	})
	window.addEventListener('keyup', e => {
		pressedKeys.delete(e.key)
	})
}

export function checkInputs(ctrl: Controller) {
	Array.from(pressedKeys.values()).reverse().forEach((key) => {
		switch (key) {
			//player 0
			case 'ArrowUp':
				ctrl.onPlayerMove(0, Direction.Up)
				break
			case 'ArrowLeft':
				ctrl.onPlayerMove(0, Direction.Left)
				break
			case 'ArrowDown':
				ctrl.onPlayerMove(0, Direction.Down)
				break
			case 'ArrowRight':
				ctrl.onPlayerMove(0, Direction.Right)
				break
			case 'Shift':
				ctrl.onPlayerSpell(0)
				break

			//player 1
			case 'w':
				ctrl.onPlayerMove(1, Direction.Up)
				break
			case 'a':
				ctrl.onPlayerMove(1, Direction.Left)
				break
			case 's':
				ctrl.onPlayerMove(1, Direction.Down)
				break
			case 'd':
				ctrl.onPlayerMove(1, Direction.Right)
				break
			case ' ':
				ctrl.onPlayerSpell(1)
				break
		}
	})
}