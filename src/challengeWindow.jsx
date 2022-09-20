import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import useTimer from "../build/useTimer";
import "./challengeWIndow.css";

function ChallengeWindow({ words }) {
  const [letterPos, setLetterPos] = useState(0);
  const [wordPos, setWordPos] = useState(0);

  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);

  const { time, start } = useTimer();
  useEffect(() => {
    // start();
  }, []);

  useEffect(() => {
    setLetterPos(0);
    setWordPos(0);
    setScore(0);
    setWrong(0);
  }, [words]);

  useEffect(() => {
    const word = words[wordPos];
    const checkKey = (e) => {
      const correctKey = e.key === word[letterPos] || (e.key === " " && word[letterPos] === "_");
      if (correctKey) {
        setScore((score) => ++score);
        setLetterPos((letterPos) => {
          if (letterPos < word.length - 1) {
            return letterPos + 1;
          }
          return 0;
        });
        setWordPos((wordPos) => {
          if (letterPos === word.length - 1) {
            if (wordPos === words.length - 1) {
              return 0;
            }
            return wordPos + 1;
          }
          return wordPos;
        });
      } else {
        setWrong((wrong) => ++wrong);
      }
    };
    window.addEventListener("keydown", checkKey);
    return () => window.removeEventListener("keydown", checkKey);
  }, [words, letterPos, wordPos]);

  function windowContent(words) {
    function style(wordId, letterId) {
      // const textDecor = curr === pos ? "underline" : "";
      // const backgroundCol =
      //   wordPos === wordId && letterPos === letterId ? "rgba(0, 0, 0, 0.2)" : "";
      // const spaceWidth = letters[curr] === " " ? "7px" : "";
      const heightVal = "20px";
      // const bottomBord = letters[curr] === " " && curr === pos ? "double" : "";
      const fontColor = words[wordId][letterId] === "_" ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)";

      const style = {
        // textDecoration: textDecor,
        // background: backgroundCol,
        // width: spaceWidth,
        height: heightVal,
        // borderBottom: bottomBord,
        fontSize: "20px",
        color: fontColor,
      };
      return style;
    }

    return words.map((word, wordId) => {
      const wordArr = word.split("");
      return (
        <div className="word" key={wordId} style={{ display: "flex", flexDirection: "row" }}>
          {wordArr.map((letter, letterId) => {
            const activeLetter = wordPos === wordId && letterPos === letterId ? "activeLetter" : "";
            return (
              <div
                className={activeLetter}
                style={style(wordId, letterId)}
                wordpos={wordId}
                letterid={letterId}
                key={`${wordId}-${letterId}`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      );
    });
  }

  const style = {
    width: "500px",
    height: "300px",
    border: "1px solid black",
    overflow: "hidden",
    display: "flex",
    // gap: "6px 3px",
    flexWrap: "wrap",
    paddingTop: "20px",
    paddingBottom: "20px",
  };

  return (
    <div className="challengeWindow">
      {score}/{wrong}, {wrong > 0 ? Math.trunc((score / (wrong + score)) * 100) : "100"}% {time}
      <div style={style}>{windowContent(words)}</div>
    </div>
  );
}

export default ChallengeWindow;
