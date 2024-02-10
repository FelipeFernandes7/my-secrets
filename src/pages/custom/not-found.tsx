import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div>
      <h1>ops.. esta página não existe</h1>
      <Link to="/">voltar para home</Link>
    </div>
  );
}
