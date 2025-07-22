import {BiMessageSquareDetail, BiImages} from 'react-icons/bi';

// Available node types configuration
const nodeTypes = [
  {
    type: 'text',          // Node type identifier
    value: 'Message',      // Display name
    icon: BiMessageSquareDetail, // Associated icon component
    disabled: true,        // Availability flag
  },
  // Template for additional node types:
  // {
  //     type: "image",
  //     value: "Image",
  //     icon: BiImages,
  //     disabled: false,
  // },
];

/**
 * Component for selecting and dragging node types onto the canvas
 * 
 * @param {Object} props - Component properties (currently empty)
 * @returns {JSX.Element} Interactive grid of draggable node options
 */
export default function NodeSelector({}) {
  /**
   * Handles drag start event for node creation
   * @param {DragEvent} event - Browser drag event
   * @param {Object} node - Node type configuration
   */
  const onDragStart = (event, node) => {
    // Set the node type data for the drop target
    event.dataTransfer.setData('application/reactflow', node.type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      <h1 className="text-lg font-medium mb-3">Select a Node</h1>

      {/* Grid of draggable node options */}
      <div className="flex flex-wrap justify-between">
        {nodeTypes.map(Node => (
          <div
            key={Node.type}
            onDragStart={event => onDragStart(event, Node)}
            draggable={!Node.disabled}
            className={`flex flex-col items-center justify-between p-4 my-2 bg-white border-2 border-blue-500 rounded-lg font-medium transition-all w-[48%] active:scale-95 ${
              Node.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <div className="rounded-full mb-5">
              <Node.icon size={24} className="text-blue-500" />
            </div>
            <span className="text-base select-none text-blue-500">{Node.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}