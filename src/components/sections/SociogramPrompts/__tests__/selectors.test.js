/* eslint-env jest */

import mockState from '../../../../__tests__/testState.json';
import {
  getLayoutVariablesForSubject,
  getHighlightVariablesForSubject,
  getEdgesForSubject,
  getEdgeFilteringWarning,
} from '../selectors';

jest.mock('redux-form', () => ({
  formValueSelector: () => () => '1234-1234-4',
  getFormValues: () => () => ({}),
}));

const subject = {
  entity: 'node',
  type: '1234-1234-1234',
};
const form = 'edit-prompt';

describe('SociogramPrompts', () => {
  describe('selectors', () => {
    it('get layout variables for node type', () => {
      const result = getLayoutVariablesForSubject(mockState, subject);

      expect(result).toMatchSnapshot();
    });

    it('get highlight variables for node type', () => {
      const result = getHighlightVariablesForSubject(mockState, {
        form,
        ...subject,
        formUsedVariableIndex: ['1234-1234-3'],
      });

      expect(result).toMatchSnapshot();
    });

    it('get edges for node type', () => {
      const result = getEdgesForSubject(mockState, subject);

      expect(result).toMatchSnapshot();
    });

    it('get edge filters', () => {
      const result = getEdgesForSubject(mockState, subject);

      expect(result).toMatchSnapshot();
    });
  });

  describe('getEdgeFilteringWarning', () => {
    // Case 1: Selected edge is in EXISTS filters - no warning
    it('returns false when selected edges match EXISTS filters', () => {
      const filters = [
        { options: { operator: 'EXISTS', type: '1' } },
        { options: { operator: 'EXISTS', type: '2' } },
      ];
      const edges = ['1', '2'];

      const result = getEdgeFilteringWarning(filters, edges);
      expect(result).toBe(false);
    });

    // Case 2: Selected edge is not in EXISTS filters - show warning
    it('returns true when selected edges do not match EXISTS filters', () => {
      const filters = [
        { options: { operator: 'EXISTS', type: '1' } },
      ];
      const edges = ['2', '3'];

      const result = getEdgeFilteringWarning(filters, edges);
      expect(result).toBe(true);
    });

    // Case 3: Selected edge is in DOES_NOT_EXIST filters - show warning
    it('returns true when selected edges match DOES_NOT_EXIST filters', () => {
      const filters = [
        { options: { operator: 'NOT_EXISTS', type: '1' } },
      ];
      const edges = ['1'];

      const result = getEdgeFilteringWarning(filters, edges);
      expect(result).toBe(true);
    });

    // Case 4: Selected edge is not in DOES_NOT_EXIST filters - no warning
    it('returns false when selected edges do not match DOES_NOT_EXIST filters', () => {
      const filters = [
        { options: { operator: 'NOT_EXISTS', type: '1' } },
      ];
      const edges = ['2', '3'];

      const result = getEdgeFilteringWarning(filters, edges);
      expect(result).toBe(false);
    });

    // Mixed filters
    it('handles mixed filter scenarios correctly', () => {
      const filters = [
        { options: { operator: 'EXISTS', type: '1' } },
        { options: { operator: 'NOT_EXISTS', type: '2' } },
      ];
      const edges = ['3', '2'];

      const result = getEdgeFilteringWarning(filters, edges);
      expect(result).toBe(true);
    });

    // Empty filter
    it('returns false when no filters and no edges', () => {
      const filters = [];
      const edges = [];

      const result = getEdgeFilteringWarning(filters, edges);
      expect(result).toBe(false);
    });
  });
});
