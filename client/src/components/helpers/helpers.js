import React from 'react'
const adaptFileEventToValue = delegate => e => delegate(e.target.files);
export const  FileInput =  ({
        input: { value: omitValue, onChange, onBlur, ...inputProps },
        meta: omitMeta,
        ...props
      }) => {
        return (
          <input
            onChange={adaptFileEventToValue(onChange)}
            onBlur={adaptFileEventToValue(onBlur)}
            type="file"
            {...props.input}
            {...props}
            multiple
          />
        );

  }

  export const  SingleFileInput =  ({
        input: { value: omitValue, onChange, onBlur, ...inputProps },
        meta: omitMeta,
        ...props
      }) => {
        return (
          <input
            onChange={adaptFileEventToValue(onChange)}
            onBlur={adaptFileEventToValue(onBlur)}
            type="file"
            {...props.input}
            {...props}
          />
        );

  }
