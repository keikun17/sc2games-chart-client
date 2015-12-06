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
    console.log(this.state.bnet_url)
  }

  render() {
    return <form id="profile-search" onSubmit={this.getProfileFromBnetUrl}>
      <label htmlFor="bnet_url">Paste Battle.net URL here</label>
        <input id="bnet_url" name="bnet_url" type="text" value={this.state.bnet_url} onChange={this.handleBnetUrlChange} />
      <button>Go</button>
    </form>
  }
}



