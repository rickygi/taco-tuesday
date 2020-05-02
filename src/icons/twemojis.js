const baseUrl = 'https://twemoji.maxcdn.com/v/latest/';

const icons = [
  { code: '1f345', title: 'tomato', format: 'svg' },
  { code: '1f951', title: 'avacado', format: 'svg' },
  { code: '1f33d', title: 'ear of corn', format: 'svg' },
  { code: '1f336', title: 'hot pepper', format: 'svg' },
  { code: '1f96c', title: 'leafy green', format: 'svg' },
  { code: '1f9c5', title: 'onion', format: 'svg' },
  { code: '1f9c0', title: 'cheese', format: 'svg' }
];

const twemojis = icons.map((icon) => {
  return {
    code: icon.code,
    title: icon.title,
    src: `${baseUrl}${icon.format}/${icon.code}.${icon.format}`
  };
});

export { twemojis };
