import React from 'react'

const Section = (props) => {
  return(
    <div>
      <p>
      <label>
        Local: <input type="text" name="local" value={props.local} onChange={props.callback} />
      </label>
    </p>
    <p>
      <label>
        Your Name: <input type="text" name="name" value={props.name} onChange={props.callback} />
      </label>
    </p>
  </div>
  )
}

export default Section