export const languagesNames = { en: 'English', de: 'Deutsch' };
export const languages = Object.keys(languagesNames);

export const fallbackLng = 'de';
export const defaultNS = 'translation';
export const cookieName = 'i18next';

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS
) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
