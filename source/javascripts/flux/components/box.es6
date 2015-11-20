import React from 'react'

export default class Box extends React.Component {
  constructor(props) {
    super(props)
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

    return  <box className={classname} />
  }
}
