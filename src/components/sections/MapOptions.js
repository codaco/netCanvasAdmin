import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import * as Fields from '@codaco/ui/lib/components/Fields';
import withMapFormToProps from '@components/enhancers/withMapFormToProps';
import Tip from '@components/Tip';
import { Section, Row } from '../EditorLayout';
import ValidatedField from '../Form/ValidatedField';

import ColorPicker from '../Form/Fields/ColorPicker';
import GeoDataSource from '../Form/Fields/GeoDataSource';
import GeoAPIKey from '../Form/Fields/GeoAPIKey';
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

  const { variables: variableOptions } = useVariablesFromExternalData(mapOptions?.dataSource, true, 'geojson');

  const { paletteName, paletteSize } = { paletteName: ['ord-color-seq'], paletteSize: 8 }; // TODO: what palette should this be?

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
        <div data-name="Map Options Mapbox Key" />
        <ValidatedField
          name="mapOptions.mapboxKey"
          component={GeoAPIKey}
          label="MapBox API Key"
          validation={{ required: true }}
          placeholder="Enter your API key..."
        />
      </Section>
      <Section
        title="Data source for map layers"
        summary={(
          <p>
            This stage needs a GeoJSON source for map layers.
            These provide selectable areas for prompts. Select a GeoJSON
            file to use.
          </p>
            )}
      >
        <Row>
          <div data-name="Layer data-source" />
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
              label="Which property should be used for map selection?"
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
        summary={(
          <p>
            Interviewer will render outlines and fills of map layers using the same color.
          </p>
                  )}
      >
        <ValidatedField
          component={ColorPicker}
          name="mapOptions.color"
          palette={paletteName}
          paletteRange={paletteSize}
          validation={{ required: true }}
          label="Which color would you like to use for this stage's map?"
        />
      </Section>
      <Section
        title="Map Options"
        summary={(
          <p>
            When the map is first loaded, it will be centered at the initial center and zoom level
            configured here.
          </p>
    )}
      >

        <Tip>
          <p>
            The initial center is in longitude, latitude format.
            We recommend using the longitude and latitude of the center of the area you
            want to show, such as a city or region.
          </p>
        </Tip>

        <div data-name="Map Options Initial Center" />
        <ValidatedField
          name="mapOptions.center"
          component={Fields.Text}
          label="Initial Center"
          validation={{ required: false }}
          placeholder="[Longitude, Latitude]"
        />

        <Tip>
          <p>
            The zoom level controls how much of the map is initially visible. Higher levels show
            more detail, while lower levels show a broader area. The zoom level can be a number
            between 0 and 22.
          </p>
        </Tip>

        <div data-name="Map Options Zoom" />
        <ValidatedField
          name="mapOptions.zoom"
          component={Fields.Number}
          label="Initial Map Zoom"
          type="number"
          placeholder="Enter a number between 0 and 22..."
          normalize={(value) => parseInt(value, 10) || value}
          validation={{ required: false, positiveNumber: true, maxValue: 22 }}
        />
      </Section>
    </>

  );
};
MapOptions.defaultProps = {
  mapOptions: {
    center: [0, 0],
    token: '',
    initialZoom: 0,
    dataSource: '',
    color: '',
    propToSelect: '',
  },
};

MapOptions.propTypes = {
  mapOptions: PropTypes.shape({
    center: PropTypes.arrayOf(PropTypes.number),
    token: PropTypes.string,
    initialZoom: PropTypes.number,
    dataSource: PropTypes.string,
    color: PropTypes.string,
    propToSelect: PropTypes.string,
  }),
};

export default compose(
  withMapFormToProps(['mapOptions']),
)(MapOptions);
