import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import RadioGroup from '@codaco/ui/lib/components/Fields/RadioGroup';
import { Field as RichText } from '@codaco/ui/lib/components/Fields/RichText';
import { Section, Row } from '@components/EditorLayout';
import { getFieldId } from '../../../utils/issues';
import ValidatedField from '../../Form/ValidatedField';
import { Image, Audio, Video } from '../../Form/Fields';
import { typeOptions } from './options';
import withItemHandlers from './withItemHandlers';

const contentInputs = {
  text: RichText,
  image: Image,
  audio: Audio,
  video: Video,
};

const getInputComponent = (type) => get(contentInputs, type, RichText);

const ItemEditor = ({
  type,
  handleChangeType,
}) => (
  <Section
    title="Type"
  >
    <Row>
      <div id={getFieldId('type')} data-name="Content Type" />
      <ValidatedField
        name="type"
        component={RadioGroup}
        options={typeOptions}
        validation={{ required: true }}
        onChange={handleChangeType}
      />
    </Row>
    <Row disabled={!type}>
      <h3 id={getFieldId('content')}>Content</h3>
      <ValidatedField
        name="content"
        component={getInputComponent(type)}
        validation={{ required: true }}
      />
    </Row>
  </Section>
);

ItemEditor.propTypes = {
  type: PropTypes.string,
  handleChangeType: PropTypes.func.isRequired,
};

ItemEditor.defaultProps = {
  type: null,
};

export default withItemHandlers(ItemEditor);
