import * as d3 from 'd3'

const isoParse = d3.timeParse('%Y/%W')

export function getDateOfISOWeek(y, w) {
  return isoParse(`${y}/${w}`)
}
