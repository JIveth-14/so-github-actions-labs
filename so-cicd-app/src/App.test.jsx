import { render, screen } from "@testing-library/react";
import App from "./App";

test("muestra el título de la app", () => {
  render(<App />);
  expect(screen.getByText(/SO CI\/CD App/i)).toBeInTheDocument();
});
