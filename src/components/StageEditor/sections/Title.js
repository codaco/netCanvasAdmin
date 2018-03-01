import React from 'react';
import PropTypes from 'prop-types';
import { SeamlessTextInput } from '../../../components/Form';

const Title = ({ stage: { title }, onChange }) => ([
  <div className="edit-stage__section" key="edit">
    <SeamlessTextInput value={title} onChange={newTitle => onChange({ title: newTitle })} />
  </div>,
  <div className="edit-skip-logic__guidance" key="guidance">
    What is the title for this interface?
  </div>,
]);

Title.propTypes = {
  stage: PropTypes.object,
  onChange: PropTypes.func,
};

Title.defaultProps = {
  stage: {},
  onChange: () => {},
};

export default Title;
