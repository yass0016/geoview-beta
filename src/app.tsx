import React from 'react';
import { createRoot } from 'react-dom/client';
import MapWrapper from './map';

const mapElements = document.getElementsByClassName('llwp-map');

for (let mapIndex = 0; mapIndex < mapElements.length; mapIndex++) {
  const mapElement = mapElements[mapIndex];

  const root = createRoot(mapElement);
  root.render(<MapWrapper />);
}
