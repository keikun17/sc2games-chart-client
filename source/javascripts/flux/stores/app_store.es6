import {createStore} from 'redux'
import formatDate from '../../libs/formatDate'
import getUrlParams from './../../libs/getUrlParams'

var initial_state  = {
  dates: {},
  recent_games: [],
  most_played: 0,
  longest_streak: 0,
  current_streak: 0,
  total_games: 0,
  today: "",
  last_year: "",

  player: {
    name: "- Not Loading -",
    clan_tag: "",
    primary_race: ""
  }
}


var initializeState = (state) => {
  // var region = action.region
  // var player_id = action.player_id
  // var player_name = action.player_name
  var region = ""
  var player_id = ""
  var player_name = ""

  var most_played =  state.most_played
  var current_streak = state.curremt_streak
  var longest_streak = state.longest_streak
  var total_games = state.total_games
  var dates = state.dates
  var player = {
    name: "Loading",
    clan_tag: "",
    primary_race: ""
  }
  var recent_games = state.recent_games
  var today = ""
  var last_year = ""

  var date_pointer =  new Date()
  // Generate all the dates for the year
  for (var i=0 ; i < 365 ; i+=1) {

    var date = formatDate(date_pointer)

    dates[date] = { games: [] }
    date_pointer.setDate( date_pointer.getDate() - 1 )
  }

  // Generate 25 slots for match history
  for (var i=0 ; i < 25 ; i+=1) {
    recent_games.push({})
  }

  return state = {
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

var fetchNewPlayer = (state) => {
  console.log("fetchNewPlayer called")
  var scriptEl = document.createElement('script');

  window.updateStateWithNewData = function(data) {
    state = this
    state.player.name = data.profile.name

    // handle requested data from server

    var most_played =  0
    var current_streak = 0
    var longest_streak = 0
    var total_games = 0
    var dates = state.dates
    var player = state.player
    var recent_games = state.recent_games

    player.name = data.profile.name
    player.primary_race = data.profile.primary_race
    player.clan_tag = data.profile.clan_tag

    for (let match of data.matches.reverse()){

      var date = formatDate(new Date(match.ms_date * 1000))

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

    state = {
      dates: dates,
      most_played: most_played,
      longest_streak: longest_streak,
      current_streak: current_streak,
      total_games: total_games,
      player: player,
      recent_games: recent_games,
      today: today,
      last_year: last_year
    }
    window.app_store.dispatch({type: "apply_changes"})
  }.bind(state)

  var region = getUrlParams('region', window.location)
  var player_id = getUrlParams('player_id', window.location)
  var player_name = getUrlParams('player_name', window.location)

  scriptEl.setAttribute(
    'src',
    // `http://10.126.45.140:3001/${region}/${player_id}/${player_name}?callback=updateGrid`
    // `https://afternoon-depths-7202.herokuapp.com/${region}/${player_id}/${player_name}?callback=updateGrid`
    `https://afternoon-depths-7202.herokuapp.com/${region}/${player_id}/${player_name}?callback=updateStateWithNewData`
  )
  document.body.appendChild(scriptEl);
}


var appReducer = (state = initial_state, action) => {
  console.log("action is")
  console.log(action)
  switch(action.type) {
    case "@@redux/INIT":
      state = initializeState(state)
      break
    case "urlUpdated":
      fetchNewPlayer(state)
      break
    case "apply_changes":
      // NOTE : Blank action. Subscribed components are only rendered when
      // an action has been dispatched. Call this action if you wish to apply
      // the changes to the state
      break
    default:
      console.log(`action.type not recognized : ${action.type}`)
  }

  return state
}

let store = createStore(appReducer)

export default store
