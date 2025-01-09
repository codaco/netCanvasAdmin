import React from 'react';
import PropTypes from 'prop-types';
import { withState } from 'recompose';
import { fieldPropTypes } from 'redux-form';
import NetworkThumbnail from '@components/Thumbnail/Network'; // TODO: replace
import File from '../File';

const withSelectGeoAsset = withState('selectGeoAsset', 'setSelectGeoAsset', false);

const GeoDataSource = (props) => {
  const {
    input,
  } = props;
  return (
    <File
      type="geospatial"
      selected={input.value}
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      { (id) => <NetworkThumbnail id={id} /> }
    </File>
  );
};

GeoDataSource.propTypes = {
  ...fieldPropTypes,
  canUseExisting: PropTypes.bool,
};

GeoDataSource.defaultProps = {
  canUseExisting: false,
};

export default withSelectGeoAsset(GeoDataSource);
