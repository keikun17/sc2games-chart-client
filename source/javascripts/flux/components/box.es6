import React from 'react'

export default class Box extends React.Component {
  constructor(props) {
    super(props)
    this._onMouseOver = this._onMouseOver.bind(this)
    this._onMouseOut = this._onMouseOut.bind(this)
    this.state = {
      show_tootltip: false
    }
  }

  _onMouseOver() {
    console.log("OVER")
    this.setState({show_tooltip: true})
  }
  _onMouseOut() {
    console.log("OUT")
    this.setState({show_tooltip: false})
  }

  render() {
    var most_played = this.props.most_played
    var games_played = this.props.games_played
    var classname

    var l1_max = most_played / 4
    var l2_max = l1_max * 2
    var l3_max = l1_max * 3

    if( 1 <= games_played && games_played <= l1_max ) {
      classname = 'l1'
    }

    if( l1_max <= games_played && games_played <= l2_max ) {
      classname = 'l2'
    }

    if( l2_max <= games_played && games_played <= l3_max ) {
      classname = 'l3'
    }

    if( l3_max <= games_played && games_played <= most_played ) {
      classname = 'l4'
    }

    if(games_played === 0) {
      classname = 'none'
    }

    var tooltip

    if(this.state.show_tooltip === true){
      tooltip = <box_details>Played {this.props.games_played} games on <box_date>{this.props.date}</box_date></box_details>
    }
    return  <box className={classname} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
      {tooltip}
    </box>
  }
}
