import React from 'react'

const Button = ({title}) => {
  return (
    <div>
        <button className='btn'>
            {title}
        </button>
    </div>
  )
}

export default Button