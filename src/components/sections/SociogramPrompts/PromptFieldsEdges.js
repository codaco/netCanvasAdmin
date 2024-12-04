/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { union } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { change, Field, formValueSelector } from 'redux-form';
import * as Fields from '@codaco/ui/lib/components/Fields';
import { Section, Row } from '@components/EditorLayout';
import Tip from '../../Tip';
import { getEdgesForSubject } from './selectors';

const DisplayEdges = ({ form, entity, type }) => {
  const dispatch = useDispatch();
  const edgesForSubject = useSelector((state) => getEdgesForSubject(state, { entity, type }));
  const createEdge = useSelector((state) => formValueSelector(form)(state, 'edges.create'));
  const displayEdges = useSelector((state) => formValueSelector(form)(state, 'edges.display'));

  const displayEdgesOptions = edgesForSubject.map((edge) => {
    if (edge.value !== createEdge) { return edge; }
    return {
      ...edge,
      disabled: true,
    };
  });

  const hasDisabledEdgeOption = displayEdgesOptions.some((option) => option.disabled);

  useEffect(() => {
    const displayEdgesWithCreatedEdge = union(displayEdges, [createEdge]);
    dispatch(change(form, 'edges.display', displayEdgesWithCreatedEdge));
  }, [createEdge]);

  // get the current filters from the stage
  const getStageValue = formValueSelector('edit-stage');
  const currentFilters = useSelector((state) => getStageValue(state, 'filter'));
  const edgeFilters = currentFilters.rules.filter((rule) => rule.type === 'edge');

  // TODO: look at this logic to see if it's correct for all cases
  const selectedEdgesNotInFilters = displayEdges.filter(
    (selectedEdge) => !edgeFilters.some((edgeFilter) => edgeFilter.options.type === selectedEdge),
  );

  return (
    <>
      <Section
        title="Display Edges"
        summary={(
          <p>
            You can display one or more edge types on this prompt. Where two nodes are connected
            by multiple edge types, only one of those edge types will be displayed.
          </p>
        )}
        toggleable
        startExpanded={!!displayEdges}
        disabled={edgesForSubject.length === 0}
        handleToggleChange={(value) => {
          // Disallow closing when there is a disabled edge option
          if (!value && hasDisabledEdgeOption) {
            return false;
          }

          if (value) {
            return true;
          }

          // Reset edge creation
          dispatch(change(form, 'edges.display', null));
          return true;
        }}
      >
        <Row>
          {selectedEdgesNotInFilters.length > 0 && (
          <Tip type="warning">
            <p>
              One or more of the selected edge types are not currently included in the
              stage-level network filtering. If they are not included, the edges will not be
              displayed.
            </p>
          </Tip>
          )}
          { hasDisabledEdgeOption && (
            <Tip>
              <p>
                The edge type being created must always be displayed. This
                edge type is shown in italics below, and cannot be deselected.
              </p>
            </Tip>
          )}
          <Field
            name="edges.display"
            component={Fields.CheckboxGroup}
            options={displayEdgesOptions}
            label="Display edges of the following type(s)"
          />
        </Row>
      </Section>
    </>
  );
};

DisplayEdges.propTypes = {
  form: PropTypes.string.isRequired,
  entity: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default DisplayEdges;
