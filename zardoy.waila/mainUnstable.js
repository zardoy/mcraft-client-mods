export default () => {
    customEvents.on('mineflayerBotCreated', () => {
        bot.on('highlightCursorBlock', ({ block }) => {
            if (!block) {
                const existingTooltip = document.getElementById('waila-tooltip')
                if (existingTooltip) existingTooltip.remove()
                return
            }
            showTooltip(block.displayName, block.material?.replace('mineable/', '') ?? '')
        })
        bot.on('blockBreakProgressStage', (block, stage) => {
            if (block.position.equals(bot.mouse.cursorBlock?.position)) {
                // showProgress(stage / 10)
            }
        })
    })
}

const showTooltip = (name, digTool) => {
    const isTouch = miscUiState.currentTouch
    const top = isTouch ? 27 : 0

    // Remove existing tooltip if any
    const existingTooltip = document.getElementById('waila-tooltip')
    if (existingTooltip) existingTooltip.remove()

    const div = document.createElement('div')
    div.id = 'waila-tooltip'
    div.style.cssText = `
        position: fixed;
        top: ${top}px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.7);
        border: 1px solid #666;
        border-radius: 1px;
        padding: 4px 8px;
        color: white;
        font-family: Minecraft, monospace;
        font-size: 12px;
        z-index: 9999;
        text-align: center;
        min-width: 100px;
    `

    const nameDiv = document.createElement('div')
    nameDiv.textContent = name
    nameDiv.style.cssText = 'margin-bottom: 2px;'

    const toolDiv = document.createElement('div')
    toolDiv.textContent = digTool
    toolDiv.style.cssText = 'color: #999;'

    div.appendChild(nameDiv)
    div.appendChild(toolDiv)
    document.body.appendChild(div)
}
