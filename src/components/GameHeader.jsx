import React from 'react'

const GameHeader = ({score,move,onReset}) => {
  return (
    <div className='game-header'>
        <h1>Memory game</h1>
        <div className="stats">
          <div className="statsitem">
            <span className='stat-label'>Score:</span>{""}
            <span className='stat-value'>{score}</span>
          </div>
          <div className="statsitem">
            <span className='stat-label'>Move:</span>{""}
            <span className='stat-value'>{move}</span>
          </div>
        </div>
        <button className="reset-btn" onClick={onReset}>New Game</button>
    </div>
  )
}

export default GameHeader
