import React, { useCallback } from 'react';
import { change, Field, formValueSelector } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { Section } from '@components/EditorLayout';
import { actionCreators as dialogActions } from '@modules/dialogs';
import { getFieldId } from '../../utils/issues';
import {
  Filter as FilterQuery, withFieldConnector, withStoreConnector, ruleValidator,
} from '../Query';
import Tip from '../Tip';
import { getEdgeFilteringWarning } from './SociogramPrompts/selectors';

const FilterField = withFieldConnector(withStoreConnector(FilterQuery));

export const handleFilterDeactivate = async (openDialog) => {
  const result = await openDialog({
    type: 'Warning',
    title: 'This will clear your filter',
    message: 'This will clear your filter, and delete any rules you have created. Do you want to continue?',
    confirmLabel: 'Clear filter',
  });

  return result;
};

const Filter = () => {
  const getFormValue = formValueSelector('edit-stage');
  const dispatch = useDispatch();
  const currentValue = useSelector((state) => getFormValue(state, 'filter'));
  const openDialog = useCallback(
    (dialog) => dispatch(dialogActions.openDialog(dialog)),
    [dispatch],
  );

  // get edge creation and display values for edges across all prompts
  // will be used to conditionally render a warning tip

  // start by getting the prompts
  const prompts = useSelector((state) => getFormValue(state, 'prompts'));

  const promptsWithEdges = prompts.filter(
    (prompt) => prompt?.edges?.create || prompt?.edges?.display,
  );

  const edgeCreationValues = promptsWithEdges.map(
    (prompt) => prompt.edges.create,
  );

  const edgeDisplayValues = promptsWithEdges.flatMap(
    (prompt) => prompt.edges.display,
  );

  let shouldShowWarning = false;

  if (edgeCreationValues.length > 0 || edgeDisplayValues.length > 0) {
    shouldShowWarning = getEdgeFilteringWarning(
      currentValue.rules,
      [...edgeCreationValues, ...edgeDisplayValues],
    );
  }

  const handleToggleChange = useCallback(
    async (newState) => {
      if (!currentValue || newState === true) {
        return true;
      }

      const confirm = await handleFilterDeactivate(openDialog);

      if (confirm) {
        dispatch(change('edit-stage', 'filter', null));
        return true;
      }

      return false;
    },
    [dispatch, openDialog, currentValue],
  );

  return (
    <Section
      title="Filter"
      toggleable
      summary={(
        <p>
          You can optionally filter which nodes or edges are shown on this stage, by creating
          one or more rules using the options below.
        </p>
      )}
      startExpanded={!!currentValue}
      handleToggleChange={handleToggleChange}
    >
      {shouldShowWarning && (
      <Tip type="warning">
        <p>
          This stage has edge creation or display values that will not be shown
          based on the current filter rules.
        </p>
      </Tip>
      )}
      <div id={getFieldId('filter')} data-name="Filter text" />
      <Field
        name="filter"
        component={FilterField}
        validate={ruleValidator}
      />
    </Section>
  );
};

export default Filter;
