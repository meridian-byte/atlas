export const colors = [
  {
    label: 'Gray',
    colorName: 'gray',
    hex: '#868e96',
  },

  {
    label: 'Red',
    colorName: 'red',
    hex: '#fa5252',
  },

  {
    label: 'Pink',
    colorName: 'pink',
    hex: '#e64980',
  },

  {
    label: 'Grape',
    colorName: 'grape',
    hex: '#be4bdb',
  },

  {
    label: 'Violet',
    colorName: 'violet',
    hex: '#7950f2',
  },

  {
    label: 'Indigo',
    colorName: 'indigo',
    hex: '#4c6ef5',
  },

  {
    label: 'Blue',
    colorName: 'blue',
    hex: '#228be6',
  },

  {
    label: 'Cyan',
    colorName: 'cyan',
    hex: '#15aabf',
  },

  {
    label: 'Teal',
    colorName: 'teal',
    hex: '#12b886',
  },

  {
    label: 'Green',
    colorName: 'green',
    hex: '#40c057',
  },

  {
    label: 'Lime',
    colorName: 'lime',
    hex: '#82c91e',
  },

  {
    label: 'Yellow',
    colorName: 'yellow',
    hex: '#fab005',
  },

  {
    label: 'Orange',
    colorName: 'orange',
    hex: '#fd7e14',
  },
];

// Returns the full color object e.g., { label: 'Pink', value: '#e64980' }
export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]!;
};

// Returns just the hex value e.g., '#e64980'
export const getRandomColorHex = () => {
  return getRandomColor().hex;
};

// Returns just the color name e.g., 'pink'
export const getRandomColorName = () => {
  return getRandomColor().colorName;
};
