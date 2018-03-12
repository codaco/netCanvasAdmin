/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { Section, Edit, Guidance } from '../../Guided';
import { OptionsInput } from '../../../components/Form';

const options = [
  'foo',
  'bar',
];

const NodeTypeOption = ({ selected, value }) => (
  <div className="edit-stage-node-type__option">
    {value} {selected && ' (selected)'}
  </div>
);

const NodeType = ({ stage: { nodeType }, onChange, ...props }) => (
  <Section className="stage-editor-section" {...props}>
    <Edit className="stage-editor-section__edit">
      <h2>Node Type</h2>
      <p>Which type of node does this name generator create?</p>
      <OptionsInput
        options={options}
        component={NodeTypeOption}
        value={nodeType}
        onChange={(value) => onChange({ nodeType: value })}
      />
    </Edit>
    <Guidance className="stage-editor-section__guidance">
      What is the title for this interface?
    </Guidance>
  </Section>
);

NodeType.propTypes = {
  stage: PropTypes.object,
  onChange: PropTypes.func,
};

NodeType.defaultProps = {
  stage: {},
  onChange: () => {},
};

export default NodeType;
