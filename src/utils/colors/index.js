const mainColors = {
  green1: '#0BCAD4',
  green2: '#EDFCFD',
  blue1: '#0066CB',
  dark1: '#112340',
  dark2: '#495A75',
  dark3: '#8092AF',
  gray1: '#7D8797',
  gray2: '#E9E9E9',
  gray3: '#EDEEF0',
  white1: 'white',
};

export const colors = {
  primary: mainColors.green1,
  secondary: mainColors.dark1,
  tertiary: mainColors.blue1,
  white: mainColors.white1,
  black: mainColors.dark1,
  disable: mainColors.gray3,
  text: {
    primary: mainColors.dark1,
    secondary: mainColors.gray1,
    menuInactive: mainColors.dark2,
    menuActive: mainColors.green1,
    subTitle: mainColors.dark3,
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
  cardLight: mainColors.green2,
};
