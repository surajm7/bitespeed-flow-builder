import {BiMessageSquareDetail} from 'react-icons/bi';
import {IoLogoWhatsapp} from 'react-icons/io';
import CustomHandle from '../handles/CustomHandle';
import {Position} from 'reactflow';

/**
 * TextMessageNode component - A node for displaying and editing text messages in a flow diagram
 * @param {Object} props - Component props:
 *   @param {Object} data - Node data containing:
 *     @param {string} value - The message text content
 *     @param {Function} onClick - Callback when node is clicked
 *   @param {...any} props - Additional ReactFlow node props
 * @returns {JSX.Element} - A styled message node with connection handles
 */
export default function TextMessageNode({data, ...props}) {
  return (
    <div className="flex-col border min-w-72 bg-white rounded-lg">
      {/* Node header with icon, title, and platform indicator */}
      <div className="flex justify-between p-2 border-b">
        <BiMessageSquareDetail size={16} />  {/* Message icon */}

        <p className="text-xs">Send Message</p>  {/* Node type label */}

        <IoLogoWhatsapp size={16} className="text-[#25D366]" />  {/* Platform icon */}
      </div>

      {/* Main content area */}
      <div className="p-2 py-4">
        {data.value ? (
          // Display message text if value exists
          <h1 
            className="text-sm text-center whitespace-pre-line" 
            onClick={() => data.onClick()}  // Click handler for editing
          >
            {data.value}
          </h1>
        ) : (
          // Placeholder text if no value
          <p className="text-sm text-center text-gray-400">Click to edit</p>
        )}
      </div>

      {/* Connection handles */}
      <CustomHandle type="target" position={Position.Left} />  {/* Input handle */}
      <CustomHandle type="source" position={Position.Right} />  {/* Output handle */}
    </div>
  );
}