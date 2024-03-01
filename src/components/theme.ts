import type { UIThemes } from '@himalaya-ui/core/themes';
import Themes from '@himalaya-ui/core/themes';
import _ from 'lodash';

const darkThemeColors = Themes.generateColors({
  primary: '#FFFFFF',
  link: '#FFFFFF',
  error: '#fc0204',
  success: '#02fc9d',
});
const lightThemeColors = Themes.generateColors({
  primary: '#000000',
  link: '#000000',
  error: '#fc0204',
  success: '#02fc9d',
});

const darkThemeAccents = {
  background: '#000',
};

const addional = { radius: '9999px' };

const darkTheme = Themes.createFromDark({
  palette: _.merge(
    Themes.generateAccents('#000000', '#FFFFFF'),
    darkThemeColors,
    addional,
    darkThemeAccents,
    {
      border: '#4d4d4d',
    }
  ),
  style: {
    radius: '9999px',
  },
});

const lightTheme = Themes.createFromLight({
  palette: _.merge(
    Themes.generateAccents('#FFFFFF', '#000000'),
    lightThemeColors,
    addional,
    {
      border: '#D1D2D4',
    }
  ),
  style: {
    radius: '9999px',
  },
});

export const getThemes = (): Array<UIThemes> => {
  return [darkTheme, lightTheme];
};
