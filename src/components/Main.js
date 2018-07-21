import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/main.css';

class Main extends Component {
  render() {
    let { lastTeamIndex, teams, haveWinner, isNewGame } = this.props;
    let nextTeamIndex = (!!teams[lastTeamIndex + 1]) ? lastTeamIndex + 1 : 0;
    let nextTeamName = teams[nextTeamIndex].name;
    let toGameButtonLabel = (isNewGame || haveWinner) ? 'Начать новую игру' : `Играть за ${nextTeamName}` ;

    return (
      <section className="main">
        <h1>Alias</h1>
        <Link to={'/game/' + nextTeamIndex} className="button">{toGameButtonLabel}</Link>
        {isNewGame && <Link to="/teams" className="button">Редактировать команды</Link>}
        {!isNewGame && <Link to="/results" className="button">Результаты</Link>}
      </section>
    );
  }
};

export default Main;
