import React from 'react';
import styles from './styles.module.css';
import slime from '../assets/slime pizza.jpg';
import monkey from '../assets/monkey.jpg';
import ride from '../assets/ride.jpg';

export default function Videogames() {
  React.useEffect(() => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let squares = [];
    let bombAmount = 20;
    let isGameOver = false;
    let flags = 0;
    const flagP = document.querySelector('.flags__left');
    const gameOva = document.querySelector('.gameova');
    function createBoard() {
      flagP.innerHTML = 'Flags left: ' + bombAmount;
      //get shuffled game array with random bombs
      const bombsArray = Array(bombAmount).fill('bomb');
      const emptyArray = Array(width * width - bombAmount).fill('valid');

      const gameArray = emptyArray.concat(bombsArray);
      const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

      for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.setAttribute('id', i);
        square.classList.add(shuffledArray[i]);
        grid.appendChild(square);
        squares.push(square);

        //normal click
        square.addEventListener('click', function (e) {
          click(square);
        });

        //cntrl and left click
        square.oncontextmenu = function (e) {
          e.preventDefault();
          addFlag(square);
        };
      }

      for (let i = 0; i < squares.length; i++) {
        let total = 0;
        const isLeftEdge = i % width === 0;
        const isRightEdge = i % width === width - 1;

        if (squares[i].classList.contains('valid')) {
          if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb'))
            total++;
          if (
            i > 9 &&
            !isRightEdge &&
            squares[i + 1 - width].classList.contains('bomb')
          )
            total++;
          if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
          if (
            i > 11 &&
            !isLeftEdge &&
            squares[i - 1 - width].classList.contains('bomb')
          )
            total++;
          if (
            i < 98 &&
            !isRightEdge &&
            squares[i + 1].classList.contains('bomb')
          )
            total++;
          if (
            i < 90 &&
            !isLeftEdge &&
            squares[i - 1 + width].classList.contains('bomb')
          )
            total++;
          if (
            i < 88 &&
            !isRightEdge &&
            squares[i + 1 + width].classList.contains('bomb')
          )
            total++;
          if (i < 89 && squares[i + width].classList.contains('bomb')) total++;
          squares[i].setAttribute('data', total);
        }
      }
    }

    //click on square actions
    function click(square) {
      let currentId = square.id;
      if (isGameOver) return;
      if (
        square.classList.contains('checked') ||
        square.classList.contains('flag')
      )
        return;
      if (square.classList.contains('bomb')) {
        gameOver(square);
      } else {
        let total = square.getAttribute('data');
        if (total != 0) {
          square.classList.add('checked');
          square.innerHTML = total;
          return;
        }
        checkSquare(square, currentId);
      }
      square.classList.add('checked');
    }

    //check neighboring squares once square is clicked
    function checkSquare(square, currentId) {
      const isLeftEdge = currentId % width === 0;
      const isRightEdge = currentId % width === width - 1;

      setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) - 1].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (currentId > 9 && !isRightEdge) {
          const newId = squares[parseInt(currentId) + 1 - width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (currentId > 10) {
          const newId = squares[parseInt(currentId - width)].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (currentId > 11 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) - 1 - width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (currentId < 98 && !isRightEdge) {
          const newId = squares[parseInt(currentId) + 1].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (currentId < 90 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) - 1 + width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (currentId < 88 && !isRightEdge) {
          const newId = squares[parseInt(currentId) + 1 + width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (currentId < 89) {
          const newId = squares[parseInt(currentId) + width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
      }, 10);
    }

    //gameover
    function gameOver(square) {
      isGameOver = true;

      //show ALL the bombs
      squares.forEach((square) => {
        if (square.classList.contains('bomb')) {
          square.innerHTML = '💣';
        }
      });
      gameOva.innerHTML = 'Game Ova';
    }

    //check for win
    function checkForWin() {
      let matches = 0;
      for (let i = 0; i < squares.length; i++) {
        if (
          squares[i].classList.contains('flag') &&
          squares[i].classList.contains('bomb')
        ) {
          matches++;
        }
        if (matches === bombAmount) {
          isGameOver = true;
          alert('WIN!');
        }
      }
    }

    //add flag with right click
    function addFlag(square) {
      if (isGameOver) return;
      if (!square.classList.contains('checked')) {
        if (!square.classList.contains('flag')) {
          square.classList.add('flag');
          square.innerHTML = '🏳️‍🌈';
          flags++;
          flagP.innerHTML = 'Flags left: ' + parseInt(bombAmount - flags);
          checkForWin();
        } else {
          square.classList.remove('flag');
          square.innerHTML = '';
          flags--;
          flagP.innerHTML = 'Flags left: ' + parseInt(bombAmount - flags);
        }
      }
    }
    createBoard();
  }, []);
  return (
    <>
      <section>
        <h2>The Minesweeper game</h2>
        <div className="mine">
          <div className="grid"></div>
          <p className="flags__left"></p>
          <p className="gameova"></p>
        </div>
      </section>

      <section>
        <h2>
          PROTECT THE CORE FROM INCOMING RED PROJECTILES. LET GREEN ONES
          THROUGH. PRESS & HOLD SPACE FOR A TEMPORARY SHIELD.
        </h2>
        <iframe
          className={styles.iframe}
          src="https://lab.hakim.se/core/"
          title="amazing game"
        ></iframe>
      </section>
      <section>
        <h2>
          Enclose the blue orbs before they explode. Gain bonus points by
          enclosing multiple orbs at once.
        </h2>
        <iframe
          className={styles.iframe}
          src="http://lab.hakim.se/coil/"
          title="the change game"
        ></iframe>
      </section>
      <section>
        <h2>A remix of the classic Breakout game.</h2>
        <iframe
          className={styles.iframe}
          src="https://lab.hakim.se/breakdom/"
          title="experiments"
        ></iframe>
      </section>
      <section>
        <h2>Random games you can play for free</h2>
        <div className="slime-container">
          <figure>
            <img
              src={slime}
              width="70"
              height="59"
              align="left"
              alt="Games at Miniclip.com - Slime Pizza"
            />

            <figcaption>
              <a
                target="_blank"
                rel="noopener noreferrer canonical"
                href="https://www.miniclip.com/games/slime-pizza/en/"
              >
                Slime Pizza
              </a>
              Collect all the pizza you can, but beware the watchful eye of the
              patrol officer!{' '}
              <a
                target="_blank"
                rel="noopener noreferrer canonical"
                className="btn"
                href="https://www.miniclip.com/games/slime-pizza/en/"
                title="Games at Miniclip.com"
              >
                Play for free!
              </a>
            </figcaption>
          </figure>
          <figure>
            <img
              src={monkey}
              width="70"
              height="59"
              align="left"
              alt="Games at Miniclip.com - Slime Pizza"
            />

            <figcaption>
              <a
                target="_blank"
                rel="noopener noreferrer canonical"
                href="https://www.miniclip.com/games/slime-pizza/en/"
              >
                Monkey Kick
              </a>
              Help Monkey Kick Furball to the hills and beyond! How far can you
              get?{' '}
              <a
                target="_blank"
                rel="noopener noreferrer canonical"
                className="btn"
                href="https://www.miniclip.com/games/slime-pizza/en/"
                title="Games at Miniclip.com"
              >
                Play for free!
              </a>
            </figcaption>
          </figure>
          <figure>
            <img
              src={ride}
              width="70"
              height="59"
              align="left"
              alt="Games at Miniclip.com"
            />

            <figcaption>
              <a
                target="_blank"
                rel="noopener noreferrer canonical"
                href="https://www.miniclip.com/games/slime-pizza/en/"
              >
                Short Ride
              </a>
              It's a Short Life! With so many dumb ways to die!{' '}
              <a
                target="_blank"
                rel="noopener noreferrer canonical"
                className="btn"
                href="https://www.miniclip.com/games/slime-pizza/en/"
                title="Games at Miniclip.com"
              >
                Play for free!
              </a>
            </figcaption>
          </figure>
        </div>
      </section>
      <section>
        <h2>Alge's Escapade</h2>
        <iframe
          className={styles.iframe}
          title="online game"
          src="https://dave-and-mike.github.io/game-off-2012/"
        ></iframe>
      </section>
      <section></section>
    </>
  );
}
