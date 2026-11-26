export default function Keyboard({ onKeyPress }) {
    const rows = [
        "QWERTYUIOP".split(""),
        "ASDFGHJKL".split(""),
        ["ENTER", ..."ZXCVBNM".split(""), "BACKSPACE"]
    ];

    return (
        <div className="keyboard">
            {rows.map((row, index) => (
                <div key={index} className="keyboard-row">
                    {row.map((key) => (
                        <button
                            key={key}
                            className="key"
                            onClick={() => onKeyPress(key)}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}