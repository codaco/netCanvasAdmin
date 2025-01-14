import React, { useCallback } from 'react';
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
import Assets from '@components/AssetBrowser/Assets';

import { useSelector, useDispatch } from 'react-redux';
import { isDirty } from 'redux-form';
import BasicForm from '../../../BasicForm';
import { addApiKeyAsset } from '../../../../ducks/modules/protocol/assetManifest';

const CreateKeyWindow = ({
  show,
  close,
  onSelect,
  selected,
}) => {
  const formName = 'create-api-key';
  const currentState = useSelector((state) => state);
  const dispatch = useDispatch();

  // handleSubmit should add the selected key to the asset manifest
  // and close the window
  const handleSubmit = useCallback((formValues) => {
    const newKeyAsset = dispatch(addApiKeyAsset(formValues.keyName, formValues.keyValue));
    onSelect(newKeyAsset.id);
    close();
  }, [close]);

  const cancelButton = (
    <Button
      color="platinum"
      onClick={close}
      key="cancel"
    >
      Cancel
    </Button>
  );

  const saveButton = (
    <Button
      key="save"
      type="submit"
      iconPosition="right"
      icon="arrow-right"
    >
      Finished Editing
    </Button>
  );

  const controlButtons = isDirty(formName)(currentState)
    ? [cancelButton, saveButton]
    : [cancelButton];

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
          <BasicForm
            form={formName}
            onSubmit={handleSubmit}
          >
            <Screen
              header={(
                <div className="stage-heading stage-heading--collapsed stage-heading--shadow">
                  <Layout>
                    <h2>API Key Browser</h2>
                  </Layout>
                </div>
            )}
              footer={(
                <ControlBar
                  buttons={controlButtons}
                />
            )}
            >
              <Layout>
                <Section
                  title="Create New API Key"
                >

                  <div data-name="API Key Name" />
                  <ValidatedField
                    component={Fields.Text}
                    label="API Key Name"
                    type="text"
                    placeholder="Name this key"
                    name="keyName"
                  />
                  <div data-name="API Key Value" />
                  <ValidatedField
                    component={Fields.Text}
                    label="API Key"
                    type="text"
                    placeholder="Enter an API Key..."
                    name="keyValue"
                  />
                </Section>
                <Section
                  title="Resource Library"
                >
                  <Assets
                    onSelect={onSelect}
                    selected={selected}
                    type="apiKey"
                    disableDelete
                  />
                </Section>
              </Layout>
            </Screen>
          </BasicForm>

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

export default CreateKeyWindow;
