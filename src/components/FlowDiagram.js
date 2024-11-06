import React, { useState, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from 'react-flow-renderer';
import html2canvas from 'html2canvas'; // Import html2canvas
import './FlowDiagram.css';

const nodeStyles = {
  rectangle: { background: '#fff', border: '1px solid #1f77b4', borderRadius: '3px', padding: '10px', position: 'relative' },
  circle: { background: '#fff', border: '1px solid #ff6347', borderRadius: '50%', width: '60px', height: '60px', position: 'relative' },
  diamond: { background: '#fff', border: '1px solid #ffd700', transform: 'rotate(45deg)', width: '60px', height: '60px', position: 'relative' },
  ellipse: { background: '#fff', border: '1px solid #8a2be2', borderRadius: '20px', width: '80px', position: 'relative' },
  triangle: { width: 0, height: 0, borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderBottom: '50px solid #00ff7f', position: 'relative' },
};

const CustomNode = ({ id, data, style, onRemoveNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={style} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      {data.label}
      {isHovered && (
        <button 
          className="delete-button" 
          onClick={() => onRemoveNode(id)}
          style={styles.deleteButton}
        >
          X
        </button>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </div>
  );
};

const FlowDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null); // Reference to the React Flow wrapper

  const addNode = (type) => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const onConnect = (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds));

  const removeNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  const saveDiagramToFile = () => {
    const diagramData = { nodes, edges };
    const blob = new Blob([JSON.stringify(diagramData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.json'; // Customize the file name here
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  const loadDiagramFromFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setNodes(data.nodes);
          setEdges(data.edges);
        } catch (error) {
          alert('Failed to load diagram. Please make sure the file is a valid JSON.');
        }
      };
      reader.readAsText(file);
    }
  };

  const saveDiagramAsImage = () => {
    if (reactFlowWrapper.current) {
      html2canvas(reactFlowWrapper.current).then((canvas) => {
        const image = canvas.toDataURL('image/png'); // Convert to image
        const link = document.createElement('a');
        link.href = image;
        link.download = 'diagram.png'; // Customize the file name here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  return (
    <div style={{ display: 'flex', height: '600px' }}>
      <div style={styles.panel}>
        <h4 style={styles.panelTitle}>Add Shape</h4>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => addNode('rectangle')}>Rectangle</button>
          <button style={styles.button} onClick={() => addNode('circle')}>Circle</button>
          <button style={styles.button} onClick={() => addNode('diamond')}>Diamond</button>
          <button style={styles.button} onClick={() => addNode('ellipse')}>Ellipse</button>
          <button style={styles.button} onClick={() => addNode('triangle')}>Triangle</button>
        </div>
        <h4 style={styles.panelTitle}>Diagram Controls</h4>
        <div style={styles.buttonContainer}>
          <p>Upload a Json File</p>
        <input 
            type="file" 
            accept=".json" 
            onChange={loadDiagramFromFile} 
            style={styles.fileInput}
          />
          <p></p>
          <button style={styles.button} onClick={saveDiagramToFile}>Save Diagram to File</button>
          <button style={styles.button} onClick={saveDiagramAsImage}>Save Diagram as Image</button>
        </div>
      </div>
      <div style={{ flexGrow: 1, border: '1px solid black' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          deleteKeyCode={46}
          nodeTypes={{
            rectangle: (node) => <CustomNode id={node.id} data={node.data} style={nodeStyles.rectangle} onRemoveNode={removeNode} />,
            circle: (node) => <CustomNode id={node.id} data={node.data} style={nodeStyles.circle} onRemoveNode={removeNode} />,
            diamond: (node) => <CustomNode id={node.id} data={node.data} style={nodeStyles.diamond} onRemoveNode={removeNode} />,
            ellipse: (node) => <CustomNode id={node.id} data={node.data} style={nodeStyles.ellipse} onRemoveNode={removeNode} />,
            triangle: (node) => <CustomNode id={node.id} data={node.data} style={nodeStyles.triangle} onRemoveNode={removeNode} />,
          }}
          style={{ backgroundColor: '#fafafa', height: '100%' }}
          connectionLineStyle={{ stroke: '#777', strokeWidth: 2 }}
          connectionMode="loose"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

const styles = {
  panel: {
    padding: '20px',
    borderRight: '1px solid #ccc',
    width: '200px',
    backgroundColor: '#f9f9f9',
    height: '100%',
  },
  panelTitle: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '8px',
    fontSize: '14px',
    color: '#333',
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  fileInput: {
    marginTop: '10px',
  },
  deleteButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'red',
  },
};

export default FlowDiagram;
