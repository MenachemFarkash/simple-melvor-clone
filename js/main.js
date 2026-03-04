let game = {
    level: 1,
    xp: 0,
    item: "",
    activeSkill: "",
    interval: 0,
    lastUpdate: Date.now(),
}

let skills = {
    woodcutting: {
        level: 1,
        xp: 0,
        isActive: false,
        progress: 0,
    },
    mining: {
        level: 1,
        xp: 0,
        isActive: false,
        progress: 0,
    },
}

// loadGame()

setInterval(gameLoop, 100)
// setInterval(saveGame, 10000)

function gameLoop() {
    const now = Date.now()
    const delta = now - game.lastUpdate
    game.lastUpdate = now

    if (!game.activeSkill) return

    processSkill(delta)
    updateUI()
}

function processSkill(delta, skill) {
    if (!game.activeSkill) return

    skills[game.activeSkill].progress += delta

    if (skills[game.activeSkill].progress >= game.interval) {
        skills[game.activeSkill].progress -= game.interval
        performAction(skill)
    }
}

function performAction() {
    givePooledItem(1, 1)
    skills[game.activeSkill].xp += 10

    checkLevelUp()
    updateUI()
}

function checkLevelUp() {
    const xpNeeded = skills[game.activeSkill].level * 100

    if (skills[game.activeSkill].xp >= xpNeeded) {
        skills[game.activeSkill].xp -= xpNeeded
        skills[game.activeSkill].level += 1
    }
}

function toggleSkill(skill, itemId) {
    gActionsList[skill].forEach((item) => {
        const btn = document.querySelector(`.item-${item.id}`)
        btn.innerText = "START"
    })

    const item = gActionsList[skill].find((i) => i.id === itemId)
    const btn = document.querySelector(`.item-${itemId}`)

    if (skill === game.activeSkill) {
        btn.innerText = "START"
        resetGameState()
    } else {
        game.activeSkill = skill
        game.item = item.itemName
        game.interval = item.baseInterval
        btn.innerText = "STOP"
    }
}

function resetGameState() {
    game.activeSkill = ""
    game.item = ""
    game.interval = 0
}

function updateUI() {
    if (!game.activeSkill) return
    const item = gActionsList[game.activeSkill].find((i) => i.itemName === game.item)
    document.querySelector(`.current-active-skill-level span`).innerText = skills[game.activeSkill].level
    document.querySelector(`.current-active-skill-xp span`).innerText = skills[game.activeSkill].xp
}

function saveGame() {
    localStorage.setItem("woodcutterSave", JSON.stringify(game))
}

function loadGame() {
    const save = localStorage.getItem("woodcutterSave")
    if (!save) return

    game = JSON.parse(save)
}

renderSkillContainer("woodcutting")

function renderSkillContainer(skill) {
    const skillItems = gActionsList[skill]
    let skillsContainerHTML = ""
    skillItems.map((item) => {
        skillsContainerHTML += `
            <div class="skill-container">
                <h1 class="${item.itemName}-skill-name">${item.displayName}</h1>
                <button class="${skill}-start-skill-button item-${item.id}" onclick="toggleSkill('${skill}', ${item.id})">
                    START
                </button>
            </div>
        `
    })

    document.querySelector(".skill-page").innerHTML = skillsContainerHTML
}
