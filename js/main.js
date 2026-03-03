let game = {
    level: 1,
    xp: 0,
    logs: 0,
    activeSkill: "",
    lastUpdate: Date.now(),
}

let skills = {
    woodcutting: {
        level: 1,
        xp: 0,
        isActive: false,
        interval: 2000,
        progress: 0,
    },
    mining: {
        level: 1,
        xp: 0,
        isActive: false,
        interval: 1500,
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
    skills[game.activeSkill].progress += delta

    if (skills[game.activeSkill].progress >= skills[game.activeSkill].interval) {
        skills[game.activeSkill].progress -= skills[game.activeSkill].interval
        performAction(skill)
    }
}

function performAction(skill) {
    game.logs += 1
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

//TODO : fix toggle innerText null
function toggleSkill(skill) {
    const btn = document.querySelector(`.${skill}-start-skill-button`)

    if (skill === game.activeSkill) {
        btn.innerText = `Start ${game.activeSkill}`
        game.activeSkill = ""
    } else {
        game.activeSkill = skill
        btn.innerText = `Stop ${game.activeSkill}`
    }
}

function updateUI() {
    if (!game.activeSkill) return
    document.querySelector(`.${game.activeSkill}-skill-level span`).innerText = skills[game.activeSkill].level
    document.querySelector(`.${game.activeSkill}-skill-xp span`).innerText = skills[game.activeSkill].xp
}

function saveGame() {
    localStorage.setItem("woodcutterSave", JSON.stringify(game))
}

function loadGame() {
    const save = localStorage.getItem("woodcutterSave")
    if (!save) return

    game = JSON.parse(save)
}

renderSkillContainer("mining")

function renderSkillContainer(skill) {
    const skillItems = gItemsList[skill]
    let skillsContainerHTML = ""
    skillItems.map((item) => {
        skillsContainerHTML += `
            <div class="skill-container">
                <h1 class="${skill}-skill-name">${item.displayName}</h1>
                <h2 class="${skill}-skill-xp">XP: <span>0</span></h2>
                <h2 class="${skill}-skill-level">LEVEL: <span>0</span></h2>
                <button class="${skill}-start-skill-button" onclick="toggleSkill('${skill}')">
                    Start ${skill}
                </button>
            </div>
        `
    })

    document.querySelector(".skill-page").innerHTML = skillsContainerHTML
}
