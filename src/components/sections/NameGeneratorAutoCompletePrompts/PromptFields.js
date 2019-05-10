import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Field } from 'redux-form';
import { getFieldId } from '../../../utils/issues';
import ValidatedField from '../../Form/ValidatedField';
import * as Fields from '../../../ui/components/Fields';
import DataSource from '../../Form/Fields/DataSource';
import MultiSelect from '../../Form/MultiSelect';
import AssignAttributes from '../../AssignAttributes';
import withFieldValues from '../NameGeneratorListPrompts/withFieldValues';
import withExternalDataPropertyOptions, { propTypes as externalDataPropTypes } from '../NameGeneratorListPrompts/withExternalDataPropertyOptions';
import Row from '../Row';
import Section from '../Section';

const PromptFields = ({
  dataSource,
  variableOptions,
  additionalPropertiesOptionGetter,
  maxAdditionalDisplayProperties,
  form,
  entity,
  type,
}) => (
  <Section>
    <Row>
      <h3 id={getFieldId('text')}>Text for Prompt</h3>
      <p>Enter the text that the participant will see below.</p>
      <p><strong>
        Tip: You can use markdown formatting in this prompt to create
        bold or underlined text.
      </strong></p>
      <ValidatedField
        name="text"
        component={Fields.TextArea}
        label=""
        placeholder="Enter text for the prompt here"
        validation={{ required: true }}
      />
    </Row>
    <Row>
      <h3>Assign Additional Variables? <small>(optional)</small></h3>
      <p>
        You might also wish to assign additional variables to any nodes that are created by a
        participant on this prompt. You can use this feature to keep track of meta-data,
        such as where a node was elicited, or to reflect a name interpreter element of
        your prompt (for example by adding a variable called &quot;close_tie&quot; variable to a
        prompt that asks about closeness).
      </p>
      <p>
        <strong>Tip: Select an existing variable, or select &quot;create new variable&quot;
        from the bottom of the list, and then assign a value. You can set different values
        for this variable for nodes created on different prompts.</strong>
      </p>
      <AssignAttributes
        name="additionalAttributes"
        id="additionalAttributes"
        form={form}
        type={type}
        entity={entity}
      />
    </Row>
    <Row>
      <div id={getFieldId('dataSource')} data-name="Roster data-source" />
      <h3>External data-source for roster</h3>
      <p>This prompt needs a source of nodes to populate the roster.</p>
      <ValidatedField
        component={DataSource}
        name="dataSource"
        id="dataSource"
        validation={{ required: true }}
      />
    </Row>

    { dataSource &&
      <Section group>
        <Row>
          <h3>Card options</h3>
          <p>
            How would you like to the search results to be displayed?
          </p>
          <p>
            Cards will use the <strong>label</strong> attribute from your external data as
            the main card title.
          </p>
        </Row>
        <Row>
          <h4>Additional Display Properties</h4>
          <p>
            Would you like do display any other attributes to help identify each node?
          </p>

          { maxAdditionalDisplayProperties === 0 &&
            <p><em>Your external data does not contain any usable attributes.</em></p>
          }

          { maxAdditionalDisplayProperties > 0 &&
            <MultiSelect
              name="cardOptions.additionalProperties"
              maxItems={maxAdditionalDisplayProperties}
              properties={[
                {
                  fieldName: 'variable',
                },
                {
                  fieldName: 'label',
                  component: Fields.Text,
                  placeholder: 'Label',
                },
              ]}
              options={additionalPropertiesOptionGetter}
            />
          }
        </Row>
      </Section>
    }

    { dataSource &&
      <Section group>
        <Row>
          <h3>Search options</h3>
          <p>
            Which properties would you like to make searchable?
          </p>
        </Row>
        <Row>
          <h4>Search Properties</h4>
          <p>When the participant searches, which properties should be searched?</p>
          <Field
            name="searchOptions.matchProperties"
            component={Fields.CheckboxGroup}
            options={variableOptions}
          />
        </Row>
        <Row>
          <h4>Search Accuracy</h4>
          <p>How accurate does a query need to be when searching?</p>
          <p>
            If the roster contains many similar nodes, you might want to help narrow down
            searches by selecting &quot;Exact&quot; or high accuracy.
          </p>
          <p>
            A low accuracy search will allow for typos and spelling mistakes.
          </p>
          <Field
            name="searchOptions.fuzziness"
            component={Fields.RadioGroup}
            options={[
              { value: 0, label: 'Exact' },
              { value: 0.25, label: 'High accuracy' },
              { value: 0.5, label: 'Medium accurary' },
              { value: 0.75, label: 'Low accuracy' },
            ]}
          />
        </Row>
      </Section>
    }
  </Section>
);

PromptFields.propTypes = {
  type: PropTypes.string,
  entity: PropTypes.string,
  dataSource: PropTypes.string,
  form: PropTypes.string.isRequired,
  ...externalDataPropTypes,
};

PromptFields.defaultProps = {
  type: null,
  entity: null,
  dataSource: null,
};

export { PromptFields };

export default compose(
  withFieldValues(['dataSource']),
  withExternalDataPropertyOptions,
)(PromptFields);
