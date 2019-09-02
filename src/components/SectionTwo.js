import React from 'react'

const Section = (props) => {
  return(
    <div>
      <p>
        <label>
          Your Email: <input type="email" name="email" value={props.email} onChange={props.callback} />
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="message" value={props.message} onChange={props.callback} />
        </label>
      </p>
  </div>
  )
}

export default Section