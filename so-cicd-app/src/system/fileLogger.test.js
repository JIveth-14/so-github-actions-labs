/* eslint-env node */
/* global process */

import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { processTextFile } from './fileLogger.js';

const BASE_DIR = process.cwd();
const DATA_DIR = path.join(BASE_DIR, 'data');
const TMP_FILE = path.join(DATA_DIR, 'test-file.txt');

describe('processTextFile', () => {
  it('counts non-empty lines in a file', () => {
    // Nos aseguramos de que exista la carpeta data
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Creamos un archivo con 3 líneas no vacías
    fs.writeFileSync(TMP_FILE, 'a\nb\n\nc\n', 'utf8');

    const result = processTextFile(TMP_FILE);
    expect(result).toBe(3);

    // Limpiamos archivo temporal
    fs.unlinkSync(TMP_FILE);
  });

  it('throws FILE_NOT_FOUND when file is missing', () => {
    const missing = path.join(DATA_DIR, 'missing.txt');
    expect(() => processTextFile(missing)).toThrowError('FILE_NOT_FOUND');
  });
});
