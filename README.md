## 🌟 Overview

# Bitespeed Flow Builder



A responsive, interactive chatbot flow builder built with modern web technologies as part of the Bitespeed frontend assessment.

### Key Highlights:
- **Drag-and-Drop Interface**: Intuitive visual builder for chatbot flows
- **Real-Time Editing**: Instant preview of message content
- **Connection Validation**: Smart handling of node relationships
- **Local Persistence**: Automatically saves your work
- **Production-Ready**: Optimized for performance and reliability

## 🚀 Live Demo

Experience the flow builder in action:  
🔗 [https://bitespeed-flow-builder-eight.vercel.app/](https://bitespeed-flow-builder-eight.vercel.app/)

> **Note**: All flows are saved to your browser's local storage

## Features

- 🖱️ **Drag-and-drop interface** for building chatbot flows
- ✏️ **Editable text nodes** with real-time preview
- 🔗 **Connection validation** (one source, multiple targets)
- 💾 **Local storage persistence** for saved flows
- 🎨 **Clean UI** with interactive elements
- 📱 **Responsive design** for different screen sizes

## Tech Stack

- ⚛️ Next.js 14 (App Router)
- 🌊 React Flow for flow diagram
- 🎨 Tailwind CSS for styling
- ✨ React Icons
- 📦 Nanoid for unique IDs
- 💬 React Toastify for notifications

## Prerequisites

1. Node.js and npm installed on your machine.
2. Basic understanding of React.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/surajm7/bitespeed-flow-builder.git
cd bitespeed-flow-builder

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Usage Guide

### Building Your Chatbot Flow

1. **Add Message Nodes**
   - Open the nodes panel (right sidebar)
   - Drag and drop the "Message" node onto the canvas
   - Multiple nodes can be added to create complex flows

2. **Edit Message Content**
   - Click on any message node to select it
   - The editor panel will appear in the sidebar
   - Type your message content in the text area
   - Changes are saved automatically

3. **Connect Messages**
   - Hover over a node to see connection handles
   - Drag from the right handle (source) of one node
   - Drop onto the left handle (target) of another node
   - Note: Each source can only have one outgoing connection

4. **Save Your Flow**
   - Click the "Save Changes" button in the top-right corner
   - The flow will be validated automatically:
     - Error if multiple nodes have no incoming connections
     - Success notification when saved
   - Flows are persisted to local storage

5. **Additional Tips**
   - Click on empty canvas area to deselect nodes
   - Use the controls in the bottom-left to zoom/pan
   - The flow will be preserved when refreshing the page

### Directory Structure

```bash
src
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
└── components
    ├── FlowBuilder.js
    ├── Header.js
    ├── NodePanelSidebar.js
    ├── NodeSelector.js
    ├── edges                   # Custom edges
    │   └── CustomEdge.js
    ├── editors                 # Custom editors
    │   └── TextNodeEditor.js
    ├── handles                 # Custom handles
    │   └── CustomHandle.js
    └── nodes                   # Custom nodes
        └── TextMessageNode.js
```
## 🧩 Extensibility

The architecture is designed for easy extension. Here's how to add new capabilities:

### Adding New Node Types
1. **Create Component**:
   - Add new node components in `components/nodes/` (e.g., `ImageNode.js`, `DecisionNode.js`)
   - Follow the pattern of `TextMessageNode.js`

2. **Register Node Type**:
   ```javascript
   // In FlowBuilder.js
   const nodeTypes = {
     text: TextMessageNode,
     image: ImageNode, // ← Register your new type
     decision: DecisionNode
   };

3.**In NodeSelector.js**:
   ```javascript

const nodeTypes = [
  // ...existing types
  {
    type: 'image',
    value: 'Image Node',
    icon: BiImageAlt
  }
];

## 📚 References & Resources

### Core Documentation
- [React Flow Official Documentation](https://reactflow.dev/docs) - Complete API reference and usage examples
- [Next.js Documentation](https://nextjs.org/docs) - Framework fundamentals

### Project Specifications
- [Bitespeed Task Brief](https://bitespeed.notion.site/BiteSpeed-Frontend-Task-Chatbot-flow-builder-fb0feb3498294929a9b7171bcb4e8a8b) - Original requirements and design specs

### Inspiration Projects
- [Reference Implementation](https://github.com/surajm7/bitespeed-flow-builder) - Sample solution by Suraj M
- [Live Demo](https://bitespeed-flow-builder.vercel.app/) - Working example of the reference implementation

### Additional Learning
- [React Flow Examples](https://reactflow.dev/examples) - Code samples for advanced features
- [Tailwind CSS Cheatsheet](https://nerdcave.com/tailwind-cheat-sheet) - Quick styling reference
- [React Icons Library](https://react-icons.github.io/react-icons/) - Icon set used in the project

### Deployment Guides
- [Vercel Deployment Docs](https://vercel.com/docs) - How to deploy Next.js applications
- [GitHub Actions CI/CD](https://docs.github.com/en/actions) - For automated deployment workflows