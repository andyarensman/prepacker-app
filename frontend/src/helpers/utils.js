export const handleWeight = (weight) => {
  let pounds = Math.floor(weight/16)
  let ouncesNoRound = (weight - (Math.floor(weight/16))*16)
  let ounces = Math.round(ouncesNoRound * 10) / 10

  if (pounds !== 0 && ounces !== 0) {
    return (`${pounds} lb ${ounces} oz`)
  }
  if (pounds === 0 && ounces !== 0) {
    return (`${ounces} oz`)
  }
  if (pounds !== 0 && ounces === 0) {
    return (`${pounds} lb`)
  }
  if (pounds === 0 && ounces === 0) {
    return ('N/A')
  }
}

export const findTotalWeight = (list) => {
  let totalWeight = 0

  list.map(gear => {
    if (gear.weight) {
      totalWeight += gear.weight
    }
    return totalWeight
  })

  return handleWeight(totalWeight)
}