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
}