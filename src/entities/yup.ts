import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Pole nie może być puste',
  },
  string: {
    max: ({ max }) => {
      switch (max) {
        case 1:
          return `Pole może miec maksymalnie ${max} znak`;
        case 2:
        case 3:
        case 4:
          return `Pole może miec maksymalnie ${max} znaki`;
        default:
          return `Pole może miec maksymalnie ${max} znaków`;
      }
    },
  },
});

export default Yup;
