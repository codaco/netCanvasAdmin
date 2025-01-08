import PromptText from '@components/sections/PromptText';
import React from 'react';
import { compose } from 'recompose';

import { ValidatedField } from '@components/Form';
import { Section, Row } from '@components/EditorLayout';
import NewVariableWindow, {
  useNewVariableWindowState,
} from '@components/NewVariableWindow';
import withVariableHandlers from '@components/sections/CategoricalBinPrompts/withVariableHandlers'; // TODO: should these be moved somewhere more general?
import withVariableOptions from '@components/sections/CategoricalBinPrompts/withVariableOptions';
import VariablePicker from '../../Form/Fields/VariablePicker/VariablePicker';

const PromptFields = ({
  variable, variableOptions, entity, type, changeForm, form,
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
    openNewVariableWindow(
      { initialValues: { name, type: 'text' } },
      { field: 'variable' },
    );
  };

  const geoVariableOptions = variableOptions
    .filter(({ type: variableType }) => variableType === 'text');

  return (
    <>
      <PromptText />
      <Section title="Selection Variable">
        <Row>
          <ValidatedField
            name="variable"
            component={VariablePicker}
            type={type}
            entity={entity}
            options={geoVariableOptions}
            onCreateOption={handleNewVariable}
            validation={{ required: true }}
            variable={variable}
          />
        </Row>
      </Section>
      <NewVariableWindow
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...newVariableWindowProps}
      />
    </>
  );
};

export default compose(
  withVariableOptions,
  withVariableHandlers,
)(PromptFields);
