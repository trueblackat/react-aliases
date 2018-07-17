import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/main.css';

class Main extends Component {
  render() {
    let { lastTeamIndex, teams } = this.props;
    let nextTeamIndex = (!!teams[lastTeamIndex + 1]) ? lastTeamIndex + 1 : 0;
    let nextTeamName = teams[nextTeamIndex].name;

    return (
      <section className="main">
        <h1>Alias</h1>
        <Link to={'/game/' + nextTeamIndex} className="button">Играть за {nextTeamName}</Link>
        <Link to="/teams" className="button">Редактировать команды</Link>
        <Link to="/results" className="button">Результаты</Link>
      </section>
    );
  }
};

export default Main;
