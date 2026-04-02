let tempoInicial = 25 * 60; // 25 minutos em segundos
let tempoRestante = tempoInicial;
let timerId = null;

const displayMinutos = document.getElementById('minutes');
const displaySegundos = document.getElementById('seconds');
const btnStart = document.getElementById('btn-start');
const somAlerta = document.getElementById('alarm-sound');

function atualizarDisplay() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;

    // PadStart garante que o número sempre tenha 2 dígitos (ex: 05 ao invés de 5)
    displayMinutos.textContent = String(minutos).padStart(2, '0');
    displaySegundos.textContent = String(segundos).padStart(2, '0');
}

function iniciarTimer() {
    if (timerId !== null) return; // Evita criar vários timers ao mesmo tempo

    timerId = setInterval(() => {
        tempoRestante--;
        atualizarDisplay();

        if (tempoRestante <= 0) {
            clearInterval(timerId);
            timerId = null;
            somAlerta.play();
            alert("Tempo esgotado! Descanse um pouco.");
        }
    }, 1000);
}

function pausarTimer() {
    clearInterval(timerId);
    timerId = null;
}

function reiniciarTimer() {
    pausarTimer();
    tempoRestante = tempoInicial;
    atualizarDisplay();
}

// Eventos dos botões
btnStart.addEventListener('click', iniciarTimer);
document.getElementById('btn-pause').addEventListener('click', pausarTimer);
document.getElementById('btn-reset').addEventListener('click', reiniciarTimer);

function setTimer(minutos) {
    pausarTimer();
    tempoInicial = minutos * 60;
    tempoRestante = tempoInicial;
    atualizarDisplay();
}
document.title = `${displayMinutos.textContent}:${displaySegundos.textContent} - FocusFlow`;