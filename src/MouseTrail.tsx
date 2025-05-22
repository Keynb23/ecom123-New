import React, { useEffect } from 'react';

const MouseTrail: React.FC = () => {
  useEffect(() => {
    // Dynamically import the neonCursor function
    import('https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js')
      .then(({ neonCursor }) => {
        neonCursor({
          el: document.body, // *** CRUCIAL CHANGE: Attach to the document body for full page tracking ***
          shaderPoints: 16,
          curvePoints: 80,
          curveLerp: 0.5,
          radius1: 5,
          radius2: 30,
          velocityTreshold: 10,
          sleepRadiusX: 100,
          sleepRadiusY: 100,
          sleepTimeCoefX: 0.0025,
          sleepTimeCoefY: 0.0025
        });
      })
      .catch(error => console.error("Failed to load neonCursor:", error));
  }, []); // Empty dependency array ensures this runs once on mount

  return null; // This component doesn't need to render any HTML elements itself
};

export default MouseTrail;