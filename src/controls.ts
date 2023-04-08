import * as PIXI from 'pixi.js'
import Controller from "./logic/Controller";

export function init(app: PIXI.Application, ctrl: Controller) {
	document.querySelector('#pause-button')!.addEventListener('click', () => {
		app.stop()
	})
	document.querySelector('#play-button')!.addEventListener('click', () => {
		app.start()
	})
	document.querySelector('#zoom-in-button')!.addEventListener('click', () => {
		ctrl.zoomIn()
	})
	document.querySelector('#zoom-out-button')!.addEventListener('click', () => {
		ctrl.zoomOut()
	})
}
