export const TileTypes = {
  Floor: 0,
  Wall: 1,
  Door: 2,
}

export function distance(e1, e2) {
  let x = e2.x - e1.x
  let y = e2.y - e1.y
  x = x*x
  y = y*y
  return Math.sqrt(x+y)
}