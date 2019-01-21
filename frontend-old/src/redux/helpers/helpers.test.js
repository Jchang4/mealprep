import { recipeQueryToArray } from './index.js';

describe('redux helpers', () => {
  describe('#recipeQueryToArray', () => {
    test('should change string into array of query items', () => {
      let tests = [
        {test: 'chicken, eggs', answer: ['chicken', 'eggs']},
        {test: 'chicken eggs', answer: ['chicken', 'eggs']},
        {test: 'bacon, avocado tomatos, potatos', answer: ['bacon', 'avocado', 'tomatos', 'potatos']},
      ];

      tests.forEach(t => {
        expect(recipeQueryToArray(t.test).sort()).toEqual(t.answer.sort());
      });
    });
  });


});
