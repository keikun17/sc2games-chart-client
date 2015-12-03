import {createStore} from 'redux'

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


var formatDate = (date) => {
  var year    = date.getFullYear()
  var month   = '' + (date.getMonth()+1)
  if (month.length < 2) month = '0' + month;
  var day     = date.getDate()
  var date = [year, month, day].join('-')

  return date
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

var appReducer = (state = initial_state, action) => {
  console.log("initial states are")
  console.log(initial_state)
  console.log("passed in state is")
  console.log(state)
  console.log("action is")
  console.log(action)
  switch(action.type) {
    case "@@redux/INIT":
      state = initializeState(state)
      break
    case "urlUpdated":
      state = {}
      break
    default:
      console.log(`action.type not recognized : ${action.type}`)
  }

  return state
}

let store = createStore(appReducer)

export default store
