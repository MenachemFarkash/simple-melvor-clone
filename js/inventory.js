const inventory = {}

function giveItem(item, quantity) {
    if (!inventory[item]) inventory[item] = 0
    inventory[item] += quantity

    return true
}

function removeItem(item, quantity) {
    if (!inventory[item]) return false
    if (inventory[item] - quantity < 0) return false

    inventory[item] -= quantity
    return true
}
