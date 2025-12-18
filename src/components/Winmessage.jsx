import React from 'react'

const Winmessage = ({move}) => {
  return (
    <div className='win-message'>
      <h1>Congratulation</h1>
      <p>You completed the game in {move} moves!</p>
    </div>
  )
}

export default Winmessage
