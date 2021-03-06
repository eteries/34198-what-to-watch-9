import request from 'axios';
import { toast } from 'react-toastify';

import { ErrorType } from '../types/error';
import { HTTP_CODE, Message } from '../constants';

export const errorHandle = (error: ErrorType): void => {
  if (error === null) {
    return;
  }

  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        toast.error(response.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        break;
      case HTTP_CODE.NOT_FOUND:
        toast.error(response.data.error);
        break;
    }

    return;
  }

  toast.error(Message.UnknownError);
  toast.clearWaitingQueue();
};
