import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>SO CI/CD App</h1>
        <p>Aplicación base para el laboratorio de GitHub Actions y SO</p>
      </header>

      <section className="system-info">
        <h2>Información del entorno</h2>
        <ul>
          <li>
            <strong>MODE (build):</strong> {import.meta.env.MODE}
          </li>
          <li>
            <strong>VITE_NODE_ENV:</strong>{" "}
            {import.meta.env.VITE_NODE_ENV || "no definido"}
          </li>
          <li>
            <strong>VITE_APP_VERSION:</strong>{" "}
            {import.meta.env.VITE_APP_VERSION || "1.0.0"}
          </li>
        </ul>
      </section>

      <section className="notes">
        <h2>Notas</h2>
        <p>
          Esta página principal muestra información del sistema/entorno
          obtenida de las variables de entorno expuestas en tiempo de build.
        </p>
      </section>
    </div>
  );
}

export default App;
