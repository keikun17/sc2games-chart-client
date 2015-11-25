import React from 'react'
import Box from './box'
export default class App extends React.Component  {
  updateGrid(data) {
    // handle requested data from server
    console.log("KEK HANDLED DATA}")
    console.log(data)

    var most_played =  0
    var current_streak = 0
    var longest_streak = 0
    var total_games = 0
    var player_games = {}
    var dates = this.state.dates


    for (var game_date in data.matches){
      window.game_date = game_date


      // Handle dates existing in the server that is not in the grid
      if(typeof(dates[game_date]) === 'undefined'){
        dates[game_date] = {games: []}
      }

      dates[game_date].games = data.matches[game_date]
      var game_count = dates[game_date].games.length

      // Set the Most played which should decide what color is assigned for each play-range
      if(game_count > most_played) {
        most_played = game_count
      }

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

    window.dates = this.state.dates
    this.setState({
      dates: dates,
      most_played: most_played,
      longest_streak: longest_streak,
      current_streak: current_streak,
      total_games: total_games,
    })
  }

  componentDidMount() {
    console.log("I SHOULD ONLE BE MOUNTED ONCE")

    var scriptEl = document.createElement('script');
    var _this = this
    window.updateGrid = this.updateGrid.bind(_this)

    scriptEl.setAttribute(
      'src',
      // 'http://10.126.45.140:3001/us/2143215/PlayerOne?callback=updateGrid'
      'http://localhost:3001/us/2134322/LeesOo?callback=updateGrid'
    )
    document.body.appendChild(scriptEl);
  }

  constructor(props) {
    super(props)
    var date_pointer =  new Date()
    var dates = {}
    var most_played =  0
    var current_streak = 0
    var longest_streak = 0
    var total_games = 0

    var player_games = {}

    for (var i=0 ; i < 365 ; i+=1) {

      // Generate all the dates for the year
      var year    = date_pointer.getFullYear()
      var month   = date_pointer.getMonth()+1
      var day     = date_pointer.getDate()
      var date = [year, month, day].join('-')
      dates[date] = { games: [] }
      date_pointer.setDate( date_pointer.getDate() - 1 )
    }

    this.state = {
      dates: dates,
      most_played: most_played,
      longest_streak: longest_streak,
      current_streak: current_streak,
      total_games: total_games,
    }
  }

  render() {
    console.log("RENDERING STATE")
    console.log(this.state)

    var boxes = []

    for (var date in this.state.dates){
      var games_played = this.state.dates[date].games.length

      boxes.push(<Box key={date} date={date} games_played={games_played} most_played={this.state.most_played}/>)
    }

    return <div className="content">
      <profile-container>
        <avatar/>
        <playertag>
          <h1>Buddy Magsipoc</h1>
        </playertag>
        <mainrace>
        <h2>Protoss</h2>
        </mainrace>
      </profile-container>

      <stats-container>
        <div className="summary">
          <miscstats>
            <games_count>
              <div className="section-title"> Games in the last year </div>
              <div className="section-content">
                <span className="stat-value">{this.state.total_games} games</span>
                <p>Nov 17, 2014 - Nov 17, 2015</p>
              </div>
            </games_count>

            <games_count>
              <div className="section-title">Longest Streak</div>
              <div className="section-content">
                <span className="stat-value">{this.state.longest_streak} days</span>
                <p>Nov 17, 2014 - Nov 17, 2015</p>
              </div>
            </games_count>

            <games_streak>
              <div className="section-title">
                Current Play Streak
              </div>
              <div className="section-content">
                <span className="stat-value">{this.state.current_streak} days</span>
                <p>Nov 17, 2014 - Nov 17, 2015</p>
              </div>
            </games_streak>
          </miscstats>
        </div>


        <grid>
          <div className="section-title">Games History </div>
          <div className="box-container">
            {boxes.reverse()}
          </div>
        </grid>

        <recentgames>
          <div className="games-history-heading"><h3>Last 20</h3></div>
          <ul>
            <li>1v1 Lost Temple (WIN)</li>
            <li>1v1 Lost Temple (LOSS)</li>
            <li>1v1 Lost Temple (WIN)</li>
            <li>1v1 Lost Temple (WIN)</li>
            <li>1v1 Lost Temple (WIN)</li>
            <li>1v1 Lost Temple (WIN)</li>
            <li>1v1 lost temple (win)</li>
            <li>1v1 lost temple (win)</li>
            <li>1v1 Lost Temple (WIN)</li>
            <li>1v1 Lost Temple (LOSS)</li>
            <li>1v1 Lost Temple (LOSS)</li>
            <li>1v1 Lost Temple (WIN)</li>
            <li>1v1 Lost Temple (WIN)</li>
            <li>1v1 Lost Temple (WIN)</li>
            <li>1v1 Lost Temple (WIN)</li>
          </ul>
        </recentgames>



      </stats-container>
    </div>
  }
}
