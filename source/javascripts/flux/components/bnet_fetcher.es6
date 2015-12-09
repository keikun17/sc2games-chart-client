import React from 'react'
import AppStore from '../stores/app_store'

export default class BnetFetcher extends React.Component {
  constructor(props) {
    super(props)
    this.redirectToProfile = this.redirectToProfile.bind(this)
    this.handleBnetUrlChange = this.handleBnetUrlChange.bind(this)
    this.state = {
      bnet_url: ""
    }
  }


  handleBnetUrlChange(e) {
    var url = e.target.value
    if((url !== "") && (url.indexOf('http') === -1)){
      url = "https://" + url
    }
    this.setState({bnet_url: url})
  }

  redirectToProfile(e) {
    e.preventDefault()
    var profile = this.getBnetAttributesFromUrl(this.state.bnet_url)

    var region = profile.region
    var r_id = profile.r_id
    var player_id = profile.player_id
    var player_name = profile.player_name

    console.log("profile is")
    console.log(profile)



    // redirect to new page with the player details in the url as params
    window.location.search = `?region=${region}&player_id=${player_id}&r_id=${r_id}&player_name=${player_name}`
  }

  getBnetAttributesFromUrl(bnet_url){
    var parser = document.createElement('a')
    parser.href = bnet_url
    var pathnames = parser.pathname.split('/').filter(function(y){return(y != "")})
    // > ["sc2", "en", "profile", "2143215", "1", "PlayerOne"]

    // get region
    var region = parser.hostname.split('.')[0]

    // get player_id
    var player_id = pathnames[3]

    // get r_id =
    var r_id = pathnames[4]

    // get PlayerName
    var player_name = pathnames[5]

    // get player_digit

    // get player_name
    var attrs = {
      region: region,
      player_id: player_id,
      r_id: r_id,
      player_name: player_name,
    }

    return attrs
  }

  render() {
    return <form id="profile-search" onSubmit={this.redirectToProfile}>
      <label htmlFor="bnet_url">Paste Your Battle.net URL here</label>
      <div className="fields-container">
        <input id="bnet_url" name="bnet_url" type="text" value={this.state.bnet_url} onChange={this.handleBnetUrlChange} />
        <button>Go</button>
        <example>ex: "http://us.battle.net/sc2/en/profile/2143215/1/PlayerOne/"</example>
      </div>
    </form>
  }
}



