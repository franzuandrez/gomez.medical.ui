// ----------------------------------------------------------------------

export const codes = {
  // Email
  emailAlreadyinUse: {
    code: 'auth/email-already-in-use',
    text: 'There already exists an account with the given email address.'
  },
  invalidEmail: {
    code: 'auth/invalid-email',
    text: 'The email address is not valid.'
  },
  userDisabled: {
    code: 'auth/user-disabled',
    text: 'Usuario dado de baja'
  },
  userNotFound: {
    code: 'auth/user-not-found',
    text: 'Usuario no encontrado'
  },

  // Password
  wrongPassword: {
    code: 'auth/wrong-password',
    text: 'Contraseña incorrecta'
  },
  weakPassword: {
    code: 'auth/weak-password',
    text: 'Password should be at least 6 characters'
  }
};

const {
  emailAlreadyinUse,
  invalidEmail,
  userDisabled,
  userNotFound,
  wrongPassword,
  weakPassword
} = codes;

export function emailError(errors) {
  return {
    error:
      errors === emailAlreadyinUse.code ||
      errors === invalidEmail.code ||
      errors === userDisabled.code ||
      errors === userNotFound.code,
    helperText:
      (errors === emailAlreadyinUse.code && emailAlreadyinUse.text) ||
      (errors === invalidEmail.code && invalidEmail.text) ||
      (errors === userDisabled.code && userDisabled.text) ||
      (errors === userNotFound.code && userNotFound.text)
  };
}

export function passwordError(errors) {
  return {
    error: errors === wrongPassword.code || errors === weakPassword.code,
    helperText:
      (errors === wrongPassword.code && wrongPassword.text) ||
      (errors === weakPassword.code && weakPassword.text)
  };
}
