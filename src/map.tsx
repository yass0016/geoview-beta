/* eslint-disable @typescript-eslint/no-explicit-any */
// react
import React, { useState, useEffect, useRef, MutableRefObject } from 'react';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

function MapWrapper() {
  // set intial state
  const [map, setMap] = useState<Map>();

  // pull refs
  const mapElement = useRef<HTMLDivElement | null>();

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect(() => {
    // create map
    const initialMap = new Map({
      target: mapElement.current as string | HTMLElement | undefined,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3857/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT_CBCT_GEOM_3857/default/default028mm/{z}/{y}/{x}.jpg',
          }),
        }),
        new TileLayer({
          source: new XYZ({
            url: 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3857/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT_TXT_3857/default/default028mm/{z}/{y}/{x}.jpg',
          }),
        }),
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [40, -100],
        zoom: 4,
      }),
      controls: [],
    });

    // save map and vector layer references to state
    setMap(initialMap);
  }, []);

  // render component
  return (
    <div
      ref={mapElement as MutableRefObject<HTMLDivElement | null>}
      className="map-container"
      style={{
        width: '100%',
        height: '100vh',
      }}
    />
  );
}

export default MapWrapper;
