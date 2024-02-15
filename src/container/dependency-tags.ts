export const DEPENDENCY_TAG = {
  APPLICATION: Symbol.for('Application'),
  USERS_SERVICE: Symbol.for('UsersService'),
  USERS_CONTROLLER: Symbol.for('UsersController'),
  PASSPORT_SERVICE: Symbol.for('PassportService'),
  JWT_SERVICE: Symbol.for('JwtService'),
  SECURE_MIDDLEWARE: Symbol.for('SecureMiddleware'),
  LOGIN_MIDDLEWARE: Symbol.for('LoginMiddleware'),
  AUTH_CONTROLLER: Symbol.for('AuthController'),
};