import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import NativeSelect from '@components/Form/Fields/NativeSelect';

import withMapFormToProps from '@components/enhancers/withMapFormToProps';
import { Section, Row } from '../EditorLayout';
import ValidatedField from '../Form/ValidatedField';

import ColorPicker from '../Form/Fields/ColorPicker';
import GeoDataSource from '../Form/Fields/Geospatial/GeoDataSource';
import GeoAPIKey from '../Form/Fields/Geospatial/GeoAPIKey';
import useVariablesFromExternalData from '../../hooks/useVariablesFromExternalData';

const MapOptions = (props) => {
  const { mapOptions } = props;

  const { variables: variableOptions } = useVariablesFromExternalData(mapOptions?.dataSourceAssetId, true, 'geojson');

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
          name="mapOptions.tokenAssetId"
          component={GeoAPIKey}
          label="Mapbox API Key"
          validation={{ required: true }}
        />
      </Section>
      <Section
        title="Data source for map layers"
        summary={(
          <p>
            This interface requires a GeoJSON source for map layers.
            These provide selectable areas for prompts. Select a GeoJSON
            file to use.
          </p>
            )}
      >
        <Row>
          <div data-name="Layer data-source" />
          <ValidatedField
            component={GeoDataSource}
            name="mapOptions.dataSourceAssetId"
            id="dataSourceAssetId"
            validation={{ required: true }}
          />
        </Row>
        {variableOptions && variableOptions.length > 0 && (
          <Row>
            <ValidatedField
              label="Which property should be used for map selection?"
              name="mapOptions.targetFeatureProperty"
              component={NativeSelect}
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
          label="Which color would you like to use for this stage's map outlines and selections?"
        />
      </Section>
    </>

  );
};
MapOptions.defaultProps = {
  mapOptions: {
    center: [0, 0],
    tokenAssetId: '',
    initialZoom: 0,
    dataSourceAssetId: '',
    color: '',
    targetFeatureProperty: '',
  },
};

MapOptions.propTypes = {
  mapOptions: PropTypes.shape({
    center: PropTypes.arrayOf(PropTypes.number),
    tokenAssetId: PropTypes.string,
    initialZoom: PropTypes.number,
    dataSourceAssetId: PropTypes.string,
    color: PropTypes.string,
    targetFeatureProperty: PropTypes.string,
  }),
};

export default compose(
  withMapFormToProps(['mapOptions']),
)(MapOptions);
