import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import anime from 'animejs';
import { getCSSVariableAsNumber } from '../../utils/CSSVariables';

const duration = getCSSVariableAsNumber('--animation-duration-fast-ms');

const appear = {
  opacity: [0, 1],
  translateX: ['-100%', 0],
  elasticity: 0,
  easing: 'easeInOutQuad',
  duration,
};

const disappear = {
  opacity: [1, 0],
  translateX: [0, '-100%'],
  margin: 0,
  elasticity: 0,
  easing: 'easeInOutQuad',
  duration,
};

const FolderTransition = ({ children, ...props }) => (
  <Transition
    timeout={duration}
    onEntering={el => anime({ targets: el, ...appear })}
    onExiting={el => anime({ targets: el, ...disappear })}
    {...props}
  >
    { children }
  </Transition>
);

FolderTransition.propTypes = {
  children: PropTypes.any.isRequired,
};

FolderTransition.defaultProps = {
  children: null,
};

export default FolderTransition;
