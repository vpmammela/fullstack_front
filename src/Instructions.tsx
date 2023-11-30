import React from 'react';
import styled from 'styled-components';
import './SlidingPanel.css';

interface InstructionsProps {
  isOpen: boolean;
  togglePanel: () => void;
}

// Styled component for bold text
const BoldText = styled.span`
  font-weight: bold;
`;

// Sliding panel to show instructions on how to use the app.
const Instructions: React.FC<InstructionsProps> = ({ isOpen, togglePanel }) => {
  return (
    // Close panel if open.
    <div className={`sliding-panel ${isOpen ? 'open' : ''}`}>
      <button onClick={togglePanel} className="toggle-button">
        Close instructions
      </button>
      <div className="content">
        <h2>Review instructions</h2>
        <br />
        {/* External links with shortened text. */}
        <p>
          <BoldText>
            <a href="https://lucit.sharepoint.com/:w:/r/sites/pilvi/_layouts/15/Doc.aspx?sourcedoc=%7B25E73C81-28CC-4911-9843-024E9E039061%7D&file=6S%20jatkuvat%20katselmoinnit.docx&action=default&mobileredirect=true" target="_blank" rel="noopener noreferrer">
              Continuous reviews
            </a>
          </BoldText>
          <br /><br />
          <BoldText>
            <a href="https://lucit.sharepoint.com/:w:/r/sites/pilvi/_layouts/15/Doc.aspx?sourcedoc=%7B891C1F7F-2E0F-425F-B759-AD175B340F3D%7D&file=6S%20lukukausi-%20ja%20vuosikatselmoinnit.docx&action=default&mobileredirect=true" target="_blank" rel="noopener noreferrer">
              Semester reviews
            </a>
          </BoldText>
          <br /><br />
          <BoldText>
            <a href="https://lucit.sharepoint.com/:w:/r/sites/pilvi/_layouts/15/Doc.aspx?sourcedoc=%7B811C930B-AE8F-4F9B-9082-A0492F5C0894%7D&file=6S%20toimintamallin%20ja%20johtamisen%20katselmoinnit.docx&action=default&mobileredirect=true" target="_blank" rel="noopener noreferrer">
              Management reviews
            </a>
          </BoldText>
          <br /><br />
          <BoldText>
            <a href="https://lucit.sharepoint.com/:w:/r/sites/pilvi/_layouts/15/Doc.aspx?sourcedoc=%7BC7667C66-7BC4-48DC-9F85-01C6F06065DA%7D&file=6S%20turvallisuuskatselmoinnit.docx&action=default&mobileredirect=true" target="_blank" rel="noopener noreferrer">
              Safety reviews
            </a>
          </BoldText>
        </p>
      </div>
    </div>
  );
};

export default Instructions;