// Letter Tiles

// Create a React app that displays buttons for the letters A to Z. When a letter is clicked, append it to an output string shown on the screen. If the same letter is clicked multiple times, apply custom logic to track how many times it has been selected and update the output accordingly. The app should maintain both the clicked-letter history and the count of repeated clicks per letter.


import React, { useMemo, useState } from "react";

const styles = {
  letterContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  letter: {
    padding: "10px 14px",
    background: "#c9e4ed",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  outputString: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

function App() {
  const [output, setOutput] = useState([]);
  const [tally, setTally] = useState({});

  const letters = useMemo(() => {
    const result = [];
    for (let i = 65; i <= 90; i++) {
      result.push(String.fromCharCode(i));
    }
    return result;
  }, []);

  const handleLetterClick = (letter) => {
    const currentCount = tally[letter] || 0;

    if (currentCount === 0) {
      setTally((prev) => ({
        ...prev,
        [letter]: 1,
      }));
      setOutput((prev) => [...prev, letter]);
    } else if (currentCount === 1) {
      setTally((prev) => ({
        ...prev,
        [letter]: 2,
      }));
      setOutput((prev) => [...prev, letter]);
    } else {
      setTally((prev) => ({
        ...prev,
        [letter]: 0,
      }));
      setOutput((prev) => [...prev.slice(0, prev.length - 2), "_"]);
    }
  };

  return (
    <section>
      <div style={styles.letterContainer}>
        {letters.map((letter) => (
          <button
            key={letter}
            type="button"
            style={styles.letter}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <div style={styles.outputString}>
        Output String: {output.join("")}
      </div>
    </section>
  );
}

export default App;