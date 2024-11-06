import React from 'react';

// Rectangle Node
export const RectangleNode = ({ data }) => (
  <div style={{ padding: '10px', border: '1px solid #777', borderRadius: '3px', background: '#fff' }}>
    {data.label}
  </div>
);

// Circle Node
export const CircleNode = ({ data }) => (
  <div style={{ width: '60px', height: '60px', borderRadius: '30px', border: '1px solid #777', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {data.label}
  </div>
);

// Diamond Node
export const DiamondNode = ({ data }) => (
  <div style={{
    width: '60px',
    height: '60px',
    background: '#fff',
    transform: 'rotate(45deg)',
    border: '1px solid #777',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    {data.label}
  </div>
);

// Ellipse Node
export const EllipseNode = ({ data }) => (
  <div style={{
    width: '80px',
    height: '50px',
    borderRadius: '25px',
    border: '1px solid #777',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    {data.label}
  </div>
);

// Triangle Node
export const TriangleNode = ({ data }) => (
  <div style={{
    width: '0',
    height: '0',
    borderLeft: '30px solid transparent',
    borderRight: '30px solid transparent',
    borderBottom: '50px solid #fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }}>
    <span style={{ position: 'absolute', bottom: '-20px', fontSize: '12px' }}>{data.label}</span>
  </div>
);
