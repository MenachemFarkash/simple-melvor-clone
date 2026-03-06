renderSidebar()

function renderSidebar() {
    const sidebar = document.querySelector(".sidebar-skills-list-container")
    let sidebarHTML = ""
    Object.keys(gActionsList).forEach((skill) => {
        sidebarHTML += `
            <div class="sidebar-skill-element" onclick="renderSkillContainer('${skill}')">
                    <h3 class="sidebar-skill-name">${skill.toUpperCase()}</h3>
                </div>
        `
    })
    sidebar.innerHTML = sidebarHTML
}
