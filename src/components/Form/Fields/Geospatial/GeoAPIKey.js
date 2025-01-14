import React, { useState } from 'react';
import { compose } from 'recompose';
import { fieldPropTypes } from 'redux-form';
import Button from '@codaco/ui/lib/components/Button';
import CreateKeyWindow from './CreateKeyWindow';

const GeoAPIKey = (props) => {
  const {
    input: {
      value,
      onChange,
    },
  } = props;

  const [showCreateKeyWindow, setShowCreateKeyWindow] = useState(false);
  return (
    <>
      <div className="form-fields-file__preview">
        {/* TODO: file preview here */}

      </div>
      <Button
        onClick={() => setShowCreateKeyWindow(true)}
        color="primary"
        size="small"
      >
        { !value ? 'Select API Key' : 'Update API Key' }
      </Button>
      <CreateKeyWindow
        show={showCreateKeyWindow}
        close={() => setShowCreateKeyWindow(false)}
        onSelect={(keyId) => {
          onChange(keyId); // add the keyId as the value for mapOptions.tokenAssetId
        }}
      />
    </>
  );
};

GeoAPIKey.propTypes = {
  ...fieldPropTypes,
};

export default GeoAPIKey;
