import { useEffect, useState } from "react";
import ChallengeWindow from "./challengeWindow";
import wordCollections from "./assets/wordCollections.json";
import { useFormControlStyles } from "@chakra-ui/react";
import getWords from "./getWords";

function App() {
  const [input, setInput] = useState("");

  function parseWords(wordsRaw) {
    const wordsClean = wordsRaw.replaceAll("\n", " ").replaceAll("\t", " ");
    let wordsArr = wordsClean.split(" ");
    wordsArr = wordsArr.filter((w) => w);
    for (let i = 0; i < wordsArr.length; i++) {
      wordsArr[i] = wordsArr[i] + "_";
    }
    return wordsArr;
  }
  const [words, setWords] = useState(() => {
    return parseWords(wordCollections[0].rawWords);
  });

  function scamble(arr) {
    const scrambled = [...arr];
    let curr = arr.length - 1;
    while (curr !== 0) {
      let rand = Math.floor(Math.random() * curr);
      [scrambled[curr], scrambled[rand]] = [scrambled[rand], scrambled[curr]];
      curr--;
    }
    return scrambled;
  }

  function handleScamble(e) {
    const scrambledWords = scamble(words);
    setWords(scrambledWords);
    e.currentTarget.blur();
  }

  const [letters, setLetters] = useState("");
  const [wordLength, setWordLength] = useState(0);

  async function doGetWords() {
    console.log(letters, wordLength);
    const rawWords = await getWords(letters, wordLength);
    console.log("gotten", rawWords);
    console.log("hello");
    setWords(parseWords(rawWords));
  }

  return (
    <div className="App">
      <ChallengeWindow words={words}></ChallengeWindow>
      <button onClick={handleScamble}>Scramble Words</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setWords(parseWords(input));
        }}
      >
        <label htmlFor="wordsBox">Set Words</label>
        <textarea
          style={{ width: "400px", height: "100px" }}
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setWords(parseWords(input));
            e.currentTarget.blur();
          }}
        >
          Ok
        </button>
      </form>
      <form action="">
        <label htmlFor="">Find words</label>
        <input type="text" placeholder="letters" onChange={(e) => setLetters(e.target.value)} />
        <input
          type="number"
          placeholder="word length"
          onChange={(e) => setWordLength(Number(e.target.value))}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            doGetWords(letters, wordLength);
          }}
        >
          Find
        </button>
      </form>
      {wordCollections.map((option, id) => {
        return (
          <button key={id} onClick={() => setWords(parseWords(option.rawWords))}>
            {option.name}
          </button>
        );
      })}
    </div>
  );
}

export default App;
