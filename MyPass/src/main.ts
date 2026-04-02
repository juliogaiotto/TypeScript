import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let mainWindow: BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 540,
        height: 680,
        backgroundColor: '#252525', // Cor de fundo do VS Code
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
    mainWindow.setMenuBarVisibility(false); // Esconde o menu superior
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Lida com o salvamento do arquivo JSON
ipcMain.handle('save-password', async (event, data) => {
    // Salva na pasta Documentos do usuário
    const docsPath = app.getPath('documents');
    const filePath = path.join(docsPath, 'MyPass_Senhas.json');
    
    let passwords = [];

    // Verifica se o arquivo já existe
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        if (fileContent) {
            passwords = JSON.parse(fileContent);
        }
    }

    // Adiciona a nova senha com a data atual
    const newEntry = {
        ...data,
        data_inclusao: new Date().toLocaleString('pt-BR')
    };
    
    passwords.push(newEntry);

    // Salva o arquivo
    fs.writeFileSync(filePath, JSON.stringify(passwords, null, 4), 'utf-8');
    return { success: true, path: filePath };
});