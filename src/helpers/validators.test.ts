import { MESSAGES } from '@/constants/constantValues';

import { registrationSchema, loginSchema, emailValidationPattern, passwordValidationPattern } from './validators';

describe('Validators', () => {
  describe('Email Validation Pattern', () => {
    test('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.com',
        'user@subdomain.example.com',
      ];

      validEmails.forEach((email) => {
        expect(emailValidationPattern.test(email)).toBe(true);
      });
    });

    test('should reject invalid email addresses', () => {
      const invalidEmails = ['test@', '@example.com', 'test@.com', 'test@example.', 'test@example', 'test.example.com'];

      invalidEmails.forEach((email) => {
        expect(emailValidationPattern.test(email)).toBe(false);
      });
    });
  });

  describe('Password Validation Pattern', () => {
    test('should validate correct passwords', () => {
      const validPasswords = ['Password123!', 'ComplexP@ssw0rd', 'Str0ng!Pass', 'P@ssw0rd123'];

      validPasswords.forEach((password) => {
        expect(passwordValidationPattern.test(password)).toBe(true);
      });
    });

    test('should reject invalid passwords', () => {
      const invalidPasswords = [
        'password', // no uppercase, number, or special char
        'Password', // no number or special char
        'password123', // no uppercase or special char
        'PASSWORD123!', // no lowercase
        'Pass123', // no special char
        'Pass!', // no number
        'P1!', // too short
      ];

      invalidPasswords.forEach((password) => {
        expect(passwordValidationPattern.test(password)).toBe(false);
      });
    });
  });

  describe('Registration Schema', () => {
    test('should validate correct registration data', async () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };

      await expect(registrationSchema.validate(validData)).resolves.toBeTruthy();
    });

    test('should reject invalid email format', async () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };

      await expect(registrationSchema.validate(invalidData)).rejects.toThrow(MESSAGES.EMAIL_MUST_BE_VALID);
    });

    test('should reject invalid password format', async () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'weak',
        confirmPassword: 'weak',
      };

      await expect(registrationSchema.validate(invalidData)).rejects.toThrow(MESSAGES.PASSWORD_INVALID_FORMAT);
    });

    test('should reject non-matching passwords', async () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123!',
        confirmPassword: 'DifferentPass123!',
      };

      await expect(registrationSchema.validate(invalidData)).rejects.toThrow(MESSAGES.PASSWORDS_MUST_MATCH);
    });

    test('should reject missing required fields', async () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        // missing email
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };

      await expect(registrationSchema.validate(invalidData)).rejects.toThrow(MESSAGES.EMAIL_REQUIRED);
    });
  });

  describe('Login Schema', () => {
    test('should validate correct login data', async () => {
      const validData = {
        email: 'john.doe@example.com',
        password: 'Password123!',
      };

      await expect(loginSchema.validate(validData)).resolves.toBeTruthy();
    });

    test('should reject invalid email format', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'Password123!',
      };

      await expect(loginSchema.validate(invalidData)).rejects.toThrow(MESSAGES.EMAIL_MUST_BE_VALID);
    });

    test('should reject missing required fields', async () => {
      const invalidData = {
        email: 'john.doe@example.com',
        // missing password
      };

      await expect(loginSchema.validate(invalidData)).rejects.toThrow(MESSAGES.PASSWORD_REQUIRED);
    });
  });
});
