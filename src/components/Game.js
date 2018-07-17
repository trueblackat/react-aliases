import React, { Component } from 'react';
import '../stylesheets/game.css';
import words from '../data/words';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: 0,
      progress: 0,
      gameEnds: false,
      activeWord: null
    }

    this.innerProps = {
      recursionCounter: 0,
      timeToRound: 60
    }

    this.onPassClick = this.onPassClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  onPassClick() {
    this.setWordAsAnswered(this.state.activeWord);
    this.setRandomWord();
    this.setState((prevState) => {
      return { points: prevState.points - 1};
    });
  }

  onNextClick() {
    this.setWordAsAnswered(this.state.activeWord);
    this.setRandomWord();
    this.setState((prevState) => {
      return { points: prevState.points + 1};
    });
  }

  setRandomWord(callback) {
    var word = words[Math.floor(Math.random() * words.length)];
    let maxRecursionCalls = 100;

    if (this.isWordAnswered(word)) {
      this.innerProps.recursionCounter++;

      if (this.innerProps.recursionCounter < maxRecursionCalls) {
        this.setRandomWord();
      } else {
        this.endGame();
        console.error('Words ends!!! Add moar words!');
      }

    } else {
      this.innerProps.recursionCounter = 0;
      this.setState({ activeWord: word});
    }
  }

  isWordAnswered(word) {
    return this.props.answeredWords.includes(word);
  }

  setWordAsAnswered(word) {
    this.props.onAnswerWord(word);
  }

  timer() {
    let interval = 1000;
    let progressFragment = 100 / this.innerProps.timeToRound;

    let gameInterval = setInterval(() => {
      let newProgress = parseFloat((this.state.progress + progressFragment).toFixed(2));

      this.setState({ progress: newProgress});

      if (newProgress >= 100) {
        clearInterval(gameInterval);
        this.endGame();
      }
    }, interval);
  }

  endGame() {
    this.setState({ gameEnds: true });
    this.props.onEnd(this.state.points, this.props.match.params.teamIndex);
    this.props.history.push('/results');
  }

  componentDidMount() {
    this.timer();
    this.setRandomWord();
  }

  render() {
    const { progress, gameEnds, activeWord } = this.state;

    return (
      <section className="game">
        <div className="game__counter" style={{'width': progress + '%'}}></div>
        <div className="word">
          <div className="word__inner">
            <span>{activeWord}</span>
          </div>
          <div className="word__buttons">
            <button type="button" className="word__pass-button" disabled={gameEnds} onClick={this.onPassClick}>Пас...</button>
            <button type="button" className="word__next-button" disabled={gameEnds} onClick={this.onNextClick}>Дальше!</button>
          </div>
        </div>
      </section>
    );
  }
}

export default Game;
