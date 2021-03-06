import { assert }  from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as quizzesActions from '../../src/actions/quizzes';
import * as types from '../../src/actions/quizzes/constants';
import service from '../../src/config/service';
import quizzes from '../fixtures/quizzes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Quizzes Actions', () => {
	describe('fetchQuizzes()', () => {
		beforeEach(() => {
			nock(service.url)
				.persist()
				.get('/quizzes')
				.reply(200, quizzes);
		});
		it('should fetch the quizzes data', () => {
			const store = mockStore({
				quizzes: {
					isFetching: false
				}
			});
			return store.dispatch(quizzesActions.fetchQuizzesIfNeeded()).then(() => {
				assert.deepEqual(store.getActions()[0], { type: 'REQUEST_QUIZZES' });
				assert.equal(store.getActions()[1].type, 'RECEIVE_QUIZZES');
				assert.deepEqual(store.getActions()[1].items, [{
					uid: '1', title: 'My test quiz', questions: [{
						label: 'What tdd stands for?',
						answer: 'test driven development'
					}]},
					{
						uid: '2', title: 'My second test quiz', questions: [{
					  		label: 'What is Redux?',
					  		answer: 'It is Awesome.'
						}]}
					]
				);
			});
		});
		it('should not fetch the quizzes data if already fetching', () => {
			const store = mockStore({
				quizzes: {
					isFetching: true
				}
			});
			assert.equal(store.dispatch(quizzesActions.fetchQuizzesIfNeeded(quizzes)), undefined);
		});
	});
});

