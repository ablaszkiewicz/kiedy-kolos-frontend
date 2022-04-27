import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Pole nie może być puste',
  },
  string: {
    max: ({ max }) => {
      switch (max) {
        case 1:
          return `Pole może mieć maksymalnie ${max} znak`;
        case 2:
        case 3:
        case 4:
          return `Pole może mieć maksymalnie ${max} znaki`;
        default:
          return `Pole może mieć maksymalnie ${max} znaków`;
      }
    },
  },
  number: {
    min: ({ min }) => `Pole musi być większe od ${min}`,
    max: ({ max }) => `Pole musi być mniejsze od ${max}`,
  },
});

export default Yup;
