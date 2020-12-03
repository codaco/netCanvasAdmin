import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { compose } from 'recompose';
import { getFieldId } from '@app/utils/issues';
import { ValidatedField } from '@components/Form';
import VariableSelect from '@components/Form/Fields/VariableSelect';
import OrderBy from '@components/Form/Fields/OrderBy';
import withCreateVariableHandlers from '@components/enhancers/withCreateVariableHandler';
import { Section, Row } from '@components/EditorLayout';
import withLayoutOptions from './withLayoutOptions';
import withCanCreateEdgesState from './withCanCreateEdgesState';

const PromptFields = ({
  allowPositioning,
  entity,
  handleCreateVariable,
  layoutVariablesForSubject,
  type,
  variablesForSubject,
}) => (
  <Section group>
    <Row>
      <h3>Layout</h3>
      <div id={getFieldId('layout.layoutVariable')} data-name="Layout Variable" />
      <p>
        This section controls the position of nodes on this sociogram prompt.
      </p>
    </Row>
    <Row>
      <h4>Layout Variable</h4>
      <p>Which variable should be used to store or retrieve the X/Y coordinates of nodes?</p>
      <ValidatedField
        name="layout.layoutVariable"
        type={type}
        entity={entity}
        component={VariableSelect}
        validation={{ required: true }}
        options={layoutVariablesForSubject}
        onCreateOption={value => handleCreateVariable(value, 'layout', 'layout.layoutVariable')}
      />
    </Row>
    {/* <Row>
      <h4>Can nodes be positioned by the participant?</h4>
      <p>
        Nodes without any coordinates are stacked in a bucket in the bottom-center of the screen,
        until your participant drags them into a position.
      </p>
      <p>
        Disable this when your nodes already have coordinates (e.g from a previous interface), and
        you wish to prevent your participant moving them.
      </p>
      <Field
        name="layout.allowPositioning"
        component={Fields.Toggle}
        label="Allow positioning?"
      />
    </Row> */}
    { allowPositioning &&
      <Row>
        <h4>Sort Unplaced Nodes <small>(optional)</small></h4>
        <p>
          Nodes without any coordinates are stacked in a bucket until your participant drags them
          into position. You can control the order of this stack, which will determine the order
          that your participant is able to position the nodes.
        </p>
        <Field
          name="sortOrder"
          component={OrderBy}
          variables={variablesForSubject}
        />
      </Row>
    }
  </Section>
);

PromptFields.propTypes = {
  allowPositioning: PropTypes.bool,
  entity: PropTypes.string.isRequired,
  handleCreateVariable: PropTypes.func.isRequired,
  layoutVariablesForSubject: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  variablesForSubject: PropTypes.object.isRequired,
};

PromptFields.defaultProps = {
  allowPositioning: true,
};

export { PromptFields };

export default compose(
  withLayoutOptions,
  withCanCreateEdgesState,
  withCreateVariableHandlers,
)(PromptFields);
