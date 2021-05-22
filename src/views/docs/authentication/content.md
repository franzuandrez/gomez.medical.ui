# Authentication

Minimal project that supports authentication JWT and firebase methods.

---

#### 1.Method JWT

- In file `src/App.js`

```js
import JwtProvider from 'src/components/authentication/JwtProvider';

<JwtProvider>
  <ScrollToTop />
  <GoogleAnalytics />
  {renderRoutes(routes)}
</JwtProvider>;
```

- In file `src/hooks/useAuth.js`

```js
export default function useAuth(method = 'jwt') {
  ...
}
```

#### 2.Method Firebase

- In file `src/App.js`

```js
import FirebaseProvider from 'src/components/authentication/FirebaseProvider';

<FirebaseProvider>
  <ScrollToTop />
  <GoogleAnalytics />
  {renderRoutes(routes)}
</FirebaseProvider>;
```

- In file `src/hooks/useAuth.js`

```js
export default function useAuth(method = 'firebase') {
  ...
}
```

#### 3.Setup Firebase (Login email/ password)

- Create an account [https://firebase.google.com/docs/auth](https://firebase.google.com/docs/auth)
- Get information and enable `Email/Password` here:

![img](/static/docs/firebase_1.jpg)
![img](/static/docs/firebase_1.jpg)

- Fill infomation in `.env`

```js
# FIREBASE
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APPID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

#### 4.Login with Facebook (firebase)

[https://www.youtube.com/watch?v=X_twiDVZ4PY](https://www.youtube.com/watch?v=X_twiDVZ4PY)

#### 5.Login with Twitter (firebase)

[https://www.youtube.com/watch?v=7Uo5dsu1KK4](https://www.youtube.com/watch?v=7Uo5dsu1KK4)
