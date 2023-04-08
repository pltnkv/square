import {BatComponent, BatComponentKey} from "../components/BatComponent";
import {HPComponent, HPComponentKey} from "../components/HPComponent";
import {PlayerComponent, PlayerComponentKey} from "../components/PlayerComponent";
import {SpellCasterComponent, SpellCasterComponentKey} from "../components/SpellCasterComponent";
import {SpellComponent, SpellComponentKey} from "../components/SpellComponent";
import {VisualComponent, VisualComponentKey} from "../components/VisualComponent";
import {ObstacleComponent, ObstacleComponentKey} from "../components/ObstacleComponent";
import {PositionComponent, PositionComponentKey} from "../components/PositionComponent";
import {MovableComponent, MovableComponentKey} from "../components/MovableComponent";
import {EnemyComponent, EnemyComponentKey} from "../components/EnemyComponent";
import {SpellableComponent, SpellableComponentKey} from "../components/SpellableComponent";
import {EarthTransformerComponent, EarthTransformerComponentKey} from "../components/EarthTransformerComponent";
import {ICell} from "./IState";
import Direction from "./Direction";
import {cellToPosition} from "../utils/mathUtils";
import {TILE_SIZE} from "../consts";
import BaseVisual from "../visuals/BaseVisual";
import Controller from "./Controller";

type ComponentByKey = {
	[BatComponentKey]: BatComponent
	[PlayerComponentKey]: PlayerComponent
	[SpellComponentKey]: SpellComponent
	[SpellCasterComponentKey]: SpellCasterComponent
	[SpellableComponentKey]: SpellableComponent

	[HPComponentKey]: HPComponent
	[MovableComponentKey]: MovableComponent
	[VisualComponentKey]: VisualComponent
	[PositionComponentKey]: PositionComponent
	[ObstacleComponentKey]: ObstacleComponent
	[EnemyComponentKey]: EnemyComponent
	[EarthTransformerComponentKey]: EarthTransformerComponent
}

export class GameObject {

	private components = new Map()

	constructor(protected ctrl:Controller) {
	}

	addComponent<T extends keyof ComponentByKey>(key: T, comp: ComponentByKey[T]): void {
		this.components.set(key, comp)
	}

	has<T extends keyof ComponentByKey>(key: T): boolean {
		return this.components.has(key)
	}

	as<T extends keyof ComponentByKey>(key: T): ComponentByKey[T] | undefined {
		return this.components.get(key)
	}

	require<T extends keyof ComponentByKey>(key: T): ComponentByKey[T] {
		const comp = this.components.get(key)
		if (!comp) {
			throw new Error(`Require failed. Component "${key}" not found`)
		}
		return comp
	}

	////////////////////////////////////////////////
	//// HELPERS
	////////////////////////////////////////////////


	protected addPositionComponent(cell: ICell, sizeScale: number = 0.8): void {
		this.addComponent(PositionComponentKey, new PositionComponent({
			direction: Direction.Down,
			pos: cellToPosition(cell),
			size: {width: TILE_SIZE * sizeScale, height: TILE_SIZE * sizeScale},
		}))
	}

	protected addVisual<T extends BaseVisual>(visualClass: new (state: any) => T): void {
		const visual = new visualClass(this)
		//todo по хорошему рендер система тоже должна бегать по обхектам с визуалами
		// т.Е. массив this.visuals мы можем грохнуть
		this.addComponent(VisualComponentKey, new VisualComponent({visual}))
		this.ctrl.visuals.push(visual)

		//todo рендерить только объекты во вьюпорте
		this.ctrl.scene.objectsLayer.addChild(visual.getView())
	}

	protected destroyObject() {
		const index = this.ctrl.state.objects.indexOf(this)
		if (index !== -1) {
			this.ctrl.state.objects.splice(index, 1)
			this.removeVisual()
		}
	}

	protected removeVisual() {
		const visualComp = this.as(VisualComponentKey)
		if (visualComp) {
			const index = this.ctrl.visuals.findIndex(v => v === visualComp.state.visual)
			if (index !== -1) {
				this.ctrl.visuals.splice(index, 1)
				const view = visualComp.state.visual.getView()
				view.parent.removeChild(view)
			}
		}
	}

}