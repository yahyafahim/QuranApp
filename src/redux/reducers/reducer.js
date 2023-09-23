const INITIAL_STATES = {
  user: null,
  token: '',
  loader: false,
  language: 'en',
  quranData: null,
  quranAudioData: null,
  quranTranslationDataUrdu: null,
  quranTranslationDataEndlish: null,
  quranTranslationData: null,
  savedLastPage: 1,
  startOverPge: 1,
  quranAudioData2: null,
  bookMarkedData: [],
  favouriteData: [],
};

export default function (state = INITIAL_STATES, action) {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SAVE_FAVOURITE_DATA':
      return {
        ...state,
        favouriteData: action.payload,
      };
    case 'SAVE_BOOKMARKED_DATA':
      return {
        ...state,
        bookMarkedData: action.payload,
      };
    case 'START_OVER':
      return {
        ...state,
        startOverPge: action.payload,
      };
    case 'SAVED_LAST_PAGE':
      return {
        ...state,
        savedLastPage: action.payload,
      };
    case 'SAVE_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SAVE_QURAN_DATA':
      return {
        ...state,
        quranData: action.payload,
      };
    case 'SAVE_QURAN_AUDIO_DATA':
      return {
        ...state,
        quranAudioData: action.payload,
      };
    case 'SAVE_QURAN_AUDIO_DATA2':
      return {
        ...state,
        quranAudioData2: action.payload,
      };
    case 'SAVE_TRANSLATION_DATA_URDU':
      return {
        ...state,
        quranTranslationDataUrdu: action.payload,
      };
    case 'SAVE_TRANSLATION_DATA_ENDLISH':
      return {
        ...state,
        quranTranslationDataEndlish: action.payload,
      };
    case 'SAVE_TRANSLATION_DATA':
      return {
        ...state,
        quranTranslationData: action.payload,
      };
    case 'RESET_USER':
      return {
        ...state,
        user: null,
      };
    case 'LOADER_START':
      return {
        ...state,
        loader: true,
      };
    case 'LOADER_STOP':
      return {
        ...state,
        loader: false,
      };
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
}
