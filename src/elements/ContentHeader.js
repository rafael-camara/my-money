import React from 'react'

const ContentHeader = props => {
  return (
    <div className='align-items-center bg-primary d-flex my-3 p-3 rounded shadow-sm text-white'>
      <h2>{props.text}</h2>
    </div>
  )
}
export default ContentHeader
