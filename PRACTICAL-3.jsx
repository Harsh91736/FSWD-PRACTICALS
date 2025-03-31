import os from 'os';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getSystemInfo() {
    const info = {
        osType: os.type(),
        osRelease: os.release(),
        totalMemory: `${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
        freeMemory: `${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
        cpuModel: os.cpus()[0].model,
        cpuCores: os.cpus().length,
        uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
        userInfo: os.userInfo().username
    };
    return info;
}

function ensureLogsDirectory() {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
        console.log('Created logs directory');
    }
    return logsDir;
}

function saveSystemInfo() {
    try {
        const logsDir = ensureLogsDirectory();
        const filePath = path.join(logsDir, 'system-info.txt');
        const info = getSystemInfo();
        const timestamp = new Date().toISOString();
        
     
        const fileContent = `System Information Report
Generated at: ${timestamp}

Operating System:
- Type: ${info.osType}
- Release: ${info.osRelease}

Memory:
- Total: ${info.totalMemory}
- Free: ${info.freeMemory}

CPU:
- Model: ${info.cpuModel}
- Cores: ${info.cpuCores}

Other:
- Uptime: ${info.uptime}
- User: ${info.userInfo}
`;

        
        fs.writeFileSync(filePath, fileContent);
        console.log(`System information saved to: ${filePath}`);
        
      
        console.log('\nCurrent System Information:');
        console.log(fileContent);
        
    } catch (error) {
        console.error('Error saving system information:', error.message);
    }
}

console.log('System Utility Dashboard\n');
saveSystemInfo(); 
