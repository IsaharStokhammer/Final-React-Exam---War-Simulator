import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../store/store';
import { fetchCandidates } from '../store/features/CandidateSlice';
import Candidate from '../components/Candidate';
import { useLocation, useNavigate } from "react-router-dom";
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

type CallbackResponse = { status: string };
type Message = string | Record<string, any>;





const VotePage = () => {
  useEffect(() => {
  
  const socket = io(SERVER_URL);
  
  //send hello
  socket.emit("helloF", "Hello from the front end!");
  
  //get hello
  socket.on("helloB",(message)=>{
    console.log(message)
  });
  
  
  //sendVote
  // socket.on("newVote", )
  },[])
  const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const { error, status, candidates } = useSelector(
        (state: RootState) => state.candidates
    );
    
    useEffect(() => {
        if (status === "idle") {
      dispatch(fetchCandidates());
    }
}, [dispatch, status]);

return (
    <div>
        
      {user && <h3>Welcome, {user.userName}</h3>} 
      {user?.isAdmin == true && <button onClick={()=>{navigate("/statistics")}}>statistics</button>}
      {status === "pending" && <p>Loading candidates...</p>}
      {status === "rejected" && <p>Error: {error}</p>}
      {status === "fulfilled"   && candidates?.map((candidate) => (
        <Candidate key={candidate._id} candidate={candidate} />
      ))}
    </div>
  );
}

export default VotePage;
