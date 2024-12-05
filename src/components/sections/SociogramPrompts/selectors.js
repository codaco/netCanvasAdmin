import { getCodebook } from '@selectors/protocol';
import { getVariableOptionsForSubject } from '@selectors/codebook';
import { asOptions } from '@selectors/utils';

export const getLayoutVariablesForSubject = (state, { entity, type }) => {
  const variableOptions = getVariableOptionsForSubject(state, { entity, type });
  const layoutOptions = variableOptions.filter(
    ({ type: variableType }) => variableType === 'layout',
  );

  return layoutOptions;
};

export const getHighlightVariablesForSubject = (
  state,
  { type, entity },
) => {
  // All defined variables that match nodeType
  const variableOptions = getVariableOptionsForSubject(state, { entity, type });

  // Boolean variables which aren't already used (+ currently selected)
  const highlightVariables = variableOptions.filter(
    ({ type: variableType }) => variableType === 'boolean',
  );

  return highlightVariables;
};

export const getEdgesForSubject = (state) => {
  const codebook = getCodebook(state);
  const codebookOptions = asOptions(codebook.edge);

  return codebookOptions;
};

// compare selected edges to edge filters
// there are four cases to consider:
// 1. selected edge is in the filters with rule EXISTS -- no warning
// 2. selected edge is not in the filters with rule EXISTS -- show a warning
// 3. selected edge is in the filters with rule DOES_NOT_EXIST -- show a warning
// 4. selected edge is not in the filters with rule DOES_NOT_EXIST -- no warning

export const getEdgeFilteringWarning = (filters, edges) => {
  const existFilters = filters.filter((rule) => rule.options.operator === 'EXISTS');
  const doesNotExistFilters = filters.filter((rule) => rule.options.operator === 'NOT_EXISTS');

  // if any edge should show a warning, return true
  return edges.some((edge) => {
    const isEdgeInExistFilters = existFilters.some((rule) => rule.options.type === edge);
    const isEdgeInDoesNotExistFilters = doesNotExistFilters.some(
      (rule) => rule.options.type === edge,
    );

    // case 1
    if (isEdgeInExistFilters) {
      return false;
    }

    // case 2
    if (!isEdgeInExistFilters && existFilters.length > 0) {
      return true;
    }

    // case 3
    if (isEdgeInDoesNotExistFilters) {
      return true;
    }

    // No warning in other cases
    return false;
  });
};
