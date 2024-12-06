const ExpressError = require('./ErrorHandler');
const baseUrl = 'https://geocode.search.hereapi.com/v1'
const apiKey = 'JjLWjgSloI0R1zqfkS_goQr-yFxSLraRPGo9KQa3je0'

const geocode = async (address) => {
  const url = `${baseUrl}/geocode?q=${address}&limit=1&apiKey=${apiKey}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.items[0]
  } catch (error) {
    throw new ExpressError(error.message, 500)
  }
}

const geometry = async (address) => {
  try {
    const { position } = await geocode(address)
    return {
      type: 'Point',
      coordinates: [position.lng, position.lat]
    }
  } catch (error) {
    throw new ExpressError(error.message, 500)
  }
}

module.exports = {
  geocode,
  geometry
}