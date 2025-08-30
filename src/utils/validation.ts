import { z } from 'zod';

export const loginSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const otpSchema = z.object({
  otp: z.string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only numbers'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;
