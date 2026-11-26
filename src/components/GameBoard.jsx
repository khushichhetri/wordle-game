import Row from "./Row";

export default function GameBoard({
    guesses = [],
    currentGuess = "",
    results = []
}) {
    return (
        <div className="game-board">
            {Array.from({ length: 6 }).map((_, index) => {
                let guess = "";
                let result = [];

                if (index < guesses.length) {
                    guess = guesses[index];
                    result = results[index];
                } else if (index === guesses.length) {
                    guess = currentGuess;
                }

                return (
                    <Row
                        key={index}
                        guess={guess}
                        result={result}
                    />
                );
            })}
        </div>
    );
}