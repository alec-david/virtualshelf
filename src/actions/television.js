import { getResource, postResource, updateResource, deleteResource, expressURL } from './index';

export const ADD_NEW_TELEVISION = 'ADD_NEW_TELEVISION';
export const ADD_EXISTING_TELEVISION = 'ADD_EXISTING_TELEVISION';
export const LOAD_MORE_TELEVISION = 'LOAD_MORE_TELEVISION';
export const DELETE_TELEVISION = 'DELETE_TELEVISION';
export const EDIT_TELEVISION = 'EDIT_TELEVISION';
export const UPDATE_TELEVISION = 'UPDATE_TELEVISION';
export const FILTER_TELEVISION = 'FILTER_TELEVISION';
export const SEARCH_TELEVISION = 'SEARCH_TELEVISION';

const televisionURL = `${expressURL}/television`;

export const addTelevision = television => {
  let date_watched = new Date(television.date);
  date_watched.setTime(date_watched.getTime() + date_watched.getTimezoneOffset() * 60 * 1000);
  return new Promise((resolve, reject) => {
    const televisionJSON = {
      ...television,
      date: date_watched.valueOf(),
      username: television.email
    };
    postResource(televisionURL, televisionJSON)
      .then(result => {
        televisionJSON.id = result.insertId;
        televisionJSON.image_url = result.image_url;
        televisionJSON.type = ADD_NEW_TELEVISION;
        resolve(televisionJSON);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getTelevision = () => {
  return getResource(televisionURL);
};

export const getUserTelevision = token => {
  return getResource(`${televisionURL}/${token}`);
};

export const hydrateTelevision = television => {
  return {
    television,
    type: ADD_EXISTING_TELEVISION
  };
};

export const loadMoreTelevision = () => {
  return {
    type: LOAD_MORE_TELEVISION
  };
};

export const updateTelevision = television => {
  let date_watched = new Date(television.date);
  date_watched.setTime(date_watched.getTime() + date_watched.getTimezoneOffset() * 60 * 1000);
  television.date = date_watched.valueOf();
  return new Promise((resolve, reject) => {
    updateResource(televisionURL, television)
      .then(result => {
        resolve({
          ...television,
          image_url: result.image_url,
          type: UPDATE_TELEVISION
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteTelevision = id => {
  return new Promise((resolve, reject) => {
    deleteResource(id, televisionURL)
      .then(result => {
        const deleteObj = {
          id,
          type: DELETE_TELEVISION
        };
        resolve(deleteObj);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const editTelevision = id => {
  return {
    id,
    type: EDIT_TELEVISION
  };
};

export const hideTelevision = id => {
  return {
    id,
    type: DELETE_TELEVISION
  };
};

export const filterTelevision = filter => {
  return {
    ...filter,
    type: FILTER_TELEVISION
  };
};

export const searchTelevision = search => {
  return {
    ...search,
    type: SEARCH_TELEVISION
  };
};

export const flagTelevision = id => {
  return new Promise((resolve, reject) => {
    updateResource(televisionURL, { id })
      .then(result => {
        resolve({
          id,
          type: DELETE_TELEVISION
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const removeImage = television => {
  updateResource(`${televisionURL}/image`, { id: television.id });
  return {
    ...television,
    image_url: null,
    type: UPDATE_TELEVISION
  };
};
