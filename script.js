const editor = document.getElementById('editor');
const outputConsole = document.getElementById('output-console');
const runBtn = document.getElementById('runBtn');
const clearConsoleBtn = document.getElementById('clearConsoleBtn');
const formatBtn = document.getElementById('formatBtn');
const themeToggle = document.getElementById('themeToggle');

function runCode() {
  const code = editor.value;
  outputConsole.textContent = '';
  editor.classList.remove('error');

  try {
    // console.log override
    let consoleOutput = '';
    const originalConsoleLog = console.log;
    console.log = function(...args) {
      consoleOutput += args.join(' ') + '\n';
      originalConsoleLog.apply(console, args);
    };

    // Run user code
    new Function(code)();

    // Restore console.log
    console.log = originalConsoleLog;

    outputConsole.textContent = consoleOutput || 'कोणताही output नाही.';
    outputConsole.style.color = '#00ff00'; // हिरवा रंग यशस्वी output साठी

  } catch (err) {
    outputConsole.textContent = err;
    outputConsole.style.color = '#ff4c4c'; // लाल रंग error साठी
    editor.classList.add('error');
  }
}

function clearConsole() {
  outputConsole.textContent = '';
  editor.classList.remove('error');
}

function formatCode() {
  try {
    const formatted = js_beautify(editor.value);
    editor.value = formatted;
    editor.classList.remove('error');
  } catch (e) {
    outputConsole.textContent = 'Code format करताना त्रुटी';
    outputConsole.style.color = '#ff4c4c';
  }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    runCode();
  }
  if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
    e.preventDefault();
    clearConsole();
  }
  if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
    e.preventDefault();
    formatCode();
  }
});

// Event Listeners
runBtn.addEventListener('click', runCode);
clearConsoleBtn.addEventListener('click', clearConsole);
formatBtn.addEventListener('click', formatCode);

// Theme Toggle (Optional)
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
