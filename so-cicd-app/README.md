# Automatización de CI/CD Multi-Plataforma con GitHub Actions

Este repositorio contiene el proyecto **“Automatización de CI/CD Multi-Plataforma con GitHub Actions”**, desarrollado para la clase de **Sistemas Operativos I**.  
El objetivo es implementar un pipeline de **Integración Continua (CI)** y sentar las bases para **Entrega Continua (CD)** usando **GitHub Actions**, ejecutando los workflows en **Ubuntu, Windows y macOS**, integrando contenedores Docker, scripts de sistema y una aplicación web con pruebas automatizadas. :contentReference[oaicite:0]{index=0}

---

## Objetivos del proyecto

- Diseñar y configurar workflows de GitHub Actions en **múltiples sistemas operativos**.
- Practicar **gestión de procesos**, **sistema de archivos**, **permisos** y **variables de entorno** en Linux y Windows.
- Integrar **contenedores Docker** dentro del pipeline de CI.
- Automatizar tareas típicas de sistemas operativos mediante scripts.
- Construir un pipeline CI que:
  - Instale dependencias.
  - Ejecute pruebas unitarias.
  - Genere reportes de cobertura.
  - Produzca artefactos listos para despliegue.

---

## Requisitos

### Para ejecutar el proyecto localmente

- **Git** instalado (para clonar el repositorio).
- **Node.js** (versión LTS recomendada, por ejemplo 18.x).
- **npm** o **yarn** para gestionar dependencias.
- Opcional: **Docker Desktop** (si quieres probar las imágenes y contenedores localmente).

### Para que funcionen los workflows en GitHub Actions

- Una cuenta de **GitHub**.
- Este repositorio subido a GitHub.
- Permisos básicos para usar **GitHub Actions** en el repositorio.
- (Opcional) **Secrets** configurados en `Settings > Secrets and variables > Actions` si algún workflow usa valores sensibles (tokens, claves, etc.).

---

## Estructura general del repositorio

> *Los nombres exactos de carpetas o archivos pueden variar un poco; ajusta esta sección según tu repo real.*

- `src/`  
  Código fuente de la aplicación web de ejemplo (Node.js).

- `tests/`  
  Pruebas unitarias de la aplicación (por ejemplo, usando Jest u otra librería de pruebas).

- `.github/workflows/`  
  Contiene todos los workflows de GitHub Actions:
  - `multi-os-system-check.yml` (o similar) – Fase 1
  - `docker-container-action.yml` – Fase 2 (contenedores Docker)
  - `system-automation.yml` – Fase 2 (scripts de sistema Linux/Windows)
  - Otros archivos `.yml` relacionados con el pipeline de CI (build, tests, cobertura, etc.).

- `docker/` o `Dockerfile`  
  Definición de la imagen Docker basada en Node.

- `scripts/` (o similar)
  - `linux-automation.sh` – Script de automatización para Linux.
  - `windows-automation.ps1` – Script de automatización para Windows.

- `package.json`  
  Información del proyecto Node.js y scripts (`npm test`, `npm run build`, etc.).

---

## Descripción de las fases / workflows

### 🧪 Fase 1 – Multi-OS System Check

**Objetivo:**  
Verificar el comportamiento del mismo proyecto en diferentes sistemas operativos y entender cómo funcionan los **runners** de GitHub Actions.

**Qué hace el workflow:**

- Se ejecuta en una **matriz de sistemas operativos**:
  - `ubuntu-latest`
  - `windows-latest`
  - `macos-latest`
- En cada runner:
  - Muestra información del sistema (versión del SO, arquitectura, etc.).
  - Usa **bash** en Linux/macOS y **PowerShell** en Windows.
- Permite comparar diferencias entre comandos y herramientas según el sistema operativo.

---

### 🐳 Fase 2 – Docker y Gestión de Procesos

#### 2.1. Workflow con contenedores Docker

**Objetivo:**  
Demostrar el uso de contenedores Docker dentro del pipeline de CI, mostrando aislamiento de procesos y comunicación entre el host (runner) y el contenedor.

**Componentes principales:**

- `Dockerfile` basado en **Node.js**.
- Script `container-script.sh` que:
  - Imprime información interna del contenedor (hostname, fecha, etc.).
  - Lee un mensaje pasado desde el host mediante variables de entorno.
  - Ejecuta una “tarea pesada” simulada para observar uso de recursos.

**Workflow (`docker-container-action.yml`):**

- Construye la imagen definida en el `Dockerfile`.
- Ejecuta el contenedor como parte del pipeline.
- Pasa variables de entorno desde el runner al contenedor.

#### 2.2. Scripts del sistema y automatización

**Objetivo:**  
Practicar la automatización de tareas típicas de sistemas operativos en **Linux** y **Windows**.

**Scripts:**

- `linux-automation.sh`
  - Lee variables de entorno (incluyendo secretos).
  - Crea y lee archivos en el workspace (por ejemplo `output-linux.txt`).
  - Cambia permisos con `chmod`.
  - Lanza un proceso en segundo plano que escribe en `background-log.txt`.
  - Maneja errores usando códigos de salida (`exit 0`, `exit 1`, etc.).

- `windows-automation.ps1`
  - Realiza operaciones equivalentes en **PowerShell**.
  - Usa variables de entorno para configuración.
  - Gestiona permisos de archivos con `icacls`.
  - Usa `Start-Job` para procesos en background.

**Workflow (`system-automation.yml`):**

- Tiene dos jobs:
  - Uno en `ubuntu-latest` (Linux).
  - Otro en `windows-latest` (Windows).
- Cada job sube como **artifacts** los archivos generados (outputs y logs).

---

### 🚀 Fase 3 – Pipeline de CI Completo

**Objetivo:**  
Integrar todo lo aprendido en un pipeline de **Integración Continua** para una aplicación web con pruebas unitarias.

**Qué realiza el pipeline (a nivel general):**

- Instala dependencias de la app (por ejemplo `npm install`).
- Ejecuta **pruebas unitarias**.
- Genera reportes de **cobertura**.
- Construye la aplicación (build) y guarda el resultado como **artifact** listo para posible despliegue.
- Se ejecuta en **múltiples sistemas operativos** (multi-OS) para asegurar portabilidad.

> Nota: Los disparadores exactos (`on: push`, `on: pull_request`, etc.) se pueden revisar dentro de cada archivo `.yml` en la carpeta `.github/workflows/`.

---

## Cómo ejecutar el proyecto localmente

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/USUARIO/NOMBRE-DEL-REPO.git
   cd NOMBRE-DEL-REPO





# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
