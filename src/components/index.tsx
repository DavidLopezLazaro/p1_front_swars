import "./style.css";

interface Character {
  name: string;
  gender: string;
  birth_year: string;
}

export const Loader = () => {
  return <p>Cargando...</p>;
};

export const ErrorMessage = ({ message }: { message: string }) => {
  return <p style={{ color: "red" }}>{message}</p>;
};

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div className="card">
      <h3>{character.name}</h3>
      <p><strong>Género:</strong> {character.gender}</p>
      <p><strong>Año nacimiento:</strong> {character.birth_year}</p>
    </div>
  );
};

export const CharacterList = ({ characters }: { characters: Character[] }) => {
  return (
    <div className="grid">
      {characters.map((character, index) => (
        <CharacterCard key={index} character={character} />
      ))}
    </div>
  );
};
