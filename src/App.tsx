
import { useEffect, useState } from "react";
import { api } from "./api/api";
import { CharacterList, Loader, ErrorMessage } from "./components";
import "./App.css";

interface Character {
  name: string;
  gender: string;
  birth_year: string;
}

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const fetchCharacters = async (url?: string) => {
    try {
      setLoading(true);
      const res = await api.get(url || "/people/");
      setCharacters((prev) => [...prev, ...res.data.results]);
      setNextUrl(res.data.next);
    } catch (err) {
      setError("Error al cargar personajes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Personajes Star Wars</h1>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      <CharacterList characters={characters} />

      {nextUrl && !loading && (
        <button
          onClick={() => fetchCharacters(nextUrl)}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Siguiente Página
        </button>
      )}
    </div>
  );
};

export default App;
