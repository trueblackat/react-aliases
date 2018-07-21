import React, { Component } from 'react';
import '../stylesheets/results.css';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      haveWinner: false
    }

    this.innerProps = {
      winPointsCount: 10,
      teams: this.props.teams,
      sounds: {
        win: new Audio('resourses/sounds/win.m4a')
      }
    }

    this.nextTeamIndex = (!!this.props.teams[this.props.lastTeamIndex + 1]) ? this.props.lastTeamIndex + 1 : 0;

    this.startGame = this.startGame.bind(this);
  }

  checkWinner() {
    let haveWinner = false;

    this.innerProps.teams.map((item) => {
      if (item.points >= this.innerProps.winPointsCount) {
        item.winner = true;
        haveWinner = true;
      }
    });

    if (haveWinner) {
      this.props.onHaveWinner();
      this.setState({ haveWinner });
    }
  }

  componentDidMount() {
    this.checkWinner();
  }

  startGame() {
    this.props.setActiveTeamIndex(this.nextTeamIndex);
    this.props.history.push('/game/' + this.nextTeamIndex);
  }

  render() {
    let itemClassName = 'item';
    let { restartGame } = this.props;

    return (
      <section className="results">
        <h1>Результаты:</h1>
        <div className="results__items">
          {this.innerProps.teams.map((item) => {
            if (item.winner) {
              itemClassName = 'winner item';
              this.innerProps.sounds.win.play();
            } else {
              itemClassName = 'item';
            }

            return (
              <div key={item.id} className={itemClassName}>
                <span className="team-name">{item.name}</span>
                <span className="team-score">{item.points}</span>
              </div>
            );
          })}
        </div>
        <button className="button" onClick={restartGame}>Начать новую игру</button>
        {!this.state.haveWinner && <button className="button" onClick={this.startGame}>Играть за {this.innerProps.teams[this.nextTeamIndex].name}</button>}
      </section>
    );
  }
}

export default Results;
