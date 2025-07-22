import {BezierEdge, EdgeLabelRenderer} from 'reactflow';
import {FaCaretRight} from 'react-icons/fa';

/**
 * CustomEdge component - Creates a custom edge with an arrow icon at the target
 * @param {Object} props - ReactFlow edge props including targetX and targetY coordinates
 * @returns {JSX.Element} - A Bezier edge with a caret icon at the target position
 */
export default function CustomEdge(props) {
  const {targetX, targetY} = props;

  return (
    <>
      {/* Base Bezier edge from ReactFlow */}
      <BezierEdge {...props} />

      {/* EdgeLabelRenderer is a ReactFlow component that helps position elements along edges */}
      <EdgeLabelRenderer>
        {/* Arrow icon positioned at the target of the edge */}
        <FaCaretRight
          size={20}
          className="text-black"
          style={{
            // Transform to position the icon correctly at the edge target
            transform: `translate(-50%, -50%) translate(${targetX}px, ${targetY}px)`,
          }}
        />
      </EdgeLabelRenderer>
    </>
  );
}