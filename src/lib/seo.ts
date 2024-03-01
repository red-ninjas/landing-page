export const createSeoTitle = (title?: string) => {
  return `${title} - ${process.env.APP_TITLE}`;
};
