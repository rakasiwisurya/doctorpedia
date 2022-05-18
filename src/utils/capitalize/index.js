export const capitalize = text => {
  // if text has a whitespace
  if (text.indexOf(' ') >= 0) {
    const words = text.split(' ');

    return words
      .map(word => word[0].toUpperCase() + word.substring(1))
      .join(' ');
  }

  // if text has no a whitespace
  return text[0].toUpperCase() + text.substring(1);
};
