export default () => {
    customEvents.on('mineflayerBotCreated', () => {
        bot.on('highlightCursorBlock', (data) => {
            if (!data?.block) {
                const existingTooltip = document.getElementById('waila-tooltip')
                if (existingTooltip) existingTooltip.remove()
                return
            }
            showTooltip(data.block.displayName, data.block.material?.replace('mineable/', '') ?? '')
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
        scale: 0.6;
        background-color: rgba(0, 0, 0, 0.7);
        border: 1px solid #666;
        border-radius: 1px;
        padding: 4px 8px;
        color: white;
        font-family: Minecraft, monospace;
        font-size: 12px;
        text-align: center;
        min-width: 100px;
        transform-origin: top left;
    `

    const nameDiv = document.createElement('div')
    nameDiv.textContent = name
    nameDiv.style.cssText = 'margin-bottom: 2px;'

    const toolDiv = document.createElement('div')
    toolDiv.textContent = digTool ? `Tool: ${digTool}` : ''
    toolDiv.style.cssText = 'color: #999;'

    div.appendChild(nameDiv)
    div.appendChild(toolDiv)
    const hudScaledContainer = document.getElementById('ui-root')
    hudScaledContainer.appendChild(div)
}
