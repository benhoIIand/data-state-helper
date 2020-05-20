type DataState = 'processing' | 'error' | 'success';
type ErrorCode = 'NO_STOCK' | 'INCORRECT_DETAILS' | null | undefined;

export interface Data {
  state: DataState;
  errorCode: ErrorCode;
}

export interface DataResponse {
  title: string;
  message: string | null;
}

const ERROR_MESSAGE_MAP = {
  NO_STOCK: 'No stock has been found',
  INCORRECT_DETAILS: 'Incorrect details have been entered',
};

/**
 * Processes "data" for 2 seconds
 */
async function process(): Promise<DataResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: 'Processing', message: null });
    }, 2000);
  });
}

/**
 * Handle errors
 */
async function handleError(data: Data): Promise<DataResponse> {
  const message = ERROR_MESSAGE_MAP[data.errorCode] || null;

  return Promise.resolve({ title: 'Error page', message });
}

/**
 * Handle success
 */
async function handleSuccess(): Promise<DataResponse> {
  return Promise.resolve({ title: 'Order complete', message: null });
}

/**
 * Gets the processing page
 * @param {array} data
 */
export async function getProcessingPage(data: Data[]) {
  const TASK_MAP = {
    processing: process,
    error: handleError,
    success: handleSuccess,
  };

  return data.reduce((promise, obj) => {
    const task = TASK_MAP[obj.state];

    if (!task) {
      throw new Error('State not recognised');
    }

    return promise.then(() => task(obj));
  }, Promise.resolve());
}
