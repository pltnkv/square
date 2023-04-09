import * as PIXI from 'pixi.js'
import {DEBUG_SIZES} from 'consts'
import BaseVisual from 'visuals/BaseVisual'
import {addDebugView} from "../../utils/debugUtils";
import {GameObject} from "../../logic/GameObject";
import {PositionComponentKey} from "../../components/PositionComponent";
import {applyPositionAndRotation} from "../../utils/stateUtils";
import {HPComponentKey} from "../../components/HPComponent";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export default class BaseObjectVisual extends BaseVisual {

	protected object!: GameObject
	protected view = new PIXI.Container()

	// hp bar
	private hpBarVisual: PIXI.Graphics | undefined
	private hpBarVisibility = false
	private hpBarVisibilityTimeout = 0

	constructor(object: GameObject) {
		super()
		this.object = object

		if (DEBUG_SIZES) {
			const comp = object.as(PositionComponentKey)
			if (comp) {
				addDebugView(this.view, comp)
			}
		}
	}

	getView() {
		return this.view
	}

	update(turnTimePercent: number) {
		applyPositionAndRotation(this.view, this.object)

		if(this.hpBarVisual && this.hpBarVisibility) {
			const {hp, hpMax} = this.object.require(HPComponentKey).state

			const MAX_LEN = 50

			this.hpBarVisual.clear()
			this.hpBarVisual.beginFill(0xFF5757)
			this.hpBarVisual.lineStyle(2, 0x1E1E1E)
			this.hpBarVisual.drawRect(-MAX_LEN/2, 0, MAX_LEN, 10)
			this.hpBarVisual.endFill()


			this.hpBarVisual.beginFill(0x42FF23)
			this.hpBarVisual.drawRect(-MAX_LEN/2, 0, hp / hpMax * MAX_LEN, 10)
			this.hpBarVisual.endFill()
		}
	}

	showHPBar() {
		this.hpBarVisibility = true
		clearTimeout(this.hpBarVisibilityTimeout)
		this.view.addChild(this.hpBarVisual!)
		this.hpBarVisibilityTimeout = window.setTimeout(() => {
			this.view.removeChild(this.hpBarVisual!)
			this.hpBarVisibility = false
		}, 2000)
	}

	protected createHPBarVisual(yOffset:number):void {
		this.hpBarVisual = new PIXI.Graphics()
		this.hpBarVisual.y = yOffset
	}
}
