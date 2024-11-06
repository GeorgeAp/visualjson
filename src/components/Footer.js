import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2024 VisualJson. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1f77b4',
    padding: '10px 20px',
    color: '#fff',
    textAlign: 'center',
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
  text: {
    margin: 0,
    fontSize: '1rem',
  },
};

export default Footer;
