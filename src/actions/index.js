const request = require('request');

export const getResource = resourceURL => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: resourceURL,
        method: 'GET'
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode === 400) {
          reject(body);
        }
        resolve(response);
      }
    );
  });
};

export const deleteResource = (id, resourceURL) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: resourceURL + '/' + id,
        method: 'DELETE'
      },
      (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      }
    );
  });
};

export const deleteResourceWithBody = (resourceURL, jsonObj) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: resourceURL,
        method: 'DELETE',
        json: true,
        body: jsonObj
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode === 400) {
          reject(body);
        }
        resolve(response);
      }
    );
  });
};

export const postResource = (resourceURL, jsonObj) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: resourceURL,
        method: 'POST',
        json: true,
        body: jsonObj
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode === 400) {
          reject(body);
        }
        resolve(body);
      }
    );
  });
};

export const updateResource = (resourceURL, jsonObj) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: resourceURL,
        method: 'PUT',
        json: true,
        body: jsonObj
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode === 400) {
          reject(body);
        }
        resolve(body);
      }
    );
  });
};
