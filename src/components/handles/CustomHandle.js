import {Handle} from 'reactflow';

/**
 * CustomHandle component - A customized connection handle for ReactFlow nodes
 * @param {Object} props - Component props:
 *   @param {string} type - Either 'source' or 'target' for handle direction
 *   @param {string} position - Position relative to node (e.g., Position.Left, Position.Right)
 * @returns {JSX.Element} - A styled handle element for node connections
 */
export default function CustomHandle({type, position}) {
  return (
    <Handle
      type={type}  // Defines if this is a source (output) or target (input) handle
      position={position}  // Position on the node (left, right, top, bottom)
      style={{
        width: 10,  // Handle dimensions
        height: 10,
        background: 'white',  // Inner color
        border: '1px solid #000',  // Border styling
      }}
    />
  );
}