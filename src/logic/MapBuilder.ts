import Controller from "./Controller";
import {MapBat, MapPlayer1, MapPlayer2, MapTree, MapVolcano, MapWater} from "../map";
import {ISize} from "./IState";
import EarthType from "./EarthType";

export function buildMap(map: string[][], ctrl: Controller): ISize {
	for (let j = 0; j < map.length; j++) {
		const mapRow = map[j]
		for (let i = 0; i < mapRow.length; i++) {
			const cellValue = mapRow[i]
			const cell = {i, j}

			ctrl.objectFactory.setEarthType(cell, EarthType.Regular)

			switch (cellValue) {
				case MapPlayer1:
					ctrl.objectFactory.createPlayer(cell, 0, 0x2ec4b6)
					break
				case MapPlayer2:
					ctrl.objectFactory.createPlayer(cell, 1, 0xfd4976)
					break
				case MapBat:
					ctrl.objectFactory.createBat(cell)
					break
				case MapTree:
					ctrl.objectFactory.createTree(cell)
					break
				case MapWater:
					ctrl.objectFactory.createWater(cell)
					break
				case MapVolcano:
					ctrl.objectFactory.createVolcano(cell)
					ctrl.objectFactory.setEarthType(cell, EarthType.Lava)
					break
				default:
					// create nothing
					break
			}
		}
	}
	return {
		width: map[0].length,
		height: map.length
	}
}