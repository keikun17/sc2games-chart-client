import React from 'react'
import Box from './box'
import BnetFetcher from './bnet_fetcher'

import app_store from './../stores/app_store'
import getUrlParams from './../../libs/getUrlParams'

export default class App extends React.Component  {

  constructor(props) {
    super(props)
    this.state = app_store.getState()
  }

  componentWillMount() {
    app_store.subscribe(() =>{
      console.log("------------------")
      console.log("Change detected")
      this.setState(app_store.getState())
    })

    var region = getUrlParams('region', window.location)
    var r_id = getUrlParams('r_id', window.location)
    var player_id = getUrlParams('player_id', window.location)
    var player_name = getUrlParams('player_name', window.location)

    window.app_store = app_store
    app_store.dispatch({type: 'urlUpdated',
                       region: region,
                       r_id: r_id,
                       player_id: player_id,
                       player_name: player_name
    })
  }

  render() {
    console.log("Rendering")

    var boxes = []

    for (var date in this.state.dates){
      var games_played = this.state.dates[date].games.length

      boxes.push(<Box key={date} date={date} games_played={games_played} most_played={this.state.most_played}/>)
    }

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

    var clan_tag = ""
    if(this.state.player.clan_tag !== "") {
      clan_tag = `${this.state.player.clan_tag}`
    }

    if(this.state.player.name !== "") {
      var player_records = <div className="content">
          <profile-container>
            <avatar/>
            <playertag>
              <span className="card-name">{this.state.player.name}</span>
              <span className="card-clantag">{clan_tag}</span>
            </playertag>
            <mainrace>
            <span className="card-race">{this.state.player.primary_race}</span>
            </mainrace>
          </profile-container>

          <stats-container>
            <div className="summary">
              <statcards>
                <games_count>
                  <div className="section-title"> Games in the last year </div>
                  <div className="section-content">
                    <span className="stat-value">{this.state.total_games} games</span>
                    <span className="stat-daterange">{this.state.last_year} - {this.state.today}</span>
                  </div>
                </games_count>

                <games_count>
                  <div className="section-title">Longest Play Streak</div>
                  <div className="section-content">
                    <span className="stat-value">{this.state.longest_streak} days</span>
                    <span className="stat-daterange">{this.state.last_year} - {this.state.today}</span>
                  </div>
                </games_count>

                <games_count>
                  <div className="section-title">
                    Current Play Streak
                  </div>
                  <div className="section-content">
                    <span className="stat-value">{this.state.current_streak} days</span>
                    <span className="stat-daterange">{this.state.last_year} - {this.state.today}</span>
                  </div>
                </games_count>
              </statcards>
            </div>


            <grid>
              <div className="section-title">Games History </div>
              <div className="box-container">
                {boxes.reverse()}
              </div>
              <p className="grid-instructions">
              Hover on the green boxes to see how many custom / ladder games you played that day
              </p>
            </grid>

            <recentgames>
              <div className="games-history-heading"><h3>Last 20</h3></div>
              <ul>
                {recent_games.reverse()}
              </ul>
            </recentgames>



          </stats-container>
        </div>
     }

    return <div className="container">
      <header>
        <BnetFetcher />
      </header>
      {player_records}
    </div>
  }
}
