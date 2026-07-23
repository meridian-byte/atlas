export const colors = [
  {
    label: '🔴 Red',
    value: '#fa5252',
  },
  {
    label: 'Pink',
    value: '#e64980',
  },
  {
    label: 'Grape',
    value: '#be4bdb',
  },
  {
    label: 'Violet',
    value: '#7950f2',
  },
  {
    label: '🔵 Indigo',
    value: '#4c6ef5',
  },
  {
    label: 'Blue',
    value: '#228be6',
  },
  {
    label: 'Cyan',
    value: '#15aabf',
  },
  {
    label: 'Teal',
    value: '#12b886',
  },
  {
    label: '🟢 Green',
    value: '#40c057',
  },
  {
    label: 'Lime',
    value: '#82c91e',
  },
  {
    label: '🟡 Yellow',
    value: '#fab005',
  },
  {
    label: '🟠 Orange',
    value: '#fd7e14',
  },
];

// Returns the full color object e.g., { label: 'Pink', value: '#e64980' }
export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]!;
};

// Returns just the hex value e.g., '#e64980'
export const getRandomColorValue = () => {
  return getRandomColor().value;
};
