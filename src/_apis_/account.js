import faker from 'faker';
import jwt from 'jsonwebtoken';
// utils
import mock from '../utils/mock';
import { codes } from '../utils/helpError';
import fakeRequest from '../utils/fakeRequest';

// ----------------------------------------------------------------------

const JWT_SECRET = 'minimal-secret-key';
const JWT_EXPIRES_IN = '5 days';

const users = [
  {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    password: 'demo1234',
    photoURL: '/static/mock-images/avatars/avatar_default.jpg',
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: '',
    role: 'admin',
    isPublic: true
  }
];

// ----------------------------------------------------------------------

mock.onPost('/api/account/login').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email, password } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [400, { message: codes.userNotFound.code }];
    }

    if (user.password !== password) {
      return [400, { message: codes.wrongPassword.code }];
    }

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/account/register').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email, password, firstName, lastName } = JSON.parse(config.data);
    let user = users.find((_user) => _user.email === email);

    if (user) {
      return [400, { message: codes.emailAlreadyinUse.code }];
    }

    user = {
      id: faker.datatype.uuid(),
      displayName: `${firstName} ${lastName}`,
      email,
      password,
      photoURL: null,
      phoneNumber: null,
      country: null,
      address: null,
      state: null,
      city: null,
      zipCode: null,
      about: null,
      role: 'user',
      isPublic: true
    };

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/account/my-account').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, { user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
