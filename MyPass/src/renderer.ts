// Elementos da UI
const inputNome = document.getElementById('inputNome') as HTMLInputElement;
const inputSite = document.getElementById('inputSite') as HTMLInputElement;
const inputSenha = document.getElementById('inputSenha') as HTMLInputElement;
const selLength = document.getElementById('selLength') as HTMLSelectElement;

const chkUpper = document.getElementById('chkUpper') as HTMLInputElement;
const chkLower = document.getElementById('chkLower') as HTMLInputElement;
const chkNum = document.getElementById('chkNum') as HTMLInputElement;
const chkSpec = document.getElementById('chkSpec') as HTMLInputElement;

const btnGerar = document.getElementById('btnGerar') as HTMLButtonElement;
const btnSalvar = document.getElementById('btnSalvar') as HTMLButtonElement;
const statusMessage = document.getElementById('statusMessage') as HTMLDivElement;

// Função para gerar a senha
btnGerar.addEventListener('click', () => {
    const length = parseInt(selLength.value);
    const hasUpper = chkUpper.checked;
    const hasLower = chkLower.checked;
    const hasNum = chkNum.checked;
    const hasSpec = chkSpec.checked;

    let charset = "";
    if (hasUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (hasLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (hasNum) charset += "0123456789";
    if (hasSpec) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

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
btnSalvar.addEventListener('click', async () => {
    const nome = inputNome.value.trim();
    const site = inputSite.value.trim();
    const senha = inputSenha.value;

    if (!nome || !site || !senha) {
        alert("Preencha o Nome, Site e gere uma Senha antes de salvar.");
        return;
    }

    // Chama a função do main.ts através do preload (contextBridge)
    // @ts-ignore (ignora o aviso de tipagem global para 'api')
    const response = await window.api.savePassword({ nome, site, senha });

    if (response.success) {
        statusMessage.innerText = `Senha salva com sucesso em:\n${response.path}`;
        inputNome.value = "";
        inputSite.value = "";
        inputSenha.value = "";
    }
});
