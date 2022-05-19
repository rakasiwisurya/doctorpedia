export const parseArray = listObject => {
  return Object.keys(listObject)
    .map(key => ({...listObject[key]}))
    .sort((a, b) => b.rate - a.rate);
};
