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
          name: 'Пестики',
          points: 0
        },
        {
          id: 1,
          name: 'Тычинки',
          points: 0
        }
      ],
      isNewGame: true,
      haveWinner: false,
      answeredWords: [],
      activeTeamIndex: 0
    }

    this.saveResults = this.saveResults.bind(this);
    this.onAddTeam = this.onAddTeam.bind(this);
    this.onAnswerWord = this.onAnswerWord.bind(this);
    this.onHaveWinner = this.onHaveWinner.bind(this);
    this.setActiveTeamIndex = this.setActiveTeamIndex.bind(this);
    this.restartGame = this.restartGame.bind(this);
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

  onAnswerWord(word) {
    let answeredWords = this.state.answeredWords;
    answeredWords.push(word);
    this.setIsNewGame(false);
    this.setState({ answeredWords });
  }

  onHaveWinner() {
    this.setState({ haveWinner: true });
  }

  restartGame() {
    window.location.href="/";
  }

  setActiveTeamIndex(index) {
    this.setState({ activeTeamIndex: index });
  }

  setIsNewGame(status) {
    this.setState({ isNewGame: status });
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={(props) => <Main {...props} lastTeamIndex={this.activeTeamIndex} teams={this.state.teams} isNewGame={this.state.isNewGame} haveWinner={this.state.haveWinner} /> } />
        <Route path='/teams' render={(props) => <Teams {...props} teams={this.state.teams} onAddTeam={this.onAddTeam} /> } />
        <Route path='/results' render={(props) => <Results {...props} teams={this.state.teams} lastTeamIndex={this.state.activeTeamIndex} onHaveWinner={this.onHaveWinner} setActiveTeamIndex={this.setActiveTeamIndex} restartGame={this.restartGame} /> } />
        <Route path='/game/:teamIndex' render={(props) => <Game {...props} activeTeamIndex={this.state.activeTeamIndex} onEnd={this.saveResults} onAnswerWord={this.onAnswerWord} answeredWords={this.state.answeredWords} teams={this.state.teams} /> } />
      </Switch>
    );
  }
}

export default App;
