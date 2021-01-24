import React from 'react'
import ReactDOM from 'react-dom'

import './assets/scss/main.scss'
import Root from './components/root'

const target = document.getElementById('root')

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    target,
  )
}

render(Root)
