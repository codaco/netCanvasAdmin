import React from 'react';
import * as Fields from '@codaco/ui/lib/components/Fields';
import { Section } from '../EditorLayout';
import ValidatedField from '../Form/ValidatedField';
import { getFieldId } from '../../utils/issues';

// config map options

/*
      mapOptions: {
        center: [-87.6298, 41.8781], -> string (should this be selectable on a map??)
        token: 'asset3', -> needs to be uploaded
        initialZoom: 12, -> int
      },
*/

const MapOptions = () => (
  <>
    <Section
      title="API Key"
      summary={(
        <p>
          This interface requires an API key from Mapbox.
          To get one, visit https://mapbox.com or read our documentation on the interface.
        </p>
    )}
    >
      <div id={getFieldId('mapOptions.mapboxKey')} data-name="Map Options Mapbox Key" />
      <ValidatedField
        name="mapOptions.mapboxKey"
        component={Fields.Text}
        label="MapBox API Key"
        validation={{ required: true }}
        placeholder="Enter your API key..."
      />
    </Section>
    <Section
      title="Map Options"
      summary={(
        <p>
          Enter the center coordinates and initial zoom. Mapbox GL uses longitude,
          latitude coordinate order
        </p>
    )}
    >

      <div id={getFieldId('mapOptions.center')} data-name="Map Options Initial Center" />
      <ValidatedField
        name="mapOptions.center"
        component={Fields.Text}
        label="Initial Center"
        validation={{ required: true }}
        placeholder="[Longitude, Latitude]"
      />

      <div id={getFieldId('mapOptions.zoom')} data-name="Map Options Zoom" />
      <ValidatedField
        name="mapOptions.zoom"
        component={Fields.Number}
        label="Initial Map Zoom"
        type="number"
        normalize={(value) => parseInt(value, 10) || value}
        validation={{ required: true, positiveNumber: true }}
      />

    </Section>
  </>

);

export default MapOptions;
