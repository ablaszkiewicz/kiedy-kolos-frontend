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
  array: {
    min: ({ min }) => {
      switch (min) {
        case 1:
          return `Pole musi mieć przynajmniej ${min} element`;
        case 2:
        case 3:
        case 4:
          return `Pole musi mieć przynajmniej ${min} elementy`;
        default:
          return `Pole musi mieć przynajmniej ${min} elementów`;
      }
    },
  },
});

export default Yup;
