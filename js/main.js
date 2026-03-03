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
    giveItem(game.item, 1)
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
    const item = gItemsList[skill].find((i) => i.id === itemId)
    console.log(item)
    const btn = document.querySelector(`.item-${itemId}`)

    if (skill === game.activeSkill) {
        btn.innerText = "START"
        game.activeSkill = ""
        game.item = ""
        game.interval = 0
    } else {
        game.activeSkill = skill
        game.item = item.itemName
        game.interval = item.baseInterval
        btn.innerText = "STOP"
    }
}

function updateUI() {
    if (!game.activeSkill) return
    const item = gItemsList[game.activeSkill].find((i) => i.itemName === game.item)
    document.querySelector(`.${item.itemName}-skill-level span`).innerText = skills[game.activeSkill].level
    document.querySelector(`.${item.itemName}-skill-xp span`).innerText = skills[game.activeSkill].xp
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
    const skillItems = gItemsList[skill]
    let skillsContainerHTML = ""
    skillItems.map((item) => {
        skillsContainerHTML += `
            <div class="skill-container">
                <h1 class="${item.itemName}-skill-name">${item.displayName}</h1>
                <h2 class="${item.itemName}-skill-xp">XP: <span>0</span></h2>
                <h2 class="${item.itemName}-skill-level">LEVEL: <span>0</span></h2>
                <button class="${skill}-start-skill-button item-${item.id}" onclick="toggleSkill('${skill}', ${item.id})">
                    START
                </button>
            </div>
        `
    })

    document.querySelector(".skill-page").innerHTML = skillsContainerHTML
}
