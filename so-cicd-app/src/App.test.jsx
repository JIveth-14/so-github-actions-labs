// so-cicd-app/src/App.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("muestra el título de la app", () => {
    render(<App />);
    expect(screen.getByText(/SO CI\/CD App/i)).toBeInTheDocument();
  });
});
