import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Field } from 'redux-form';
import { ValidatedField } from '../Form';
import Guidance from '../Guidance';
import * as Fields from '../../ui/components/Fields';
import * as ArchitectFields from '../Form/Fields';
import Variables from './Variables';
import IconOption from './IconOption';
import { getFieldId } from '../../utils/issues';

const TypeEditor = ({
  toggleCodeView,
  form,
  category,
  type,
  colorOptions,
  iconOptions,
  displayVariables,
}) => (
  <div className="type-editor editor__sections">
    { type && <h1>Edit {category}</h1> }
    { !type && <h1>Create {category}</h1> }
    <small>(<a onClick={toggleCodeView}>Show Code View</a>)</small>

    <Guidance contentId="guidance.registry.type.label">
      <div className="editor__section">
        <h2 id={getFieldId('label')}>Label</h2>

        <ValidatedField
          component={Fields.Text}
          name="label"
          validation={{ required: true }}
        />
      </div>
    </Guidance>

    <Guidance contentId="guidance.registry.type.color">
      <div className="editor__section">
        <h2 id={getFieldId('color')}>Color</h2>

        <ValidatedField
          component={ArchitectFields.ColorPicker}
          name="color"
          colors={get(colorOptions, category, [])}
          validation={{ required: true }}
        />
      </div>
    </Guidance>

    { category === 'node' &&
      <React.Fragment>
        <Guidance contentId="guidance.registry.type.icon">
          <div className="editor__section">
            <h2 id={getFieldId('iconVariant')}>Icon</h2>

            <ValidatedField
              component={Fields.RadioGroup}
              name="iconVariant"
              options={iconOptions}
              optionComponent={IconOption}
              validation={{ required: true }}
            />
          </div>
        </Guidance>

        <Guidance contentId="guidance.registry.type.displayVariable">
          <div className="editor__section">
            <h2>Display Variable</h2>

            <Field
              component={ArchitectFields.Select}
              name="displayVariable"
              options={displayVariables}
            >
              <option value="">&mdash; Select display variable &mdash;</option>
            </Field>
          </div>
        </Guidance>
      </React.Fragment>
    }

    <Guidance contentId="guidance.registry.type.variables">
      <div className="editor__section">
        <h2>Variables</h2>
        <Variables
          form={form}
          name="variables"
        />
      </div>
    </Guidance>
  </div>
);

TypeEditor.propTypes = {
  toggleCodeView: PropTypes.func.isRequired,
  type: PropTypes.string,
  colorOptions: PropTypes.shape({
    node: PropTypes.array.isRequired,
    edge: PropTypes.array.isRequired,
  }),
  iconOptions: PropTypes.array,
  category: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  displayVariables: PropTypes.array.isRequired,
};

TypeEditor.defaultProps = {
  type: null,
  colorOptions: { node: [], edge: [] },
  iconOptions: [],
};

export { TypeEditor };

export default TypeEditor;
