import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';
import productReducer from './slices/product';
import authJwtReducer from './slices/authJwt';
import settingsReducer from './slices/settings';
import calendarReducer from './slices/calendar';
import warehouseReducer from './slices/warehouseSlice';
import sectionReducer from './slices/sectionSlice';
import salesReducer from './slices/sales';
import customerReducer from './slices/customer';


// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['settings']
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const authPersistConfig = {
  key: 'authJwt',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['isAuthenticated']
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  settings: settingsReducer,
  calendar: calendarReducer,
  warehouse: warehouseReducer,
  section: sectionReducer,
  product: persistReducer(productPersistConfig, productReducer),
  customer: customerReducer,
  sales: salesReducer,
  authJwt: persistReducer(authPersistConfig, authJwtReducer)
});

export { rootPersistConfig, rootReducer };
