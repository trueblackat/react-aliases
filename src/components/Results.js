import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/results.css';

class Results extends Component {
  constructor(props) {
    super(props);

    this.nextTeamIndex = (!!this.props.teams[this.props.lastTeamIndex + 1]) ? this.props.lastTeamIndex + 1 : 0;

    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.props.history.push('/game/' + this.nextTeamIndex);
  }

  render() {
    let { teams } = this.props;

    return (
      <section className="results">
        <h1>Результаты:</h1>
        <div className="results__items">
          {teams.map((item) => {
            return (
              <div key={item.id} className="item">
                <span className="team-name">{item.name}</span>
                <span className="team-score">{item.points}</span>
              </div>
            );
          })}
        </div>
        <Link to="/" className="button">На главный экран</Link>
        <button className="button" onClick={this.startGame}>Играть за {teams[this.nextTeamIndex].name}</button>
      </section>
    );
  }
}

export default Results;
