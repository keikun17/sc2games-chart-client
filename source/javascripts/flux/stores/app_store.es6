import {createStore} from 'redux'
import formatDate from '../../libs/formatDate'
import getUrlParams from './../../libs/getUrlParams'

var initial_state  = {
  dates: {},
  recent_games: [],
  most_played: 0,

  longest_streak: 0,
  longest_streak_start: "",
  longest_streak_end: "",

  current_streak: 0,
  current_streak_start: "",
  current_streak_end: "",

  total_games: 0,
  today: "",
  last_year: "",

  player: {
    name: "",
    clan_tag: "",
    primary_race: ""
  }
}


var resetState = (state) => {
  state.most_played =  0
  state.current_streak = 0
  state.longest_streak = 0
  state.total_games = 0

  state.player = {
    name: "",
    clan_tag: "",
    primary_race: ""
  }

  state.today = ""
  state.last_year = ""

  // Reset the games history for the year
  var dates = {}
  var date_pointer =  new Date()
  date_pointer =  new Date( date_pointer.setDate( date_pointer.getDate() - 364 )  )
  for (var i=0 ; i < 365 ; i+=1) {
    // Generate all empty dates records

    var date = formatDate(date_pointer)

    dates[date] = { games: [] }
    date_pointer.setDate( date_pointer.getDate() + 1 )
  }

  state.dates = dates

  // Reset the recent matches
  state.recent_games = []
  for (var i=0 ; i < 25 ; i+=1) {
    // Generate 25 blank slots for match history
    state.recent_games.push({})
  }
}

var fetchNewPlayer = (state) => {
  resetState(state)
  var scriptEl = document.createElement('script');

  window.updateStateWithNewData = function(data) {
    state = this
    state.player.name = data.profile.name

    // handle requested data from server

    var most_played =  0

    var longest_streak = 0
    var longest_streak_start = ""
    var longest_streak_end = ""

    var current_streak = 0
    var current_streak_start = ""
    var current_streak_end = ""

    var total_games = 0
    var dates = state.dates
    var player = state.player
    var recent_games = state.recent_games

    player.name = data.profile.name
    player.primary_race = data.profile.primary_race
    player.clan_tag = data.profile.clan_tag

    for (let match of data.matches){

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

      // Skip If the box's date for some reason in the future, relative to the the current browser date
      if( (new Date(date)) > (new Date()) ) { continue }

      game_count = dates[date].games.length
      // Set the Current Streak
      if(game_count > 0) {
        console.log("streaking")
        current_streak += 1
        current_streak_end = date
      } else {
        console.log(`streak stopped on ${date}`)
        current_streak = 0
        current_streak_end = ""
      }

      // Set Longest Streak
      if(current_streak > longest_streak) {
        longest_streak = current_streak
        longest_streak_end = date
      }


      // Increment total games
      total_games = total_games + game_count

    }

    var tempdate = new Date()
    var today = tempdate.toDateString().slice(4)
    var last_year = (new Date(tempdate.setFullYear((tempdate.getFullYear() - 1)))).toDateString().slice(4)

    // Compute for Streak Dates
    if(longest_streak_end != "") {
      var temp_date = new Date(longest_streak_end)
      longest_streak_start = formatDate(new Date(temp_date.setDate(temp_date.getDate() - longest_streak)))
    }

    if(current_streak_end != "") {
      var temp_date = new Date(current_streak_end)
      current_streak_start = formatDate(new Date(temp_date.setDate(temp_date.getDate() - current_streak)))
    }

    state.dates = dates
    state.most_played = most_played
    state.longest_streak = longest_streak
    state.current_streak = current_streak
    state.total_games = total_games
    state.player = player
    state.recent_games = recent_games
    state.today = today
    state.last_year = last_year
    state.longest_streak_start = longest_streak_start
    state.longest_streak_end = longest_streak_end
    state.current_streak_start = current_streak_start
    state.current_streak_end = current_streak_end

    window.app_store.dispatch({type: "apply_changes"})
  }.bind(state)

  var region = getUrlParams('region', window.location)
  var player_id = getUrlParams('player_id', window.location)
  var r_id = getUrlParams('r_id', window.location)
  var player_name = getUrlParams('player_name', window.location)

  var profile_url = `https://afternoon-depths-7202.herokuapp.com/${region}/${player_id}/${r_id}/${player_name}?callback=updateStateWithNewData`
  // var profile_url = `http://10.126.45.139:3001/${region}/${player_id}/${r_id}/${player_name}?callback=updateStateWithNewData`
  console.log(`profile URL is ${profile_url}`)

  scriptEl.setAttribute( 'src', profile_url )
  document.body.appendChild(scriptEl);
}


var toggleDate = (state, date) => {
  if(state.date_selected === date) {
    delete state.date_selected
  } else {
    state.date_selected = date
  }

}

var appReducer = (state = initial_state, action) => {
  console.log("action is")
  console.log(action)
  switch(action.type) {
    case "@@redux/INIT":
      state = resetState(state)
      break
    case "urlUpdated":
      fetchNewPlayer(state)
      break
    case "toggleDate":
      toggleDate(state, action.date)
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
