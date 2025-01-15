import React from 'react';
import PropTypes from 'prop-types';
import withAssetMeta from './withAssetMeta';

const APIKey = ({ meta }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <p>{meta.value}</p>
);

APIKey.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  meta: PropTypes.object,
};

APIKey.defaultProps = {
  meta: {
    value: '',
  },
};

export default withAssetMeta(APIKey);
