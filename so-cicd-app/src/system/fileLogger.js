import fs from 'node:fs';
import path from 'node:path';

const BASE_DIR = process.cwd();
const LOG_DIR = path.join(BASE_DIR, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}


export function logMessage(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  process.stdout.write(line);
  fs.appendFileSync(LOG_FILE, line, 'utf8');
}


export function processTextFile(filePath) {
  if (!fs.existsSync(filePath)) {
    logMessage(`File not found: ${filePath}`);
    throw new Error('FILE_NOT_FOUND');
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter((l) => l.trim() !== '');
  logMessage(`Processed file ${filePath}. Lines: ${lines.length}`);
  return lines.length;
}