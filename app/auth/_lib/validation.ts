const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9]+$/;

// Keep these aligned with the Go backend's auth request validation
// (`internal/controllers/auth` and `internal/models/user.go`).
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;

export const PASSWORD_REQUIREMENTS = `${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters`;

export function normalizeEmail(value: string): string {
  return value.trim();
}

export function validateEmail(value: string): string | null {
  const email = normalizeEmail(value);

  if (!email) {
    return "Enter your email address.";
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }

  return null;
}

export function validateUsername(value: string): string | null {
  const username = value.trim();

  if (!username) {
    return "Enter a username.";
  }

  if (username.length < USERNAME_MIN_LENGTH) {
    return `Username must be at least ${USERNAME_MIN_LENGTH} characters.`;
  }

  if (username.length > USERNAME_MAX_LENGTH) {
    return `Username must be ${USERNAME_MAX_LENGTH} characters or fewer.`;
  }

  if (!USERNAME_PATTERN.test(username)) {
    return "Usernames can only contain letters and numbers.";
  }

  return null;
}

export function validatePassword(value: string): string | null {
  if (!value) {
    return "Enter your password.";
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }

  if (value.length > PASSWORD_MAX_LENGTH) {
    return `Password must be ${PASSWORD_MAX_LENGTH} characters or fewer.`;
  }

  return null;
}

export function validateNewPassword(value: string): string | null {
  if (!value) {
    return "Enter a new password.";
  }

  return validatePassword(value);
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string
): string | null {
  if (!confirmation) {
    return "Confirm your new password.";
  }

  if (password !== confirmation) {
    return "Passwords do not match.";
  }

  return null;
}
