import React from 'react';

export const  renderField = ({ input, label, type,component,cols,rows, steps,meta: { touched, error, warning } }) => {
  if(type==='textarea'){
    return (
      <div>
        <label>{label}</label>
        <div>
          <textarea {...input} cols={cols} rows={rows} placeholder={label} type={type} className="form-control"/>
          {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-danger">{warning}</span>))}
        </div>
      </div>
    )
  }
  return (
    <div>
      <label>{label}</label>
      <div>
        <input min={1} {...input} step={steps} placeholder={label} type={type} className="form-control"/>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-danger">{warning}</span>))}
      </div>
    </div>
  )
}

