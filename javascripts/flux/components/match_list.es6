import React from 'react'

export default class MatchList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var matches = []
    var heading

    if(this.props.date_selected) {
      var heading = `Games played on ${this.props.date_selected}`

      for(var game of this.props.dates[this.props.date_selected].games) {
        if(typeof(game.map) != 'undefined') {
          matches.push(
            <li key={this.props.dates[this.props.date_selected].games.indexOf(game)}>
              {this.props.date_selected} - {game.game_type} - {game.map} ({game.decision})
            </li>
          )
        }
      }
    } else {
      console.log("THERE ARE NO DATES SELECTED")
      heading = "Last 25"

      for (var recent_game of this.props.recent_games) {
        if(typeof(recent_game.map) != 'undefined') {
          matches.push(
            <li key={this.props.recent_games.indexOf(recent_game)}>
              {recent_game.date} - {recent_game.game_type} - {recent_game.map} ({recent_game.decision})
            </li>
          )
        }
      }
    }

    return <recentgames>
      <div className="games-history-heading"><h3>{heading}</h3></div>
      <ul>
        {matches.reverse()}
      </ul>
    </recentgames>
  }
}
