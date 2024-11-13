import React, { FC } from 'react'
import { CandidateInterface } from '../types'
import "./Candidate.css"

interface candidateProps {
    candidate:CandidateInterface
}

const Candidate:FC<candidateProps> = ({candidate}) => {
  return (

    <div>
       <div className='candidate'>
        <img  className = "image" src={candidate.image}  />
        <p>{candidate.name }  {candidate.votes}</p>
        <button>vote</button>
      
       </div>
    </div>
  )
}

export default Candidate