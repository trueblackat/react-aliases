import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './components/Game'
import Teams from './components/Teams'
import Results from './components/Results'
import Main from './components/Main'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [
        {
          id: 0,
          name: 'Крошки',
          points: 0
        },
        {
          id: 1,
          name: 'Картошки',
          points: 0
        }
      ],
      activeTeamIndex: 0
    }

    this.saveResults = this.saveResults.bind(this);
    this.onAddTeam = this.onAddTeam.bind(this);
  }

  saveResults(points, teamIndex) {
    let teams = this.state.teams;

    teamIndex = parseInt(teamIndex, 10);

    teams[teamIndex].points += points;
    this.setState({ teams: teams });
    this.setState({ activeTeamIndex: teamIndex });
  }

  onAddTeam(team) {
    let teams = this.state.teams;
    teams.push(team);

    this.setState({ teams });
  }

  render() {
    let { teams, activeTeamIndex } = this.state;

    return (
      <Switch>
        <Route exact path='/' render={(props) => <Main {...props} lastTeamIndex={activeTeamIndex} teams={teams}/> } />
        <Route path='/teams' render={(props) => <Teams {...props} teams={teams} onAddTeam={this.onAddTeam} /> } />
        <Route path='/results' render={(props) => <Results {...props} teams={teams} lastTeamIndex={activeTeamIndex} /> } />
        <Route path='/game/:teamIndex' render={(props) => <Game {...props} setActiveTeamIndex={this.setActiveTeamIndex} onEnd={this.saveResults} teams={teams} /> } />
      </Switch>
    );
  }
}

export default App;
