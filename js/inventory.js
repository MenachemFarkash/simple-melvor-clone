const inventory = {}

function giveItem(item, quantity) {
    if (!inventory[item.itemName]) inventory[item.itemName] = 0
    inventory[item.itemName] += quantity

    return true
}

function removeItem(item, quantity) {
    if (!inventory[item]) return false
    if (inventory[item] - quantity < 0) return false

    inventory[item] -= quantity
    return true
}

function givePooledItem(poolId, quantity) {
    const pool = findPoolById(poolId)
    const randomNum = getRandomInt(0, pool.chances[pool.chances.length - 1][1])
    const itemIndex = pool.chances.findIndex((chance) => {
        return chance[0] <= randomNum && chance[1] >= randomNum
    })
    const item = findItemById(pool.items[itemIndex])
    giveItem(item, quantity)

    return true
}

function findPoolById(poolId) {
    return gLootPools.find((pool) => pool.id === poolId)
}

function findItemById(itemId) {
    return gItemsList.find((item) => item.id === itemId)
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}
