/* eslint-env jest */

import React from 'react';
import { v4 as uuid } from 'uuid';
import { shallow } from 'enzyme';
import { UnconnectedStage } from '../Stage';

jest.mock('@codaco/ui/lib/utils/CSSVariables');

const mockProps = {
  id: uuid(),
  stageNumber: 1,
  type: 'Foo',
  onEditStage: () => {},
  onDeleteStage: () => {},
  onEditSkipLogic: () => {},
  onInsertStage: () => {},
};

describe('<Stage />', () => {
  it('can render', () => {
    const component = shallow(<UnconnectedStage {...mockProps} />);

    expect(component).toMatchSnapshot();
  });
});
