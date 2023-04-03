import * as PIXI from 'pixi.js'

export function init(app: PIXI.Application) {
	document.querySelector('#pause-button')!.addEventListener('click', () => {
		app.stop()
	})
	document.querySelector('#play-button')!.addEventListener('click', () => {
		app.start()
	})
}
