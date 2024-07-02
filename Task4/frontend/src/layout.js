import React from 'react';
import Navbar from './components/Navbar'; // Adjust the path as per your project structure
import './styles/globals.css'; // Adjust the path for global styles as per your project

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main className="max-w-10xl mx-auto">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
