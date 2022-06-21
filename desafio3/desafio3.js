"use strict";
let botaoAtualizar = document.getElementById('atualizar-saldo');
let botaoLimpar = document.getElementById('limpar-saldo');
let soma = document.getElementById('soma');
let campoSaldo = document.getElementById('campo-saldo');
if (campoSaldo) {
    campoSaldo.innerHTML = "0";
}
function somarAoSaldo(soma) {
    if (campoSaldo) {
        let valor = Number(campoSaldo.innerHTML) + soma;
        campoSaldo.innerHTML = String(valor);
    }
}
function limparSaldo() {
    if (campoSaldo) {
        campoSaldo.innerHTML = '';
    }
}
if (botaoAtualizar) {
    botaoAtualizar.addEventListener('click', function () {
        if (soma) {
            somarAoSaldo(Number(soma.value));
        }
    });
}
if (botaoLimpar) {
    botaoLimpar.addEventListener('click', function () {
        limparSaldo();
    });
}
