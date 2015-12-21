import React from 'react'
import app_store from './../stores/app_store'

export default class MatchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = app_store.getState()
  }

  render() {
    // TODO: DELETE
    window.kek = this.state

    var matches = []

    if(this.state.date_selected) {
      console.log("There is a date")
      for(var game of this.state.dates[this.state.date_selected].games) {
        console.log("game is")
        console.log(game)
        if(typeof(game.map) != 'undefined') {
          matches.push(
            <li key={this.state.dates[this.state.date_selected].games.indexOf(game)}>
              {this.state.date_selected} - {game.game_type} - {game.map} ({game.decision})
            </li>
          )
        }
      }
    } else {

      for (var recent_game of this.state.recent_games) {
        if(typeof(recent_game.map) != 'undefined') {
          matches.push(
            <li key={this.state.recent_games.indexOf(recent_game)}>
              {recent_game.date} - {recent_game.game_type} - {recent_game.map} ({recent_game.decision})
            </li>
          )
        }
      }
    }

    return <recentgames>
      <div className="games-history-heading"><h3>Last 20</h3></div>
      <ul>
        {matches.reverse()}
      </ul>
    </recentgames>
  }
}
