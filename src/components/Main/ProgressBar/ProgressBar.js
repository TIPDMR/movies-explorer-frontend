import React from 'react';

const ProgressBar = () => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__grid">
        <span className="progress-bar__scale progress-bar__scale_completed">1 неделя</span>
        <span className="progress-bar__scale progress-bar__scale_remaining">4 недели</span>
      </div>
      <div className="progress-bar__grid progress-bar__grid_labels">
        <span className="progress-bar__label">Back-end</span>
        <span className="progress-bar__label">Front-end</span>
      </div>
    </div>

  );
};

export default ProgressBar;
