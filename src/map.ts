const o = 'empty'
const p = 'player1'
const P = 'player2'
const t = 'tree'
const w = 'water'
const b = 'bat'
const v = 'volcano'

export const MapEmpty = o
export const MapTree = t
export const MapWater = w
export const MapBat = b
export const MapVolcano = v
export const MapPlayer1 = p
export const MapPlayer2 = P

/*
export const map1 = [
	[p, o, o, o, P, o, o, o, o, o],
	[o, o, t, o, o, o, o, t, t, b],
	[o, o, t, t, b, o, o, o, t, o],
	[o, o, o, t, t, o, o, o, o, o],
	[o, o, o, o, o, o, o, o, o, o],
	[o, o, o, o, o, t, t, t, o, o],
	[o, o, o, o, o, w, w, o, o, o],
	[o, o, b, o, w, w, t, o, o, o],
	[o, o, o, w, w, b, o, o, o, o],
	[o, o, w, w, w, o, o, o, o, o],
]
*/

export const map1 = [
	[p, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
	[o, o, t, o, o, o, o, t, t, b, o, o, o, o, o],
	[o, o, t, t, o, o, o, o, t, o, o, o, o, o, o],
	[o, o, o, t, t, o, o, o, o, o, o, o, o, o, o],
	[o, o, o, b, o, o, o, o, o, o, o, o, o, o, o],
	[o, o, o, o, o, t, t, t, o, o, o, o, o, o, o],
	[o, o, o, o, o, w, w, o, o, o, o, o, P, o, o],
	[o, o, b, o, w, w, t, o, o, o, o, o, o, o, o],
	[o, o, o, w, w, b, o, o, o, o, o, o, o, o, o],
	[o, o, w, w, w, o, o, o, o, o, o, o, o, o, o],
	[o, o, w, w, w, o, o, o, o, o, v, o, o, o, o],
	[o, o, w, w, o, o, o, o, o, o, o, o, o, o, o],
	[o, o, w, o, o, o, o, o, o, o, o, o, o, o, o],
	[o, w, w, o, o, o, o, o, o, o, o, o, o, o, o],
]

