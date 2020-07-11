export const notNullAndEmptyString = str => {
  return str && (typeof str === 'string' || str instanceof String) && str.trim().length > 0
}
