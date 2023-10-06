import PropTypes from 'prop-types'
import { useState, useImperativeHandle, forwardRef } from 'react'

interface TogglableProps {
  buttonLabel: string;
  buttonLabelExit: string;
  reviewTitle: string;
  children?: React.ReactNode;
}

interface TogglableHandle {
  toggleVisibility: () => void;
}

const Togglable = forwardRef<TogglableHandle, TogglableProps>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false)

  const hideWhenVisible = {
    display: visible ? 'none' : '',
  }
  const showWhenVisible = {
    display: visible ? '' : 'none',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <h1>
            {props.reviewTitle}&nbsp;
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </h1>
      </div>
      <div style={showWhenVisible}>
        <h1>
            {props.reviewTitle}&nbsp;
            <button onClick={toggleVisibility}>{props.buttonLabelExit}</button>
        </h1>
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonLabelExit: PropTypes.string.isRequired,
  reviewTitle: PropTypes.string.isRequired
}

export default Togglable