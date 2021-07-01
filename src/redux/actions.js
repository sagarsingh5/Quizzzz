import {questions} from '../config/firebase';

export const GET_DATA = 'GET_DATA';
export const ADD_CHOICE = 'ADD_CHOICE';
export const REMOVE_CHOICE = 'REMOVE_CHOICE';
export const ADD_POINTS = 'ADD_POINTS';
export const SUBS_POINTS = 'SUBS_POINTS';

// // const item = [];

// await questions.onSnapshot(query => {
//   query.forEach(doc => {
//     return {type: GET_DATA, payload: {...doc.data(), id: doc.id}};
//   });
// });
// // console.log(data);
export const addChoice = choice => {
  return {
    type: ADD_CHOICE,
    payload: choice,
  };
};
export const getData = data => {
  return {
    type: GET_DATA,
    payload: data,
  };
};
export const removeChoice = choice => {
  return {
    type: REMOVE_CHOICE,
    payload: choice,
  };
};
export const addPoints = () => {
  return {
    type: ADD_POINTS,
    // payload: choice,
  };
};
export const subsPoints = () => {
  return {
    type: SUBS_POINTS,
    // payload: choice,
  };
};
