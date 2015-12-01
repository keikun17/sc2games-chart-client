import React from 'react'
import Box from './box'
export default class App extends React.Component  {
  updateGrid(data) {
    // handle requested data from server

    var most_played =  0
    var current_streak = 0
    var longest_streak = 0
    var total_games = 0
    var dates = this.state.dates
    var player = this.state.player
    var recent_games = this.state.recent_games

    window.kek = this.state.dates


    player.name = data.profile.name
    player.primary_race = data.profile.primary_race
    player.clan_tag = data.profile.clan_tag

    for (let match of data.matches.reverse()){

      var date = this.formatDate(new Date(match.ms_date * 1000))

      // Game dates not included in the already-rendered grid locations should not be included
      if(typeof(dates[date]) === 'undefined'){ continue }

      dates[date].games.push(match)

      var game_count = dates[date].games.length

      // Set the Most played which should decide what color is assigned for each play-range
      if(game_count > most_played) {
        most_played = game_count
      }



      // shift match history
      var recent_game = {
        date: date,
        map: match.map,
        decision: match.decision,
        game_type: match.game_type
      }

      recent_games.push(recent_game)
      recent_games.shift()

    }


    // Compute for Streaks
    for ( var date in dates ) {
      game_count = dates[date].games.length
      // Set the Current Streak
      if(game_count > 0) {
        current_streak += 1
      } else {
        current_streak = 0
      }

      // Set Longest Streak
      if(current_streak > longest_streak) {
        longest_streak = current_streak
      }

      // Increment total games
      total_games = total_games + game_count

    }

    var tempdate = new Date()
    // var today = formatDate(tempdate)
    var today = tempdate.toDateString().slice(4)
    // var last_year = formatDate(new Date(tempdate.setFullYear((tempdate.getFullYear() - 1))))
    var last_year = (new Date(tempdate.setFullYear((tempdate.getFullYear() - 1)))).toDateString().slice(4)

    this.setState({
      dates: dates,
      most_played: most_played,
      longest_streak: longest_streak,
      current_streak: current_streak,
      total_games: total_games,
      player: player,
      recent_games: recent_games,
      today: today,
      last_year: last_year
    })
  }

  componentDidMount() {
    var scriptEl = document.createElement('script');
    var _this = this
    window.updateGrid = this.updateGrid.bind(_this)

    var gup  = ( name, url ) => {
      if (!url) url = location.href;
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
    }

    var region = gup('region', window.location)
    var player_id = gup('player_id', window.location)
    var player_name = gup('player_name', window.location)

    scriptEl.setAttribute(
      'src',
      // `http://10.126.45.140:3001/${region}/${player_id}/${player_name}?callback=updateGrid`
      `https://afternoon-depths-7202.herokuapp.com/${region}/${player_id}/${player_name}?callback=updateGrid`
    )
    document.body.appendChild(scriptEl);
  }


  formatDate(date) {
    var year    = date.getFullYear()
    var month   = '' + (date.getMonth()+1)
    if (month.length < 2) month = '0' + month;
    var day     = date.getDate()
    var date = [year, month, day].join('-')

    return date
  }

  constructor(props) {
    super(props)
    var date_pointer =  new Date()
    var dates = {}
    var most_played =  0
    var current_streak = 0
    var longest_streak = 0
    var total_games = 0
    var recent_games = []
    var player = {
      name: "Loading",
      clan_tag: "",
      primary_race: ""
    }
    var today = ""
    var last_year = ""

    var formatDate = this.formatDate.bind(this)
    window.formatDate = this.formatDate

    // Generate all the dates for the year
    for (var i=0 ; i < 365 ; i+=1) {

      var date = this.formatDate(date_pointer)

      dates[date] = { games: [] }
      date_pointer.setDate( date_pointer.getDate() - 1 )
    }

    // Generate 25 slots for match history
    for (var i=0 ; i < 25 ; i+=1) {
      recent_games.push({})
    }

    this.state = {
      dates: dates,
      recent_games: recent_games,
      most_played: most_played,
      longest_streak: longest_streak,
      current_streak: current_streak,
      total_games: total_games,
      player: player,
      today: today,
      last_year: last_year
    }
  }

  render() {
    var boxes = []

    for (var date in this.state.dates){
      var games_played = this.state.dates[date].games.length

      boxes.push(<Box key={date} date={date} games_played={games_played} most_played={this.state.most_played}/>)
    }

    var recent_games = []
    for (var recent_game of this.state.recent_games) {
      if(typeof(recent_game.map) != 'undefined') {
        recent_games.push(
          <li> {recent_game.date} - {recent_game.game_type} - {recent_game.map} ({recent_game.decision}) </li>
        )
      }
    }

    var clan_tag = ""
    if(this.state.player.clan_tag !== "") {
      clan_tag = `${this.state.player.clan_tag}`
    }

    return <div className="content">
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
}
