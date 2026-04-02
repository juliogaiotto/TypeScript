import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    savePassword: (data: any) => ipcRenderer.invoke('save-password', data)
});