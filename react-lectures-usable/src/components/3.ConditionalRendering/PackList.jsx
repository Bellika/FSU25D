import React from 'react'
import { Item } from './Item'

export const PackList = () => {
  return (
    <section>
      <h2>My PackList</h2>
      <ul>
        <Item name="Computer" isPacked={true} />
        <Item name="Training gear" isPacked={true} />
        <Item name="Ear plugs" isPacked={false} />
      </ul> 
    </section>
  )
}
