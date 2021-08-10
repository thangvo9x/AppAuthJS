import { CHANGE_LANGUAGE } from 'actions/language';

const initialState = {
  currentLanguage: 'vi',
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
