import React from 'react'

export const Item = ({name, isPacked}) => {
  return (
    <li>{name} {isPacked && "✔"}</li>
  )
}
