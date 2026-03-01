let game = {
    level: 1,
    xp: 0,
    logs: 0,
    isWoodcutting: false,
    lastUpdate: Date.now(),
}
const interval = 2000

loadGame()
applyOfflineProgress()

let progress = 0

setInterval(gameLoop, 100)
setInterval(saveGame, 10000)

function gameLoop() {
    const now = Date.now()
    const delta = now - game.lastUpdate
    game.lastUpdate = now

    if (!game.isWoodcutting) return

    processWoodcutting(delta)
    updateUI()
}

function processWoodcutting(delta) {
    progress += delta

    if (progress >= interval) {
        progress -= interval
        performAction()
    }
}

function performAction() {
    game.logs += 1
    game.xp += 10

    checkLevelUp()
    updateUI()
}

function checkLevelUp() {
    const xpNeeded = game.level * 100

    if (game.xp >= xpNeeded) {
        game.xp -= xpNeeded
        game.level += 1
    }
}

function toggleWoodcutting() {
    game.isWoodcutting = !game.isWoodcutting

    const btn = document.querySelector(".start-skill-button")
    btn.innerText = game.isWoodcutting ? "Stop Woodcutting" : "Start Woodcutting"
}

function updateUI() {
    document.querySelector(".skill-level span").innerText = game.level
    document.querySelector(".skill-xp span").innerText = game.xp
    document.querySelector(".logs span").innerText = game.logs
}

function saveGame() {
    localStorage.setItem("woodcutterSave", JSON.stringify(game))
}

function loadGame() {
    const save = localStorage.getItem("woodcutterSave")
    if (!save) return

    game = JSON.parse(save)
}

function applyOfflineProgress() {
    const now = Date.now()
    const offlineTime = now - game.lastUpdate

    if (game.isWoodcutting) {
        const actions = Math.floor(offlineTime / interval)

        for (let i = 0; i < actions; i++) {
            performAction()
        }
    }

    game.lastUpdate = now
}
