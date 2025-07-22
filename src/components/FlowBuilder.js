'use client';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactFlow, {
  Background,
  Controls,
  Position,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import NodePanelSidebar from './NodePanelSidebar';
import TextMessageNode from './nodes/TextMessageNode';
import CustomEdge from './edges/CustomEdge';
import Header from './Header';

// Define custom node and edge types for ReactFlow
const nodeTypes = {
  text: TextMessageNode, // Register our custom text node component
};
const edgeTypes = {
  'custom-edge': CustomEdge, // Register our custom edge component
};

// Simple ID generator (note: not production-ready)
let id = 1;
const getId = () => `${id++}`;

/**
 * Main FlowBuilder component - The core canvas for building node-based flows
 * Handles all node/edge operations, drag-and-drop, and flow validation
 */
export default function FlowBuilder() {
  // Refs and state management
  const reactFlowWrapper = useRef(null); // Reference to the ReactFlow wrapper div
  const [nodes, setNodes, onNodesChange] = useNodesState([]); // All nodes in the flow
  const [edges, setEdges, onEdgesChange] = useEdgesState([]); // All edges/connections
  const [reactFlowInstance, setReactFlowInstance] = useState(null); // ReactFlow instance reference
  const [selectedNode, setSelectedNode] = useState(null); // Currently selected node
  const [showSaveAnimation, setShowSaveAnimation] = useState(false); // Save success visual feedback

  /**
   * Handles connection creation between nodes
   * Enforces connection rules:
   * - One source can only connect to one target
   * - One target can have multiple sources
   */
  const onConnect = useCallback(
    params => {
      setEdges(eds => {
        const sourceAlreadyConnected = eds.some(e => e.source === params.source);
        const targetAlreadyConnected = eds.some(e => e.target === params.target);
        
        if (sourceAlreadyConnected) {
          alert('Source node is already connected to another node');
          return eds;
        }
        
        // Add edge with custom type for our arrow styling
        return addEdge({...params, type: 'custom-edge'}, eds);
      });
    },
    [setEdges]
  );

  /**
   * Handles drag over event to enable drop functionality
   */
  const onDragOver = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handles node drop event to create new nodes
   * @param {DragEvent} event - The drop event
   */
  const onDrop = useCallback(
    event => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      
      // Validate dropped element
      if (!type) return;
      
      // Convert screen coordinates to flow coordinates
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create new node with default values
      const nid = getId();
      const newNode = {
        id: nid,
        type,
        position,
        sourcePosition: Position.Right, // Default handle positions
        targetPosition: Position.Left,
        data: {
          value: `${type} ${nid}`,
          onClick: () => onNodeClick(null, {id: nid}) // Click handler for inline editing
        },
      };
      
      setNodes(nds => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  /**
   * Handles node selection when clicked
   */
  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
  }, []);

  /**
   * Updates the value/content of the selected node
   * @param {string} value - The new value/content
   */
  const updateSelectedNode = useCallback(
    value => {
      if (!selectedNode) return;
      
      setNodes(nodes =>
        nodes.map(node => {
          if (node.id === selectedNode.id) {
            return {...node, data: {...node.data, value}};
          }
          return node;
        })
      );
    },
    [selectedNode, setNodes]
  );

  /**
   * Validates the flow structure before saving
   * Checks for:
   * - Nodes without connections
   * - Invalid edge configurations
   */
  const validateFlow = useCallback(() => {
    const sourceNodes = new Set();
    const targetNodes = new Set();

    // Collect all connected nodes
    edges.forEach(edge => {
      sourceNodes.add(edge.source);
      targetNodes.add(edge.target);
    });

    // Find disconnected nodes (no incoming or outgoing edges)
    const disconnectedNodes = nodes.filter(
      node => !sourceNodes.has(node.id) && !targetNodes.has(node.id)
    );

    if (disconnectedNodes.length > 1) {
      alert('There are multiple disconnected nodes in the flow');
    } else {
      saveFlowToLocal();
    }
  }, [nodes, edges]);

  /**
   * Saves the current flow to localStorage
   */
  const saveFlowToLocal = useCallback(() => {
    localStorage.setItem('flow', JSON.stringify({nodes, edges}));
    setShowSaveAnimation(true);
  }, [nodes, edges]);

  /**
   * Handles the save success animation timeout
   */
  useEffect(() => {
    let timeout;
    if (showSaveAnimation) {
      timeout = setTimeout(() => setShowSaveAnimation(false), 800);
    }
    return () => clearTimeout(timeout);
  }, [showSaveAnimation]);

  /**
   * Loads saved flow from localStorage on component mount
   */
  useEffect(() => {
    const savedFlow = localStorage.getItem('flow');
    if (savedFlow) {
      const {nodes, edges} = JSON.parse(savedFlow);
      setNodes(nodes);
      setEdges(edges);
    }
  }, [setNodes, setEdges]);

  return (
    <div className="flex flex-col h-screen">
      <Header 
        onClickSave={validateFlow} 
        showSaveAnimation={showSaveAnimation} 
      />

      <div className="flex flex-row flex-grow h-full">
        <ReactFlowProvider>
          {/* Main flow canvas (75% width) */}
          <div className="reactflow-wrapper w-3/4 h-full" ref={reactFlowWrapper}>
            <ReactFlow
              fitView
              nodes={nodes}
              edges={edges}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={() => setSelectedNode(null)}
              onEdgeClick={() => setSelectedNode(null)}
            >
              <Background /> {/* Canvas grid background */}
              <Controls />   {/* Zoom/pan controls */}
            </ReactFlow>
          </div>

          {/* Sidebar panel (25% width) */}
          <div className="flex-grow border-s">
            <NodePanelSidebar
              selectedNode={selectedNode}
              cancelSelection={() => setSelectedNode(null)}
              updateSelectedNode={updateSelectedNode}
            />
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
}