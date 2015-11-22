import React from 'react'
import Box from './box'
export default class App extends React.Component  {
  constructor(props) {
    super(props)
    var date_pointer =  new Date()
    var dates = {}
    var most_played =  0
    var current_streak = 0
    var longest_streak = 0
    var total_games = 0


    // Count games played per day, since last year
    // Record the most games played
    for (var i=0 ; i < 365 ; i+=1) {
      var year    = date_pointer.getFullYear()
      var month   = date_pointer.getMonth()+1
      var day     = date_pointer.getDate()

      var date = [year, month, day].join('-')

      // TODO : Replace with actual game count call
      // Generate game from 0 to 9
      var random_games_count = Math.floor( (Math.random()* 10 ) )
      var games = []

      for(var j=0; j < random_games_count ; j+=1) {
        games.push('Lost Temple 1v1 (Win)')
      }

      dates[date] = {games: games}

      var game_count = dates[date].games.length

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

      date_pointer.setDate( date_pointer.getDate() - 1 )
    }

    this.state = {
      dates: dates,
      most_played: most_played,
      longest_streak: longest_streak,
      current_streak: current_streak,
      total_games: total_games
    }
  }

  render() {

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
                <span className="stat-value">{this.state.total_games}</span>
                <p>Nov 17, 2014 - Nov 17, 2015</p>
              </div>
            </games_count>

            <games_count>
              <div className="section-title">Longest Streak</div>
              <div className="section-content">
                <span className="stat-value">{this.state.longest_streak}</span>
                <p>Nov 17, 2014 - Nov 17, 2015</p>
              </div>
            </games_count>

            <games_streak>
              <div className="section-title">
                Current Play Streak
              </div>
              <div className="section-content">
                <span className="stat-value">{this.state.current_streak}</span>
                <p>Nov 17, 2014 - Nov 17, 2015</p>
              </div>
            </games_streak>
          </miscstats>
        </div>


        <grid>
          <div className="section-title">Games History </div>
          <div className="box-container">
            {boxes}
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
