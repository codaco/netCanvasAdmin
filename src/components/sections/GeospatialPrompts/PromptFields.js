import PromptText from '@components/sections/PromptText';
import React from 'react';

import { getFieldId } from '@app/utils/issues';
import { ValidatedField } from '@components/Form';
import { Section, Row } from '@components/EditorLayout';
import NewVariableWindow, { useNewVariableWindowState } from '@components/NewVariableWindow';
import VariablePicker from '../../Form/Fields/VariablePicker/VariablePicker';

const PromptFields = ({
  variable, entity, type, changeForm, form,
}) => {
  const newVariableWindowInitialProps = {
    entity,
    type,
    initialValues: { name: null, type: 'text' },
  };

  const handleCreatedNewVariable = (id, { field }) => changeForm(form, field, id);

  const [newVariableWindowProps, openNewVariableWindow] = useNewVariableWindowState(
    newVariableWindowInitialProps,
    handleCreatedNewVariable,
  );
  const handleNewVariable = (name) => {
    openNewVariableWindow({ initialValues: { name, type: 'text' } }, { field: 'edgeVariable' });
  };
  return (
    <>
      <PromptText />
      <Section title="Selection Variable" id={getFieldId('variable')}>
        <Row>
          <ValidatedField
            name="variable"
            component={VariablePicker}
            type={type}
            entity={entity}
            onCreateOption={handleNewVariable}
            validation={{ required: true }}
            variable={variable}
          />
        </Row>
      </Section>
      <Section title="Layers" id={getFieldId('layers')}>
        <Row>
          Configure Map Layers
        </Row>
      </Section>
      <NewVariableWindow
              // eslint-disable-next-line react/jsx-props-no-spreading
        {...newVariableWindowProps}
      />
    </>
  );
};

export default PromptFields;
