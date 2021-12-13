import React from 'react';
import findAllSolutions from './solver.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import SummaryResults from './SummaryResults.js';
import ToggleGameState from './ToggleGameState.js';
import logo from './logo.png';
import './App.css';

function boggle_App() {

  return (
    <div className="boggle_App">
        <img src={logo}  width="25%" height="25%" class="logo" alt="Bison Boggle Logo" /> 
        <ToggleGameState/>
      
        <div>
          <Board board = {grid} />
          
          <GuessInput
           allSolutions={allSolutions}
           foundSolutions={foundSolutions}
           correctAnswerCallback={(answer) =>        
           correctAnswerFound(answer)}/>
          
          <FoundSolutions />
        </div>
        <div>
          <Board board = {grid} />
          
          <SummaryResults />
          
          <FoundSolutions />
        </div>
    </div>
  );
}

export default boggle_App;
