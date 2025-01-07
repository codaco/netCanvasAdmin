import React from 'react';
import { compose } from 'recompose';

import * as Fields from '@codaco/ui/lib/components/Fields';
import withMapFormToProps from '@components/enhancers/withMapFormToProps';
import { Section, Row } from '../EditorLayout';
import ValidatedField from '../Form/ValidatedField';
import { getFieldId } from '../../utils/issues';

import ColorPicker from '../Form/Fields/ColorPicker';
import getPalette from '../TypeEditor/getPalette';
import GeoDataSource from '../Form/Fields/GeoDataSource';
import useVariablesFromExternalData from '../../hooks/useVariablesFromExternalData';

// config map options

/*
      mapOptions: {
        center: z.tuple([z.number(), z.number()]),
        token: z.string(),
        initialZoom: z.number().int(),
        data: z.string(),
        color: z.string(),
        propToSelect: z.string(),
      },
*/

const MapOptions = (props) => {
  const { mapOptions } = props;
  // const { name: paletteName, size: paletteSize } = getPalette(mapOptions.entity);

  const { variables: variableOptions } = useVariablesFromExternalData(mapOptions?.dataSource, true, 'geojson');

  return (
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
        title="Data source for map layers"
        summary={(
          <p>
            This stage needs a geojson source for map layers. Select a geojson
            file to use.
          </p>
            )}
      >
        <Row>
          <div id={getFieldId('dataSource')} data-name="Layer data-source" />
          <ValidatedField
            component={GeoDataSource}
            name="mapOptions.dataSource"
            id="dataSource"
            validation={{ required: true }}
          />
        </Row>
        {variableOptions && variableOptions.length > 0 && (
          <Row>
            <ValidatedField
              label="Which property should be used for fill"
              name="mapOptions.propToSelect"
              component={Fields.RadioGroup}
              options={variableOptions}
              validation={{ required: true }}
            />
          </Row>
        )}
      </Section>
      <Section
        title="Color"
        id={getFieldId('color')}
        summary={(
          <p>
            Choose a color for the shape outlines and fill.
          </p>
                  )}
      >
        <ValidatedField
          component={ColorPicker}
          name="color"
          // palette={paletteName}
          // paletteRange={paletteSize}
          validation={{ required: false }}
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
          validation={{ required: false }}
          placeholder="[Longitude, Latitude]"
        />

        <div id={getFieldId('mapOptions.zoom')} data-name="Map Options Zoom" />
        <ValidatedField
          name="mapOptions.zoom"
          component={Fields.Number}
          label="Initial Map Zoom"
          type="number"
          normalize={(value) => parseInt(value, 10) || value}
          validation={{ required: false, positiveNumber: true }}
        />

      </Section>
    </>

  );
};

export default compose(
  withMapFormToProps(['mapOptions']),
)(MapOptions);
