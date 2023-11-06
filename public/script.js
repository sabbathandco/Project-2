// Function to generate dialogue for a comic panel
async function generateDialogue(panelId) {
    // Obtain the user input for each panel
    let userInput;
    if (panelId === 'beginning') {
        userInput = document.getElementById('userInput').value;
    } else if (panelId === 'middle') {
        userInput = document.getElementById('middleInput').value;
    } else if (panelId === 'end') {
        userInput = document.getElementById('endInput').value;
    }

    const panel = document.getElementById(panelId);

    // Collect previous dialogues if necessary
    let previousDialogues = {};
    if (panelId === 'middle') {
        previousDialogues.beginningDialogue = document.getElementById('userInput').value;
    } else if (panelId === 'end') {
        previousDialogues.beginningDialogue = document.getElementById('userInput').value;
        previousDialogues.middleDialogue = document.getElementById('middleInput').value;
    }
  
    try {
        const response = await fetch('/create-dialogue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                panel: panelId,
                content: userInput,
                ...previousDialogues,
            }),
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const data = await response.json();

        // Update the panel's content correctly
        const dialogueElement = panel.querySelector('.dialogue');
        if (dialogueElement) {
            dialogueElement.textContent = data.dialogue;
        } else {
            const newDialogue = document.createElement('p');
            newDialogue.classList.add('dialogue');
            newDialogue.textContent = data.dialogue;
            panel.appendChild(newDialogue);
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
