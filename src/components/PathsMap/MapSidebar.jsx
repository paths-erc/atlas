import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MapSidebar.css';

export default function MapSidebar({ tabs, activeTab, collapsed, onTabClick }) {
  const active = tabs.find(t => t.id === activeTab);

  return (
    <div className="map-sidebar">
      <div className="sidebar-tabs-col">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`sidebar-tab-btn${activeTab === tab.id && !collapsed ? ' active' : ''}`}
            onClick={() => onTabClick(tab.id)}
            title={tab.header}
          >
            {tab.icon}
          </button>
        ))}
        <button
          className="sidebar-tab-btn sidebar-collapse-btn"
          onClick={() => onTabClick(null)}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <FontAwesomeIcon icon={collapsed ? 'caret-right' : 'caret-left'} />
        </button>
      </div>

      <div className={`sidebar-panel${collapsed ? ' sidebar-panel--hidden' : ''}`}>
        {active && (
          <>
            <div className="sidebar-panel-header">
              {active.icon}&nbsp;<span>{active.header}</span>
            </div>
            <div className="sidebar-panel-body">
              {active.content}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
