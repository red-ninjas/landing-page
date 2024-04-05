import type { UIThemes } from '@himalaya-ui/core/themes';
import Themes from '@himalaya-ui/core/themes';

const darkThemeColors = Themes.makeColors({
  primary: '#FFFFFF',
  link: '#FFFFFF',
  error: '#fc0204',
  success: '#02fc9d',
  background: '#000000',
  foreground: '#ffffff',
  border: '#4d4d4d',
});

const lightThemeColors = Themes.makeColors({
  primary: '#000000',
  link: '#000000',
  error: '#fc0204',
  success: '#02fc9d',
  background: '#ffffff',
  foreground: '#000000',
  border: '#D1D2D4',
});

const darkTheme = Themes.createFromDark({
  palette: darkThemeColors,
});

const lightTheme = Themes.createFromLight({
  palette: lightThemeColors,
});

export const getThemes = (): Array<UIThemes> => {
  return [darkTheme, lightTheme];
};
