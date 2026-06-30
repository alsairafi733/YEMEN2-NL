export type UserRole = 'worker' | 'manager' | 'employer';

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export function normalizeInput(input: string): string {
  return input.normalize('NFKC').trim();
}
