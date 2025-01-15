import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import withDisabledAPIKeyRequired from '@components/enhancers/withDisabledAPIKeyRequired';
import mapboxgl from 'mapbox-gl';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { getAssetManifest } from '@selectors/protocol';
import { Section } from '../EditorLayout';
import withMapFormToProps from '../enhancers/withMapFormToProps';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapSelection = ({
  mapOptions,
  disabled,
}) => {
  const { tokenAssetId } = mapOptions;
  const assetManifest = useSelector(getAssetManifest);
  const mapboxAPIKey = get(assetManifest, [tokenAssetId, 'value'], '');

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const [center, setCenter] = useState(mapOptions.center || [0, 0]);
  const [zoom, setZoom] = useState(mapOptions.initialZoom || 0);

  // test dispatch

  useEffect(() => {
    // Set the worker URL for strict CSP environments
    // https://docs.mapbox.com/mapbox-gl-js/guides/browsers-and-testing/#strict-csp-environments
    // note: need the v1 version of the worker
    mapboxgl.workerUrl = '/mapbox-gl-csp-worker.js';

    if (!mapboxAPIKey) {
      return;
    }

    // Initialize the Mapbox map
    mapboxgl.accessToken = mapboxAPIKey;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom,
    });

    mapRef.current.on('move', () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      setCenter([mapCenter.lng, mapCenter.lat]);

      setZoom(mapZoom);
    });

    // Cleanup the map on component unmount
    return () => {
      mapRef.current.remove();
    };
  }, [mapOptions]);

  return (
    <Section
      title="Initial Map View"
      summary={(
        <p>
          When the map is first loaded, it will be centered at the initial center and zoom level
          configured here. Resetting the map will return it to this view.
        </p>
      )}
      disabled={disabled}
    >
      <div>
        Longitude:
        {' '}
        {center[0].toFixed(4)}
        {' '}
        | Latitude:
        {' '}
        {center[1].toFixed(4)}
        {' '}
        | Zoom:
        {' '}
        {zoom.toFixed(2)}
      </div>
      <div
        ref={mapContainerRef}
        style={{ width: '1000px', height: '600px' }} // need to set a size for the map to render
      />
    </Section>
  );
};

MapSelection.defaultProps = {
  mapOptions: {
    center: [0, 0],
    toketokenAssetIdn: '',
    initialZoom: 0,
    dataSourceAssetId: '',
    color: '',
    targetFeatureProperty: '',
  },
  meta: PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string,
  }),
};

MapSelection.propTypes = {
  mapOptions: PropTypes.shape({
    center: PropTypes.arrayOf(PropTypes.number),
    initialZoom: PropTypes.number,
    dataSourceAssetId: PropTypes.string,
    color: PropTypes.string,
    targetFeatureProperty: PropTypes.string,
    tokenAssetId: PropTypes.string,
  }),
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default compose(
  withMapFormToProps('mapOptions'),
  withDisabledAPIKeyRequired,
)(MapSelection);
