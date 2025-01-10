import React, { useEffect, useState } from 'react';
import { withState, compose } from 'recompose';
import { fieldPropTypes } from 'redux-form';
import Button from '@codaco/ui/lib/components/Button';
import withAssets from '@components/AssetBrowser/withAssets';
import KeyIcon from '@material-ui/icons/VpnKey';
import CreateKeyWindow from './CreateKeyWindow';

const withSelectAPIKey = withState('selectAPIKey', 'setSelectAPIKey', false);

const GeoAPIKey = (props) => {
  const {
    input,
    assets,

  } = props;
  const existingAPIKeyFile = assets.find((asset) => asset.name === 'mapbox.txt');

  const [showCreateKeyWindow, setShowCreateKeyWindow] = useState(false);

  // initialize the data with the existing file if there's no input.value
  useEffect(() => {
    if (!input.value && existingAPIKeyFile) {
      input.onChange(existingAPIKeyFile.id);
    }
  }, [input.value, existingAPIKeyFile]);

  return (
    <>
      {existingAPIKeyFile && (
        <p>
          <KeyIcon />
          Using existing Mapbox API Key
        </p>
      )}
      <Button
        onClick={() => setShowCreateKeyWindow(true)}
        color="primary"
        size="small"
      >
        { !existingAPIKeyFile ? 'Create API Key' : 'Update API Key' }
      </Button>
      <CreateKeyWindow
        show={showCreateKeyWindow}
        close={() => setShowCreateKeyWindow(false)}
        existingFile={existingAPIKeyFile}
      />
    </>
  );
};

GeoAPIKey.propTypes = {
  ...fieldPropTypes,
};

export default compose(
  withSelectAPIKey,
  withAssets,
)(GeoAPIKey);
