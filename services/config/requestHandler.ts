export const onSuccess = (response: any) => {
  return response.data;
};

export const onError = async (error: any) => {
  if (!error?.response) {
    throw new Error(`${error.response?.status} - Error, please try again.`);
  }
  switch (error.response?.status) {
    case 401:
    case 403:
      return Promise.reject(
        error.response?.data?.error
          ? error.response?.data?.error
          : error.response?.data
      );
    case 502:
      throw new Error(
        `${error.response?.status} - ${error.response?.data.error}`
      );
    default:
      return Promise.reject(error.response?.data?.error);
  }
};
