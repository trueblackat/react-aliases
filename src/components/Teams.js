import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import teamNames from '../data/teamNames';
import '../stylesheets/teams.css';

class Teams extends Component {
  constructor(props) {
    super(props);

    this.innerProps = {
      recursionCounter: 0
    }

    this.addTeam = this.addTeam.bind(this);
  }

  getRandomTeamName() {
    // TODO: иногда работает не правильно, разобраться
    let name = teamNames[Math.floor(Math.random() * (teamNames.length - 1))];
    let names = [];
    let maxRecursionCalls = 100;

    for (var i = 0; i < this.props.teams.length; i++) {
      names.push(this.props.teams[i].name);
    }

    if (names.includes(name)) {
      this.innerProps.recursionCounter++;

      if (this.innerProps.recursionCounter < maxRecursionCalls) {
        this.getRandomTeamName();
      } else {
        console.error('Add moar team names!');
      }
    } else {
      this.innerProps.recursionCounter = 0;
      return name;
    }

  }

  addTeam() {
    let name = this.getRandomTeamName();
    let team = {
      id: this.props.teams.length,
      name,
      points: 0
    };

    this.props.onAddTeam(team);
  }

  render() {
    let { teams } = this.props;

    return (
      <section className="teams">
        <h1>Команды</h1>
        <div className="teams__items">
          {teams.map((team) => {
            return (<div key={team.id} className="item">{team.name}</div>);
          })}
        </div>
        <Link className="button" to="/">На главный экран</Link>
        <button className="button" onClick={this.addTeam}>Добавить команду</button>
      </section>
    );
  }
}

export default Teams;
