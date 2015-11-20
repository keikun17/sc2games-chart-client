import React from 'react'
export default class App extends React.Component  {
  constructor(props) {
    super(props)
    var date_pointer =  new Date()
    var dates = []

    for (var i=0 ; i < 365 ; i+=1) {
      var year    = date_pointer.getFullYear()
      var month   = date_pointer.getMonth()+1
      var day     = date_pointer.getDate()
      dates.push([year, month, day].join('-'))
      date_pointer.setDate( date_pointer.getDate() - 1 )
    }

    this.state = {dates: dates}
  }

  render() {

    var box_classnames = ['l1', 'l2', 'l3', 'w1', 'w2', 'w3', 'none' ]
    var boxes = []

    for(var i = 0; i < 365; i++) {
      var random_classname = box_classnames[Math.floor(Math.random()*box_classnames.length)]
      boxes.push(<box className={random_classname} key={i+1}></box>)
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
                <span className="stat-value">513 total</span>
                <p>Nov 17, 2014 - Nov 17, 2015</p>
              </div>
            </games_count>

            <games_streak>
              <div className="section-title">
                Current Play Streak
              </div>
              <div className="section-content">
                <span className="stat-value">513 days</span>
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
