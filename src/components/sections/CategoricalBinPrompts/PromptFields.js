import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { getFieldId } from '@app/utils/issues';
import { useSelector } from 'react-redux';
import { formValueSelector } from 'redux-form';
import RichTextField from '@codaco/ui/lib/components/Fields/RichText';
import { ValidatedField } from '@components/Form';
import MultiSelect from '@components/Form/MultiSelect';
import Options from '@components/Options';
import { Section, Row } from '@components/EditorLayout';
import Tip from '@components/Tip';
import PromptText from '@components/sections/PromptText';
import NewVariableWindow, { useNewVariableWindowState } from '@components/NewVariableWindow';
import { getSortOrderOptionGetter } from './optionGetters';
import withVariableOptions from './withVariableOptions';
import withVariableHandlers from './withVariableHandlers';
import VariablePicker from '../../Form/Fields/VariablePicker/VariablePicker';

const PromptFields = ({
  changeForm,
  entity,
  form,
  onCreateOtherVariable,
  optionsForVariableDraft,
  otherVariable,
  type,
  variable,
  variableOptions,
}) => {
  const newVariableWindowInitialProps = {
    entity,
    type,
    initialValues: { name: null, type: null },
  };

  const getFormValue = formValueSelector(form);
  const hasBucketSortOrder = useSelector((state) => getFormValue(state, 'bucketSortOrder'));
  const hasBinSortOrder = useSelector((state) => getFormValue(state, 'binSortOrder'));

  const handleCreatedNewVariable = (id, { field }) => changeForm(form, field, id);

  const handleToggleOtherVariable = (nextState) => {
    if (nextState === false) {
      changeForm(form, 'otherVariable', null);
      changeForm(form, 'otherVariablePrompt', null);
      changeForm(form, 'otherOptionLabel', null);
    }

    return true;
  };

  const [newVariableWindowProps, openNewVariableWindow] = useNewVariableWindowState(
    newVariableWindowInitialProps,
    handleCreatedNewVariable,
  );

  const handleNewVariable = (name) => openNewVariableWindow({ initialValues: { name, type: 'categorical' } }, { field: 'variable' });

  const categoricalVariableOptions = variableOptions
    .filter(({ type: variableType }) => variableType === 'categorical');

  const otherVariableOptions = variableOptions
    .filter(({ type: variableType }) => variableType === 'text');

  const sortMaxItems = getSortOrderOptionGetter(variableOptions)('property').length;

  const totalOptionsLength = (
    optionsForVariableDraft && optionsForVariableDraft.length
    + (!!otherVariable && 1)
  );

  const showVariableOptionsTip = totalOptionsLength > 8;

  return (
    <>
      <PromptText />
      <Section title="Categorical Variable" id={getFieldId('variable')}>
        <Row>
          <ValidatedField
            name="variable"
            component={VariablePicker}
            type={type}
            entity={entity}
            options={categoricalVariableOptions}
            onCreateOption={handleNewVariable}
            validation={{ required: true }}
            variable={variable}
          />
        </Row>
        { variable && (
        <Row>
          <h3 id={getFieldId('options')}>Variable Options</h3>
          <p>
            Create
            {' '}
            <strong>up to 8</strong>
            {' '}
            options for this variable.
          </p>
          { showVariableOptionsTip && (
            <Tip type="error">
              <p>
                The categorical bin interface is designed to use
                {' '}
                <strong>
                  up to 8 option values
                </strong>
                {' '}
                (
                including an &quot;other&quot; variable). Using more will create
                a sub-optimal experience for participants, and might reduce data quality.
                Consider grouping your variable options and capturing further detail with
                follow-up questions.
              </p>
            </Tip>
          )}
          <Options
            name="variableOptions"
            label="Options"
          />
        </Row>
        )}
      </Section>
      <Section
        disabled={!variable}
        title="Follow-up &quot;Other&quot; Option"
        summary={(
          <p>
            You can optionally create an &quot;other&quot; option that triggers a
            follow-up dialog
            when nodes are dropped within it, and stores the value the participant enters in a
            designated variable. This feature may be useful in order to collect values
            you might not have listed above.
          </p>
        )}
        toggleable
        startExpanded={!!otherVariable}
        handleToggleChange={handleToggleOtherVariable}
      >
        <Row>
          <ValidatedField
            name="otherVariable"
            component={VariablePicker}
            entity={entity}
            type={type}
            options={otherVariableOptions}
            onCreateOption={(value) => onCreateOtherVariable(value, 'otherVariable')}
            validation={{ required: true }}
            variable={otherVariable}
          />
        </Row>
        <Row>
          <ValidatedField
            name="otherOptionLabel"
            component={RichTextField}
            inline
            placeholder="Enter a label (such as &quot;other&quot;) for this bin..."
            label="Label for Bin"
            validation={{ required: true }}
          />
        </Row>
        <Row>
          <ValidatedField
            name="otherVariablePrompt"
            component={RichTextField}
            inline
            placeholder="Enter a question prompt to show when the other option is triggered..."
            label="Question Prompt for Dialog"
            validation={{ required: true }}
          />
        </Row>
      </Section>
      <Section
        title="Bucket Sort Order"
        summary={(
          <p>
            Nodes are stacked in the bucket before they are placed by the participant. You may
            optionally configure a list of rules to determine how nodes are sorted in the bucket
            when the task starts, which will determine the order that your participant places them
            into bins. Interviewer will default to using the order in which nodes were named.
          </p>
        )}
        toggleable
        disabled={!variable}
        startExpanded={!!hasBucketSortOrder}
      >
        <Row>
          <Tip>
            <p>
              Use the asterisk property to sort by the order that nodes were created.
            </p>
          </Tip>
          <MultiSelect
            name="bucketSortOrder"
            properties={[
              { fieldName: 'property' },
              { fieldName: 'direction' },
            ]}
            maxItems={sortMaxItems}
            options={getSortOrderOptionGetter(variableOptions)}
          />
        </Row>
      </Section>
      <Section
        title="Bin Sort Order"
        summary={(
          <p>
            You may also configure one or more sort rules that determine the order that nodes
            are listed after they have been placed into a bin.
          </p>
        )}
        toggleable
        disabled={!variable}
        startExpanded={!!hasBinSortOrder}
      >
        <Row>
          <MultiSelect
            name="binSortOrder"
            properties={[
              { fieldName: 'property' },
              { fieldName: 'direction' },
            ]}
            maxItems={sortMaxItems}
            options={getSortOrderOptionGetter(variableOptions)}
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

const selectOptionProps = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.bool,
  ]),
});

PromptFields.propTypes = {
  entity: PropTypes.string.isRequired,
  otherVariable: PropTypes.string,
  type: PropTypes.string.isRequired,
  variable: PropTypes.string,
  variableOptions: PropTypes.arrayOf(selectOptionProps),
  changeForm: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  onCreateOtherVariable: PropTypes.func.isRequired,
  optionsForVariableDraft: PropTypes.arrayOf(selectOptionProps),
};

PromptFields.defaultProps = {
  variable: null,
  otherVariable: null,
  variableOptions: [],
  optionsForVariableDraft: [],
};

export default compose(
  withVariableOptions,
  withVariableHandlers,
)(PromptFields);
