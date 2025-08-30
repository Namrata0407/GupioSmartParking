export type ParkingSlot = {
  id: string;
  section: "US" | "LS" | "B3";
  status: "available" | "booked";
  bookedBy?: string;
  bookedAt?: string;
};

export type User = {
  employeeId: string;
  name: string;
  isLoggedIn: boolean;
};

export type Booking = {
  slotId: string;
  section: string;
  bookedAt: string;
  bookedBy: string;
};

export type LoginFormData = {
  employeeId: string;
  password: string;
};

export type OTPFormData = {
  otp: string;
};

export type TimeOfDay = "morning" | "afternoon" | "evening";
