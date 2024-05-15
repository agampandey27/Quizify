import React from 'react'
import Questions from '../Components/QuizCom/Questions'
import Times from '../Components/Timer/Timer'
import { Timer } from '@mui/icons-material'

function Quiz() {
  return (
    <div className='container'>
      <Questions />
      <div className='flex'>
      <Timer className='m-2'/><Times duration={80}/></div>
    </div>
  )
}

export default Quiz
