import { assert } from 'chai';
import quiz from '../fixtures/quiz';
import questionsReducer from '../../src/reducers/questions';

describe('Questions Reducer', () => {
	it('should return the initial state', () => {
		assert.deepEqual(questionsReducer(undefined, {}), {
			items: [],
			active: {},
			isAsking: false
		});
	});

	describe('askQuestion', () => {
		it('should shuffle the questions array and remove the last active questions', () => {

		});
		it('should remove the already asked questions from the questions state', () => {
			
		})
		it('should get the active question', ()=> {
			
		});


	});


});
