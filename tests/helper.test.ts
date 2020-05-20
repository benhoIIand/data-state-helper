import { describe, expect, test } from '@jest/globals'
import { Data, DataResponse, getProcessingPage } from '../src/helper';

interface TestData {
  input: Data[];
  result: DataResponse;
}

describe('data helper', () => {

  const SCENARIOS: TestData[] = [
    {
      input: [
        { state: 'processing', errorCode: null },
        { state: 'error', errorCode: null },
      ], result: {
        title: 'Error page',
        message: null,
      }
    },
    {
      input: [
        { state: 'processing', errorCode: null },
        { state: 'error', errorCode: null },
      ], result: {
        title: 'Error page',
        message: null,
      }
    },
    {
      input: [
        { state: 'processing', errorCode: null },
        { state: 'error', errorCode: undefined },
      ], result: {
        title: 'Error page',
        message: null,
      }
    },
    {
      input: [
        { state: 'processing', errorCode: null },
        { state: 'error', errorCode: 'NO_STOCK' },
      ], result: {
        title: 'Error page',
        message: 'No stock has been found',
      }
    },
    {
      input: [
        { state: 'processing', errorCode: null },
        { state: 'error', errorCode: 'INCORRECT_DETAILS' },
      ], result: {
        title: 'Error page',
        message: 'Incorrect details have been entered',
      }
    },
    {
      input: [
        { state: 'processing', errorCode: null },
        { state: 'success', errorCode: null },
      ], result: {
        title: 'Order complete',
        message: null,
      }
    },
    {
      input: [
        { state: 'processing', errorCode: null },
        { state: 'processing', errorCode: null },
        { state: 'success', errorCode: null },
      ], result: {
        title: 'Order complete',
        message: null,
      }
    },
  ];

  SCENARIOS.forEach(({ input, result }) => {
    test(`gets the correct processing page with the input: ${input.map(o => JSON.stringify(o))}`, async () => {
      const response = await getProcessingPage(input);

      expect(response).toEqual(result);
    });
  });

  test(`when an invalid state is given, an error is thrown`, async () => {
    expect(async () => {
      await getProcessingPage([
        { state: 'idle', errorCode: null },
        { state: 'success', errorCode: null },
      ])
    }).rejects.toThrow('State not recognised');
  });
});
