import React from 'react'

import { Jumbotron } from 'react-bootstrap'

const styles = Object.create({
  wrapper: {
    fontFamily: 'Avenir',
    padding: 60,
    backgroundColor: 'pink'
  }
})

const App = React.createClass({
  displayName: 'wallpul.se',

  render () {
    return (
      <div>
        <Jumbotron style={styles.wrapper}>
          <h1>wallpul.se</h1>
          <p>we are currently kickin it hard to launch wallpul.se</p>
          <p>follow <a href='//twitter.com/wallpulseapp'>@wallpulseapp</a> on twitter for updates</p>
        </Jumbotron>
      </div>
    )
  }
})
React.render(<App />, document.getElementById('app'))
