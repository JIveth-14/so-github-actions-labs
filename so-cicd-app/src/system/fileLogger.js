/* eslint-env node */
/* global process */

// so-cicd-app/src/system/fileLogger.js
import fs from 'node:fs';
import path from 'node:path';

// Carpeta base = raíz del proyecto (so-cicd-app)
const BASE_DIR = process.cwd();
const LOG_DIR = path.join(BASE_DIR, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

// Aseguramos la carpeta de logs
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Escribe un mensaje en consola y en el archivo de log.
 * @param {string} message
 */
export function logMessage(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  // Log en consola
  process.stdout.write(line);
  // Log en archivo
  fs.appendFileSync(LOG_FILE, line, 'utf8');
}

/**
 * Lee un archivo de texto y devuelve cuántas líneas NO vacías tiene.
 * Genera logs del proceso.
 * @param {string} filePath
 * @returns {number} cantidad de líneas no vacías
 */
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
