import React from 'react';
import './SlidingPanel.css';

interface InstructionsProps {
  isOpen: boolean;
  togglePanel: () => void;
}

// Sliding panel to show instructions to how to use app. 
const Instructions: React.FC<InstructionsProps> = ({ isOpen, togglePanel }) => {
  return (
    // Close panel if open. 
    <div className={`sliding-panel ${isOpen ? 'open' : ''}`}>
      <button onClick={togglePanel} className="toggle-button">
        Close instructions
      </button>
      <div className="content">
        <h2>Ohjeistus</h2>
        {/* TODO: instructions go here */}
        <p>"Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      </div>
    </div>
  );
};

export default Instructions;