"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Elementos da UI
const inputNome = document.getElementById('inputNome');
const inputSite = document.getElementById('inputSite');
const inputSenha = document.getElementById('inputSenha');
const selLength = document.getElementById('selLength');
const chkUpper = document.getElementById('chkUpper');
const chkLower = document.getElementById('chkLower');
const chkNum = document.getElementById('chkNum');
const chkSpec = document.getElementById('chkSpec');
const btnGerar = document.getElementById('btnGerar');
const btnSalvar = document.getElementById('btnSalvar');
const statusMessage = document.getElementById('statusMessage');
// Função para gerar a senha
btnGerar.addEventListener('click', () => {
    const length = parseInt(selLength.value);
    const hasUpper = chkUpper.checked;
    const hasLower = chkLower.checked;
    const hasNum = chkNum.checked;
    const hasSpec = chkSpec.checked;
    let charset = "";
    if (hasUpper)
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (hasLower)
        charset += "abcdefghijklmnopqrstuvwxyz";
    if (hasNum)
        charset += "0123456789";
    if (hasSpec)
        charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    if (charset === "") {
        alert("Selecione pelo menos uma opção de caracteres!");
        return;
    }
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    inputSenha.value = password;
    statusMessage.innerText = "";
});
// Função para salvar
btnSalvar.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const nome = inputNome.value.trim();
    const site = inputSite.value.trim();
    const senha = inputSenha.value;
    if (!nome || !site || !senha) {
        alert("Preencha o Nome, Site e gere uma Senha antes de salvar.");
        return;
    }
    // Chama a função do main.ts através do preload (contextBridge)
    // @ts-ignore (ignora o aviso de tipagem global para 'api')
    const response = yield window.api.savePassword({ nome, site, senha });
    if (response.success) {
        statusMessage.innerText = `Senha salva com sucesso em:\n${response.path}`;
        inputNome.value = "";
        inputSite.value = "";
        inputSenha.value = "";
    }
}));
