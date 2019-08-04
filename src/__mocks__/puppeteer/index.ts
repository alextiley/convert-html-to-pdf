import noop from 'lodash/fp/noop';

export const page = {
  on: jest.fn().mockImplementation(noop),
  goto: jest.fn().mockImplementation(noop),
  setContent: jest.fn().mockReturnValue(Promise.resolve()),
  pdf: jest.fn().mockReturnValue(Promise.resolve(Buffer.from('PDF'))),
};

export const browser = {
  newPage: jest.fn().mockReturnValue(Promise.resolve(page)),
  close: jest.fn(),
};

export const puppeteer = {
  launch: jest.fn().mockReturnValue(Promise.resolve(browser)),
};

export default puppeteer;
