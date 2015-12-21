import React from 'react'
import app_store from './../stores/app_store'

export default class MatchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = app_store.getState()
  }

  render() {
    var recent_games = []
    for (var recent_game of this.state.recent_games) {
      if(typeof(recent_game.map) != 'undefined') {
        recent_games.push(
          <li key={this.state.recent_games.indexOf(recent_game)}>
            {recent_game.date} - {recent_game.game_type} - {recent_game.map} ({recent_game.decision})
          </li>
        )
      }
    }

    return <recentgames>
      <div className="games-history-heading"><h3>Last 20</h3></div>
      <ul>
        {recent_games.reverse()}
      </ul>
    </recentgames>
  }
}
