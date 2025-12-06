const textArea = document.getElementById('textArea');
const copyBtn = document.getElementById('copyBtn')
const pasteBtn = document.getElementById('pasteBtn')
const clearBtn = document.getElementById('clearBtn')
const messageCont = document.getElementById('messageCont')

let messageTimeout;

function showMessage(message, isSuccess) {
    clearTimeout(messageTimeout);

    messageCont.textContent = message;
    messageCont.className = 'message-cont visible ' + (isSuccess ? 'success' : 'failed')

    messageTimeout = setTimeout(() => {
        messageCont.classList.remove('visible')
    }, 3000);
}

copyBtn.addEventListener('click', async () => {
    try {
        const text = textArea.value;
        if (!text.trim()) {
            showMessage('⚠️ Nothing to copy! Textarea is empty.', false)
            return;
        }
        await navigator.clipboard.writeText(text);
        showMessage('✅ Copied to clipboard!', true);

    } catch {
        showMessage('❌ Failed to copy. Please check browser permissions.', false);
    }
});

pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        if (!text.trim()) {
            showMessage('⚠️ Clipboard is empty!', false)
            return;
        }
        textArea.value += text;
        showMessage('✅ Pasted from clipboard!', true)
        textArea.focus();

    } catch {
        showMessage('❌ Failed to paste. Please grant clipboard permissions or try Ctrl+V.', false);
    }
});

clearBtn.addEventListener('click', () => {
    textArea.value = '';
    showMessage('✅ Text cleared!', true);
    textArea.focus();
});

textArea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        setTimeout(() => {
            showMessage('⌨️ Copied using keyboard shortcut!', true);
        }, 100);
    }
});