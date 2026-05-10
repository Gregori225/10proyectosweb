// ==================== NAVEGACIÓN ====================
function showProject(id) {
    document.querySelectorAll('.project-section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    // Restaurar fondo si venimos del proyecto 5
    if (id !== 'p5' && !document.body.classList.contains('dark-mode')) {
        document.body.style.backgroundColor = 'var(--bg-color)';
    }
}

// ==================== PROYECTO 1: Contador ====================
let count = parseInt(localStorage.getItem('p1_count')) || 0;
const countDisplay = document.getElementById('counter-display');

function updateCounterDisplay() {
    countDisplay.textContent = count;
    countDisplay.style.color = count > 0 ? 'green' : (count < 0 ? 'red' : 'gray');
    localStorage.setItem('p1_count', count);
}

function updateCounter(val) { count += val; updateCounterDisplay(); }
function resetCounter() { count = 0; updateCounterDisplay(); }
// Iniciar P1
updateCounterDisplay();

// ==================== PROYECTO 2: To-Do List ====================
let todos = JSON.parse(localStorage.getItem('p2_todos')) || [];

function renderTodos() {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        list.innerHTML += `
            <li class="${todo.done ? 'completed' : ''}">
                <span onclick="toggleTodo(${index})" style="cursor:pointer; flex:1; text-align:left;">${todo.text}</span>
                <button onclick="deleteTodo(${index})">X</button>
            </li>`;
    });
    localStorage.setItem('p2_todos', JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById('todo-input');
    if(input.value.trim() === '') return;
    todos.push({ text: input.value, done: false });
    input.value = '';
    renderTodos();
}

function toggleTodo(index) { todos[index].done = !todos[index].done; renderTodos(); }
function deleteTodo(index) { todos.splice(index, 1); renderTodos(); }
renderTodos();

// ==================== PROYECTO 3: Adivina el Número ====================
let secretNum, attempts;

function initGuessGame() {
    secretNum = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guess-message').textContent = '¡Empieza a adivinar!';
    document.getElementById('guess-attempts').textContent = attempts;
    document.getElementById('guess-input').value = '';
}

function checkGuess() {
    let guess = parseInt(document.getElementById('guess-input').value);
    if(isNaN(guess)) return;
    attempts++;
    document.getElementById('guess-attempts').textContent = attempts;
    const msg = document.getElementById('guess-message');
    
    if (guess === secretNum) msg.textContent = '¡Correcto! Lo adivinaste.';
    else if (guess < secretNum) msg.textContent = 'Muy bajo.';
    else msg.textContent = 'Muy alto.';
}
initGuessGame();

// ==================== PROYECTO 4: Calculadora ====================
const calcDisplay = document.getElementById('calc-display');

function calcInput(val) { calcDisplay.value += val; }
function clearCalc() { calcDisplay.value = ''; }
function calculateResult() {
    try {
        if(calcDisplay.value.includes('/0')) throw new Error("División por cero");
        // Eval es seguro aquí si controlamos estrictamente el input a num/ops
        calcDisplay.value = eval(calcDisplay.value) || ''; 
    } catch(e) {
        calcDisplay.value = 'Error';
        setTimeout(clearCalc, 1500);
    }
}

// ==================== PROYECTO 5: Colores Aleatorios ====================
function changeColor() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    document.body.style.backgroundColor = randomColor;
    document.getElementById('color-code').textContent = randomColor;
}
function copyColor() {
    const color = document.getElementById('color-code').textContent;
    navigator.clipboard.writeText(color);
    alert('Color copiado: ' + color);
}

// ==================== PROYECTO 6: Temporizador ====================
let timerInterval;
let timeRemaining = 0;

function updateTimerDisplay() {
    const m = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const s = (timeRemaining % 60).toString().padStart(2, '0');
    document.getElementById('timer-display').textContent = `${m}:${s}`;
}

function startTimer() {
    if(timerInterval) clearInterval(timerInterval);
    if(timeRemaining === 0) {
        const min = parseInt(document.getElementById('timer-min').value) || 0;
        const sec = parseInt(document.getElementById('timer-sec').value) || 0;
        timeRemaining = min * 60 + sec;
    }
    if(timeRemaining <= 0) return;

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if(timeRemaining <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer-display').textContent = "¡Tiempo terminado!";
        }
    }, 1000);
}

