import React from 'react';
import PropTypes from 'prop-types';
import { withState } from 'recompose';
import { fieldPropTypes } from 'redux-form';
import NetworkThumbnail from '@components/Thumbnail/Network'; // TODO: replace
import File from './File';

const withSelectAPIKey = withState('selectAPIKey', 'setSelectAPIKey', false);

const GeoAPIKey = (props) => {
  const {
    input,
  } = props;
  return (
    <File
      type="environment"
      selected={input.value}
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      { (id) => <NetworkThumbnail id={id} /> }
    </File>
  );
};

GeoAPIKey.propTypes = {
  ...fieldPropTypes,
  canUseExisting: PropTypes.bool,
};

GeoAPIKey.defaultProps = {
  canUseExisting: false,
};

export default withSelectAPIKey(GeoAPIKey);
