#### Instructions

This was built using `node v14.3.0`. It should work in older versions, but may not.

Install dependencies by running `yarn install` or `npm install`

To run the tests, run `yarn test` or `npm test`

The compile the TypeScript file, run `yarn build` or `npm run build`

#### Notes

There are a few assumptions made:
- `processing` can be followed by any state, but `error` or `success` will not be followed by anything else
- using the `getProcessingPage` function will return a promise

