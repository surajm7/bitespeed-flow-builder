import {IoIosArrowRoundBack} from 'react-icons/io';

/**
 * TextNodeEditor component - Editor panel for text nodes in a flow diagram
 * @param {Object} props - Component props:
 *   @param {Object} selectedNode - Currently selected node data
 *   @param {Function} updateSelectedNode - Callback to update node content
 *   @param {Function} cancelSelection - Callback to close the editor
 * @returns {JSX.Element} - Editor interface with back button and textarea
 */
export default function TextNodeEditor({selectedNode, updateSelectedNode, cancelSelection}) {
  return (
    <div className="">
      {/* Editor header with back button and title */}
      <div className="mb-5 flex justify-between border-b p-4 py-2">
        {/* Back button to exit editor */}
        <IoIosArrowRoundBack 
          size={28} 
          className="cursor-pointer" 
          onClick={cancelSelection} 
        />

        {/* Editor title */}
        <h1 className="text-base font-medium">Message</h1>

        {/* Empty div for layout balance */}
        <div />
      </div>

      {/* Main editor content */}
      <div className="px-4">
        {/* Section label */}
        <h1 className="text-sm mb-3 text-gray-500">Edit Text</h1>

        {/* Textarea for editing node content */}
        <textarea
          className="w-full p-2 mb-3 bg-white border-2 border-blue-500 rounded-lg font-medium"
          placeholder="Type your message here..."
          value={selectedNode.data.value} // Current value from node data
          onChange={event => updateSelectedNode(event.target.value)} // Update handler
        />
      </div>
    </div>
  );
}