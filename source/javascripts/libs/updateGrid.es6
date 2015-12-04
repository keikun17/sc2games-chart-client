var updateGrid = (data) => {
  // handle requested data from server

  var most_played =  0
  var current_streak = 0
  var longest_streak = 0
  var total_games = 0
  var dates = this.state.dates
  var player = this.state.player
  var recent_games = this.state.recent_games

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
  var today = tempdate.toDateString().slice(4)
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
