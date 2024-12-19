import PromptText from '@components/sections/PromptText';
import React from 'react';

import { getFieldId } from '@app/utils/issues';
import { ValidatedField } from '@components/Form';
import { Section, Row } from '@components/EditorLayout';
import VariablePicker from '../../Form/Fields/VariablePicker/VariablePicker';

const PromptFields = ({ variable, entity, type }) => (
  <>
    <PromptText />
    <Section title="Selection Variable" id={getFieldId('variable')}>
      <Row>
        <ValidatedField
          name="variable"
          component={VariablePicker}
          type={type}
          entity={entity}
        //   onCreateOption={handleNewVariable}
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
  </>
);

export default PromptFields;
