import React from 'react'

export default function Button({
    label,
    action = () => {},
    className,
    type = "button",
    disabled
}) {
  return (
    <button
        type={type}
        className={className}
        onClick={action}
        disabled={disabled}
    >
        {label}
    </button>
  )
}
