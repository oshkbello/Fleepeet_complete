export const required = value => value ? undefined : 'Required Field*'
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
  export const exactLength = (length,message) => value =>
  value && value.length < length ? `${message} ${length}` : undefined;
  export const passwordsMatch = (value, allValues) => 
  value !== allValues.password ? 'Passwords don\'t match' : undefined;