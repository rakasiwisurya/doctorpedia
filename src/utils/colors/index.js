const mainColors = {
  green1: '#0BCAD4',
  dark1: '#112340',
  dark2: '#495A75',
  gray1: '#7D8797',
  gray2: '#E9E9E9',
  white1: 'white',
};

export const colors = {
  primary: mainColors.green1,
  secondary: mainColors.dark1,
  white: mainColors.white1,
  black: mainColors.dark1,
  text: {
    primary: mainColors.dark1,
    secondary: mainColors.gray1,
    menuInactive: mainColors.dark2,
    menuActive: mainColors.green1,
  },
  button: {
    primary: {
      background: mainColors.green1,
      text: mainColors.white1,
    },
    secondary: {
      background: mainColors.white1,
      text: mainColors.dark1,
    },
  },
  border: mainColors.gray2,
};
