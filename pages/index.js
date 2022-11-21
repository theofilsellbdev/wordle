import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { WORDS } from "./api/words";
import { IoBackspace, IoEnter, IoMenu } from 'react-icons/io5'
import {useRouter} from 'next/router';

function GenerateWord() { return WORDS[Math.floor(Math.random() * WORDS.length)] }


export default function Home() {
  const router = useRouter();
  const [WORD, setWORD] = useState(GenerateWord())
  const pushRoute = href => {router.push(href)}

  const ALPHABET_ROWS = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"]
  ]

  const [turn, setTurn] = useState(0)


  const [currentGuess, setCurrentGuess] = useState([])
  const [previousGuesses, setPreviousGuesses] = useState([false, false, false, false, false, false])


  const HandleKey = (key) => {
    if ((key != 'Backspace') && (key != 'Enter') && (currentGuess.length < 5) && (previousGuesses[previousGuesses.length - 1] == false)) {
      var guess = []

      for (var i = 0; i < currentGuess.length; i++) {
        guess.push(currentGuess[i])
      }
      guess.push(key)

      setCurrentGuess(guess)

    }

    else if (key == 'Backspace') {

      var guess = []

      for (var i = 0; i < currentGuess.length - 1; i++) {
        guess.push(currentGuess[i])
      }

      setCurrentGuess(guess)

    }

    else if (key == 'Enter') {

      if (currentGuess.length == 5 && WORDS.indexOf(currentGuess.join('')) != -1) {
        let temp = []

        if (previousGuesses[previousGuesses.length - 1] == false) {
          temp.push(currentGuess)
          for (var i = 0; i < previousGuesses.length - 1; i++) {
            temp.push(previousGuesses[i])
          }

          setCurrentGuess([])
          setPreviousGuesses(temp)

          setTurn(turn + 1)

          console.log(previousGuesses)

        }
      }
    }
  }

  useEffect(() => {
    function HandleKeyPress(e) {


      var acceptable = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "Backspace", "Enter"]

      if (acceptable.indexOf(e.key) != -1) {
        if (e.keyCode == 13) {
          HandleKey("Enter")
        }
        else {
          HandleKey(e.key)
        }
      }

      console.log(currentGuess)
    }

    document.addEventListener("keydown", HandleKeyPress);
    return () => document.removeEventListener("keydown", HandleKeyPress);
  });

  function RenderBlock(letter, index, guessIndex) {
    // Find the total instances of the letter in the word

    console.log(letter + ":" + index)

    var word = WORD
    var occurences = word.split(letter).length - 1

    console.log(word + ":" + occurences)


    // If occurences < 1 WLWP

    if (occurences < 1) {
      return <div className="WLWP">{letter}</div>
    }

    // If letter at index in word = letter RLRP

    else if (word[index] == letter) {
      return <div className="RLRP">{letter}</div>
    }

    // If occurences > 1

    else if (occurences >= 1) {
      //   if instances before the index = occurences WLWP

      var crGs = previousGuesses[guessIndex].join('')
      var wordBefore = crGs.substring(0, index)
      var instances = wordBefore.split(letter).length - 1

      console.log(wordBefore + ":" + instances)


      if (instances == occurences) {
        return <div className="WLWP">{letter}</div>
      }

      //   else RLWP

      else {
        return <div className="RLWP">{letter}</div>
      }
    }
  }

  function RenderPopup() {

    if (ContainsCorrectGuess() != false) {
      return (
        <div className="popup">
          <div className="innerPopup">
            <h2>You're ok I guess.</h2>
            <p> The Word Was <em>"{WORD}"</em> <br />
              You Guessed it in <em>"{turn}"</em> {turn > 1 ? <>turns</> : <>turn</>}</p>
            <button onClick={() => Reset()}>Play Again</button>
          </div>
        </div>
      )
    }

    else {

      var lettersCorrect = 0;

      for (var z = 0; z < 5; z++) {
        if (WORD[z] == previousGuesses[0][z]) { lettersCorrect += 1 }
      }

      return (
        <div className="popup">
          <div className="innerPopup">
            <h2>You're Bad!</h2>
            <p> The Word Was <em>"{WORD}"</em> <br />
              You Guessed <em>"{previousGuesses[0].join("")}"</em> <br />
              You Got <em>{Math.round((lettersCorrect / 5) * 100)}%</em> of the <wbr /> characters Correct </p>            
            <button onClick={() => Reset()}>Try Again</button>
          </div>
        </div>
      )

    }
  }

  const Reset = () => {
    setWORD(GenerateWord())
    setPreviousGuesses([false, false, false, false, false, false])
    setCurrentGuess([])
    setTurn(0)
  }

  function ContainsCorrectGuess() {
    for (var y = 0; y < 6; y++) {
      if (previousGuesses[y] != false) {
        for (var i = 0; i < 5; i++) {
          if (WORD[i] != previousGuesses[y][i]) { return false }
        }
        return (y + 1)
      }
    }
    return false
  }

  return (
    <div className={styles.container} onKeyPress={e => HandleKeyPress(e)}>

      <div className="body">

        <div className="Navbar">
          <a onClick={() => pushRoute('/menu')}><IoMenu /></a>
          <h1>Wordle 2.0</h1>
          <a onClick={() => pushRoute('/about')}><div>About</div></a>
        </div>

        <div className="WordleContainer">

          <div className="tableContainer">

            {previousGuesses[previousGuesses.length - 1] == false ?
              <div className="row">

                <div className="cell">
                  {currentGuess.length >= 1 ? <div className="inDivEntry">{currentGuess[0]}</div>
                    : <div className="inDiv">{currentGuess[0]}</div>}
                </div>
                <div className="cell">
                  {currentGuess.length >= 2 ? <div className="inDivEntry">{currentGuess[1]}</div>
                    : <div className="inDiv">{currentGuess[1]}</div>}
                </div>
                <div className="cell">
                  {currentGuess.length >= 3 ? <div className="inDivEntry">{currentGuess[2]}</div>
                    : <div className="inDiv">{currentGuess[2]}</div>}
                </div>
                <div className="cell">
                  {currentGuess.length >= 4 ? <div className="inDivEntry">{currentGuess[3]}</div>
                    : <div className="inDiv">{currentGuess[3]}</div>}
                </div>
                <div className="cell">
                  {currentGuess.length >= 5 ? <div className="inDivEntry">{currentGuess[4]}</div>
                    : <div className="inDiv">{currentGuess[4]}</div>}
                </div>

              </div> : null
            }

            {
              previousGuesses.map((guess, guessIndex) => {

                if (guess == false) {
                  return (
                    <div className="row">
                      <div className="cell"><div className="inDiv"></div></div>
                      <div className="cell"><div className="inDiv"></div></div>
                      <div className="cell"><div className="inDiv"></div></div>
                      <div className="cell"><div className="inDiv"></div></div>
                      <div className="cell"><div className="inDiv"></div></div>
                    </div>
                  )
                }
                else {
                  return (
                    <div className="row">
                      {guess.map((letter, index) => {
                        return <div className="cell">{RenderBlock(letter, index, guessIndex)}</div>
                      })}
                    </div>
                  )
                }
              }
              )
            }

          </div>
        </div>
        <div className="KeyboardContainer">
          {
            ALPHABET_ROWS.map((row) => {
              return (<div className="row">{
                row.map((letter) => {

                  var i = 0;

                  while (i < 6 && previousGuesses[i] != false) {

                    if (previousGuesses[i].indexOf(letter) != -1) {

                      for (var x = 0; x < 5; x++) {

                        if (previousGuesses[i][x] == letter) {
                          if (WORD[x] == letter) {
                            return (<div className="FoundLetter" onClick={() => HandleKey(letter)}>{letter}</div>)
                          }

                          else if (WORD.indexOf(letter) != -1) {
                            return (<div className="IdentifiedLetter" onClick={() => HandleKey(letter)}>{letter}</div>)
                          }

                          else {
                            return (<div className="IncorrectLetter" onClick={() => HandleKey(letter)}>{letter}</div>)
                          }
                        }
                      }
                    }

                    i += 1;
                  }

                  if (letter == "Backspace") return (<div className="Backspace" onClick={() => HandleKey(letter)}><IoBackspace /></div>)
                  else if (letter == "Enter") return (<div className="Enter" onClick={() => HandleKey(letter)}><IoEnter /></div>)
                  else return (<div className="Letter" onClick={() => HandleKey(letter)}>{letter}</div>)
                })
              }</div>)
            })
          }
        </div>
      </div>
      {previousGuesses[5] != false || (ContainsCorrectGuess() != false) ? RenderPopup() : null}
    </div>
  )
}