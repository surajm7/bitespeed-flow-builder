'use client'; // Next.js client component directive

import React from 'react';
import NodeSelector from './NodeSelector';
import TextNodeEditor from './editors/TextNodeEditor';

/**
 * Sidebar panel that switches between node selector and node editor views
 * 
 * @param {Object} props - Component properties
 * @param {Object|null} props.selectedNode - Currently selected node data
 * @param {Function} props.updateSelectedNode - Callback for node updates
 * @param {Function} props.cancelSelection - Callback to deselect node
 * @returns {JSX.Element} Dynamic sidebar content based on selection state
 */
export default function NodePanelSidebar({selectedNode, updateSelectedNode, cancelSelection}) {
  return (
    <div>
      {selectedNode && selectedNode.type === 'text' ? (
        // Show editor when a text node is selected
        <TextNodeEditor
          cancelSelection={cancelSelection}
          selectedNode={selectedNode}
          updateSelectedNode={updateSelectedNode}
        />
      ) : (
        // Show node selector by default
        <div className="p-4">
          <NodeSelector />
        </div>
      )}
    </div>
  );
}