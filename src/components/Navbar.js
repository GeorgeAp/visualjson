// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>VisualJson</h1>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/flow-diagram" style={styles.link}>Flow Diagram</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#1f77b4',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Add this for spacing between title and links
    color: '#fff',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
  },
  links: {
    display: 'flex',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '20px', // Space between links
  },
};

export default Navbar;