function pauseTimer() { clearInterval(timerInterval); }
function resetTimer() { clearInterval(timerInterval); timeRemaining = 0; updateTimerDisplay(); }

// ==================== PROYECTO 7: Generador Contraseñas ====================
function generatePassword() {
    const length = document.getElementById('pass-length').value;
    const hasUpper = document.getElementById('pass-upper').checked;
    const hasLower = document.getElementById('pass-lower').checked;
    const hasNum = document.getElementById('pass-nums').checked;
    const hasSym = document.getElementById('pass-syms').checked;

    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let chars = '';
    if(hasUpper) chars += upper;
    if(hasLower) chars += lower;
    if(hasNum) chars += nums;
    if(hasSym) chars += syms;

    if(chars === '') return document.getElementById('password-display').textContent = 'Selecciona opciones';

    let password = '';
    for(let i=0; i<length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('password-display').textContent = password;
}

function copyPassword() {
    navigator.clipboard.writeText(document.getElementById('password-display').textContent);
    alert('Contraseña copiada');
}

// ==================== PROYECTO 8: Modo Oscuro ====================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('p8_darkMode', isDark);
    document.body.style.backgroundColor = ''; // Limpiar fondo de proy 5 si existiera
}
// Inicializar Dark Mode
if (localStorage.getItem('p8_darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ==================== PROYECTO 9: Piedra, Papel, Tijera ====================
let userScore = 0;
let pcScore = 0;
const choices = ['Piedra', 'Papel', 'Tijera'];

function playRPS(userChoice) {
    const pcChoice = choices[Math.floor(Math.random() * 3)];
    let result = '';

    if(userChoice === pcChoice) result = `Empate. Ambos eligieron ${pcChoice}.`;
    else if(
        (userChoice === 'Piedra' && pcChoice === 'Tijera') ||
        (userChoice === 'Papel' && pcChoice === 'Piedra') ||
        (userChoice === 'Tijera' && pcChoice === 'Papel')
    ) {
        result = `¡Ganaste! ${userChoice} vence a ${pcChoice}.`;
        userScore++;
    } else {
        result = `Perdiste. ${pcChoice} vence a ${userChoice}.`;
        pcScore++;
    }
    
    document.getElementById('rps-result').textContent = result;
    document.getElementById('rps-user-score').textContent = userScore;
    document.getElementById('rps-pc-score').textContent = pcScore;
}

function resetRPS() {
    userScore = 0; pcScore = 0;
    document.getElementById('rps-user-score').textContent = 0;
    document.getElementById('rps-pc-score').textContent = 0;
    document.getElementById('rps-result').textContent = '¡Elige tu arma!';
}

// ==================== PROYECTO 10: Galería ====================
const images = [
    { src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=300', category: 'Animales', title: 'Gato' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300', category: 'Tecnología', title: 'Circuito' },
    { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300', category: 'Naturaleza', title: 'Montaña' },
    { src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300', category: 'Animales', title: 'Perro' },
    { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300', category: 'Tecnología', title: 'Código' },
    { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300', category: 'Naturaleza', title: 'Bosque' },
    { src: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=300', category: 'Animales', title: 'Tortuga' },
    { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300', category: 'Tecnología', title: 'Teclado' },
    { src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300', category: 'Naturaleza', title: 'Océano' }
];

let currentFilter = 'Todas';

function renderGallery(filter = 'Todas', search = '') {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';
    
    images.forEach(img => {
        if((filter === 'Todas' || img.category === filter) && img.title.toLowerCase().includes(search.toLowerCase())) {
            grid.innerHTML += `<img src="${img.src}" alt="${img.title}" onclick="openModal('${img.src}')">`;
        }
    });
}

function filterCategory(category) {
    currentFilter = category;
    renderGallery(category, document.getElementById('gallery-search').value);
}

function filterGallery() {
    renderGallery(currentFilter, document.getElementById('gallery-search').value);
}

function openModal(src) {
    document.getElementById('modal-img').src = src;
    document.getElementById('gallery-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('gallery-modal').classList.add('hidden');
}

renderGallery();