import React from 'react'
import ReactDOM from 'react-dom'

import './assets/scss/main.scss'

const target = document.getElementById('root')

const Main = () => {
  return (
    <div className="test__scss">
      <div>Start from main.js!</div>

      <button type="button">Press me</button>
    </div>
  )
}

ReactDOM.render(<Main />, target)
