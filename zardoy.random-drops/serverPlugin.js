//@ts-check

const MAX_COUNT = 3
const MIN_COUNT = 1

export const server = (server) => {
    console.log('server plugin loaded')
}

export const entity = (entity) => { }

export const player = (player, server) => {
    player.on('survival_dug', (data) => {
        const mcData = server.mcData
        const allItemsIds = mcData.itemsArray.map(item => item.id)
        const randomItemId = allItemsIds[Math.floor(Math.random() * allItemsIds.length)]
        data.blockDropId = randomItemId
        data.blockDropCount = Math.floor(Math.random() * (MAX_COUNT - MIN_COUNT + 1)) + MIN_COUNT
    })
}
