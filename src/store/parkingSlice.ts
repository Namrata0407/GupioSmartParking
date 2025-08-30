import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParkingSlot, User, Booking } from '../types';

interface ParkingState {
  // User state
  user: User | null;
  isLoggedIn: boolean;
  showOTPInput: boolean;
  storedOTP: string;
  
  // Parking slots
  parkingSlots: ParkingSlot[];
  availableSpots: number;
  totalSpots: number;
  
  // Active bookings
  activeBookings: Booking[];
  
  // UI state
  selectedSlot: ParkingSlot | null;
  showBookingModal: boolean;
  showCancelModal: boolean;
  showInactivityModal: boolean;
}

const initialState: ParkingState = {
  // Initial state
  user: null,
  isLoggedIn: false,
  showOTPInput: false,
  storedOTP: '123456', // Mock OTP for demo
  
  parkingSlots: [],
  availableSpots: 0,
  totalSpots: 100,
  
  activeBookings: [],
  
  selectedSlot: null,
  showBookingModal: false,
  showCancelModal: false,
  showInactivityModal: false,
};

export const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.showOTPInput = false;
      state.activeBookings = [];
      state.selectedSlot = null;
      state.showBookingModal = false;
      state.showCancelModal = false;
      state.showInactivityModal = false;
    },
    
    setShowOTPInput: (state, action: PayloadAction<boolean>) => {
      state.showOTPInput = action.payload;
    },
    
    setStoredOTP: (state, action: PayloadAction<string>) => {
      state.storedOTP = action.payload;
    },
    
    initializeParkingSlots: (state) => {
      const slots: ParkingSlot[] = [];
      const sections = ['US', 'LS', 'B3'] as const;
      
      // Create all slots first
      sections.forEach(section => {
        for (let i = 1; i <= 30; i++) {
          slots.push({
            id: `${section}-P${i.toString().padStart(2, '0')}`,
            section,
            status: 'available',
            bookedBy: undefined,
            bookedAt: undefined,
          });
        }
      });
      
      // Randomly book slots to ensure exactly 30 available spots
      const totalSlots = slots.length; // 90 slots (3 sections × 30 slots each)
      const targetAvailableSpots = 30;
      const slotsToBook = totalSlots - targetAvailableSpots; // 60 slots to book
      
      // Shuffle slots and book the first 60
      const shuffledSlots = [...slots].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < slotsToBook; i++) {
        const slotToBook = shuffledSlots[i];
        const originalSlot = slots.find(s => s.id === slotToBook.id);
        if (originalSlot) {
          originalSlot.status = 'booked';
          originalSlot.bookedBy = 'EMP001';
          originalSlot.bookedAt = new Date().toISOString();
        }
      }
      
      state.parkingSlots = slots;
      state.availableSpots = targetAvailableSpots;
    },
    
    bookSlot: (state, action: PayloadAction<{ slotId: string; employeeId: string }>) => {
      const { slotId, employeeId } = action.payload;
      const slot = state.parkingSlots.find(s => s.id === slotId);
      if (slot) {
        slot.status = 'booked';
        slot.bookedBy = employeeId;
        slot.bookedAt = new Date().toISOString();
        state.availableSpots = state.parkingSlots.filter(slot => slot.status === 'available').length;
      }
    },
    
    cancelBooking: (state, action: PayloadAction<string>) => {
      const slotId = action.payload;
      const slot = state.parkingSlots.find(s => s.id === slotId);
      if (slot) {
        slot.status = 'available';
        slot.bookedBy = undefined;
        slot.bookedAt = undefined;
        state.availableSpots = state.parkingSlots.filter(slot => slot.status === 'available').length;
      }
    },
    
    setSelectedSlot: (state, action: PayloadAction<ParkingSlot | null>) => {
      state.selectedSlot = action.payload;
    },
    
    setShowBookingModal: (state, action: PayloadAction<boolean>) => {
      state.showBookingModal = action.payload;
    },
    
    setShowCancelModal: (state, action: PayloadAction<boolean>) => {
      state.showCancelModal = action.payload;
    },
    
    setShowInactivityModal: (state, action: PayloadAction<boolean>) => {
      state.showInactivityModal = action.payload;
    },
    
    addActiveBooking: (state, action: PayloadAction<Booking>) => {
      state.activeBookings.push(action.payload);
    },
    
    removeActiveBooking: (state, action: PayloadAction<string>) => {
      const slotId = action.payload;
      state.activeBookings = state.activeBookings.filter(booking => booking.slotId !== slotId);
    },
    
    updateAvailableSpots: (state) => {
      state.availableSpots = state.parkingSlots.filter(slot => slot.status === 'available').length;
    },
  },
});

export const {
  setUser,
  logout,
  setShowOTPInput,
  setStoredOTP,
  initializeParkingSlots,
  bookSlot,
  cancelBooking,
  setSelectedSlot,
  setShowBookingModal,
  setShowCancelModal,
  setShowInactivityModal,
  addActiveBooking,
  removeActiveBooking,
  updateAvailableSpots,
} = parkingSlice.actions;

export default parkingSlice.reducer;
