/** @format */

import { CHANGE_LANGUAGE } from 'actions/language';
import { Constants } from 'configs';

const initialState = {
  currentLanguage: Constants.LANGUAGE.DEFAULT,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.language,
      };

    default:
      return state;
  }
};
