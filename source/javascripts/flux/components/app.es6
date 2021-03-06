import React from 'react'
import Router from 'react-router'
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Box from './box'
import MatchList from './match_list'

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

      boxes.push(<Box date_selected={this.state.date_selected} most_played_date={this.state.most_played_date} key={date} date={date} games_played={games_played} most_played={this.state.most_played}/>)
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
                    <span className="stat-daterange">{this.state.longest_streak_start} - {this.state.longest_streak_end}</span>
                  </div>
                </games_count>

                <games_count>
                  <div className="section-title">
                    Current Play Streak
                  </div>
                  <div className="section-content">
                    <span className="stat-value">{this.state.current_streak} days</span>
                    <span className="stat-daterange">{this.state.current_streak_start} - {this.state.current_streak_end}</span>
                  </div>
                </games_count>
              </statcards>
            </div>


            <grid>
              <div className="section-title">Games History </div>
              <div className="box-container">
                {boxes}
              </div>
              <p className="grid-instructions">
              Hover on the green boxes to see how many custom / ladder games you played that day
              </p>
            </grid>

            <MatchList date_selected={this.state.date_selected} dates={this.state.dates} recent_games={this.state.recent_games}/ >

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
