import React from 'react'

export default class BnetFetcher extends React.Component {
  constructor(props) {
    super(props)
    this.getProfileFromBnetUrl = this.getProfileFromBnetUrl.bind(this)
    this.handleBnetUrlChange = this.handleBnetUrlChange.bind(this)
    this.state = {
      bnet_url: ""
    }
  }


  handleBnetUrlChange(e) {
    this.setState({bnet_url: e.target.value})
  }

  getProfileFromBnetUrl(e) {
    e.preventDefault()
    this.getBnetAttributesFromUrl(this.state.bnet_url)
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

    console.log(attrs)
    return attrs
  }

  render() {
    return <form id="profile-search" onSubmit={this.getProfileFromBnetUrl}>
      <label htmlFor="bnet_url">Paste Battle.net URL here</label>
        <input id="bnet_url" name="bnet_url" type="text" value={this.state.bnet_url} onChange={this.handleBnetUrlChange} />
      <button>Go</button>
    </form>
  }
}



