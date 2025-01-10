import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import * as Fields from '@codaco/ui/lib/components/Fields';

import { createPortal } from 'react-dom';
import Button from '@codaco/ui/lib/components/Button';
import { Layout, Section } from '@components/EditorLayout';
import ControlBar from '@components/ControlBar';
import Screen from '@components/Screen/Screen';
import { screenVariants } from '@components/Screens/Screens';
import ValidatedField from '@components/Form/ValidatedField';
import { reduxForm } from 'redux-form';
import withAssetActions from '@components/AssetBrowser/withAssetActions';
import { compose } from 'recompose';
import fs from 'fs';
import path from 'path';
import { remote } from 'electron';

const CreateKeyWindow = ({
  show,
  close,
  submitting,
  handleSubmit,
  importAsset,
  existingFile,
}) => {
  const handleCreateFile = (values) => {
    // TODO: implement editing the file
    const fileContents = values.mapboxAPIKey;

    const tempFilePath = path.join(remote.app.getPath('temp'), 'architect', 'mapbox.txt');

    fs.writeFile(tempFilePath, fileContents, (err) => {
      if (err) {
        throw new Error(`Error writing file: ${err}`);
      }
      importAsset(tempFilePath);

      close();
    });
  };

  const cancelButton = (
    <Button
      color="platinum"
      onClick={close} // TODO: implement with closing dialog
      key="cancel"
    >
      Cancel
    </Button>
  );

  const saveButton = (
    <Button
      key="save"
      onClick={handleSubmit(handleCreateFile)}
      iconPosition="right"
      icon="arrow-right"
      disabled={submitting}
    >
      Finished Editing
    </Button>
  );

  if (!show) { return null; }

  return createPortal(
    <AnimatePresence>
      { show && (
        <motion.div
          variants={screenVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="screens-container"
        >
          <Screen
            header={(
              <div className="stage-heading stage-heading--collapsed stage-heading--shadow">
                <Layout>
                  <h2>Create Mapbox API Key</h2>
                </Layout>
              </div>
            )}
            footer={(
              <ControlBar
                buttons={[cancelButton, saveButton]}
              />
            )}
          >
            <Layout>
              <Section
                title="API Key"
                summary={(
                  <p>
                    This interface requires a Mapbox API Key to render maps. To get one, visit
                    {' '}
                    <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer">mapbox.com</a>
                    {' '}
                    or read our documentation on the interface.
                  </p>
    )}
              >

                <div data-name="Mapbox API Key" />
                <ValidatedField
                  component={Fields.Text}
                  label="API Key"
                  type="text"
                  placeholder="Enter a Mapbox token..."
                  name="mapboxAPIKey"
                  validation={{ required: true }}
                />
              </Section>
            </Layout>
          </Screen>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

CreateKeyWindow.propTypes = {
  show: PropTypes.bool,
  type: PropTypes.string,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
  onCancel: PropTypes.func,
};

CreateKeyWindow.defaultProps = {
  show: true,
  type: null,
  selected: null,
  onSelect: () => {},
  onCancel: () => {},
};

export default compose(
  withAssetActions,
  reduxForm({
    form: 'createApiKeyForm',
  }),
)(CreateKeyWindow);
