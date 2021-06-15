import React from 'react'
// import styles from './App.module.scss'
import Header from './components/header/Header';

const App: React.FC = () => {
  const styles = {
    'color': 'aqua'
  }

  const root = {
    'backgroundColor': '#ffd5c9',
    'height': '100vh',
    'width': '100vw',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
  }

  const wrapper = {
    'backgroundColor': '#f1f2f7',
    'height': '70vh',
    'width': '70vw',
    'padding': '10px 40px'
  }
  return (
    <div style={root}>
      <div style={wrapper}>
        <Header />
      </div>
    </div>
  )
}

export default App
