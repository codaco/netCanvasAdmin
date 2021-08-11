import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import cx from 'classnames';
import { getCSSVariableAsNumber } from '@codaco/ui/lib/utils/CSSVariables';
import Stackable from '@components/Stackable';
import window from '@app/behaviours/window';

const Dialog = ({
  show,
  children,
  className,
  onBlur,
}) => {
  if (!show) { return null; }

  const dialogZIndex = getCSSVariableAsNumber('--z-dialog');

  const handleBlur = useCallback((e) => {
    e.stopPropagation();
    onBlur();
  }, [onBlur]);

  return (
    <Stackable stackKey>
      {({ stackIndex }) => (
        <div
          className={cx('contextual-dialog', className)}
          style={{
            zIndex: dialogZIndex + stackIndex,
          }}
          onClick={handleBlur}
        >
          <div className="contextual-dialog__container">
            <div className="contextual-dialog__main">
              <div className="contextual-dialog__content">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </Stackable>
  );
};

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  show: PropTypes.bool,
  onBlur: PropTypes.func,
};

Dialog.defaultProps = {
  children: null,
  className: null,
  show: true,
  onBlur: () => {},
};

export default compose(
  window(document.body),
)(Dialog);
