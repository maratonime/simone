// @flow

import { getContests } from '../../../src/judges/codechef/getContests';
import nock from 'nock';

// For some reason if we mock the Date constructor jest does not work properly
const date = new Date(Date.UTC(2018, 4, 8, 10));
const old_now = Date.now;
beforeEach(() => {
  (Date: any).now = () => new Date(date);
  nock('https://www.codechef.com')
    .get('/contests')
    .replyWithFile(200, 'tests/resources/codechef.html');
});
afterEach(() => {
  (Date: any).now = old_now;
});

test('retrieve all contests', () => {
  return expect(getContests({})).resolves.toMatchSnapshot();
});

test('filtering', () => {
  return expect(
    getContests({
      startFrom: new Date(date.getTime() - 1000 * 60 * 60 * 24 * 30),
      startTo: new Date(date.getTime() + 1000 * 60 * 60 * 24 * 5),
    }),
  ).resolves.toMatchSnapshot();
});
