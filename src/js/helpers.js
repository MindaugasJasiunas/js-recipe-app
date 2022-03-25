import { REQUEST_TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds.`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([
      fetchPro,
      timeout(REQUEST_TIMEOUT_SEC),
    ]); // prevent fetch from running forever in slow internet connection & timeout after 10seconds
    const data = await response.json();

    if (!response.ok)
      throw new Error(
        `Error msg: ${data.message} Error code: ${response.status}`
      );
    return data;
  } catch (err) {
    throw err; // re-throw error
  }
};
