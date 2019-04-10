import { connect } from 'react-redux';
import { change } from 'redux-form';
import { withHandlers, compose } from 'recompose';
import { actionCreators as screenActions, onScreenMessage } from '../../../ducks/modules/ui/screens';

const createTypeState = connect(
  state => ({
    ui: state.ui.message,
  }),
  {
    openScreen: screenActions.openScreen,
    changeForm: change,
  },
);

// componentDidUpdate({ ui: prevMessage }) {
//   const message = this.props.ui;
//   onUIMessage(message, prevMessage, 'variable', this.handleNewVariableMessage);
// }

const createTypeHandlers = withHandlers({
  handleUIMessage: ({ ui: message, changeForm, form }) =>
    (prevMessage) => {
      const handleTypeMessage = entity =>
        changeForm(form, 'subject', { type: entity.type, entity: 'node' });

      onScreenMessage(message, prevMessage, 'type', handleTypeMessage);
    },
  handleOpenCreateNewType: ({ openScreen }) =>
    () => {
      openScreen('type', { category: 'node' });
    },
});

const withCreateNewType = compose(
  createTypeState,
  createTypeHandlers,
);

export default withCreateNewType;
