import React from 'react';
import './SummaryCard.css';

const SummaryCard = ({ title, count, icon: Icon, colorClass }) => {
    return (
        <div className={`summary-card ${colorClass}`}>
            <div className="summary-header">
                <div className={`summary-icon-wrapper ${colorClass}`}>
                    {Icon && <Icon size={24} />}
                </div>
                <div className="summary-decoration"></div>
            </div>
            <div className="summary-content">
                <span className="summary-title">{title}</span>
                <span className="summary-count">{count}</span>
            </div>
        </div>
    );
};

export default SummaryCard;
