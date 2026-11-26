import Tile from "./Tile";

export default function Row({ guess = "", result = [] }) {
  return (
    <div className="row">
      {Array.from({ length: 5 }).map((_, index) => (
        <Tile
          key={index}
          letter={guess[index] || ""}
          status={result[index] || ""}
        />
      ))}
    </div>
  );
}