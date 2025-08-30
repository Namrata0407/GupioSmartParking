import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Animated,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { parkingSlice } from '../store/parkingSlice';
import { formatTime, formatDate } from '../utils/helpers';
import { showToast } from '../utils/simpleToastConfig';

const ActiveBookingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    activeBookings,
    showInactivityModal,
  } = useAppSelector(state => state.parking);

  const [slideAnim] = useState(new Animated.Value(300));

  useEffect(() => {
    // Animate bookings on mount
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Simulate inactivity reminder after 10 seconds (for demo)
    const inactivityTimer = setTimeout(() => {
      if (activeBookings.length > 0) {
        dispatch(parkingSlice.actions.setShowInactivityModal(true));
      }
    }, 10000);

    return () => clearTimeout(inactivityTimer);
  }, [activeBookings.length]);

  const handleCancelBooking = (booking: any) => {
    Alert.alert(
      'Cancel Booking',
      'Do you want to cancel your booking?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            dispatch(parkingSlice.actions.cancelBooking(booking.slotId));
            dispatch(parkingSlice.actions.removeActiveBooking(booking.slotId));
            showToast.success('Booking Cancelled', 'Your booking has been cancelled successfully');
          },
        },
      ]
    );
  };

  const handleInactivityResponse = (willBeThere: boolean) => {
    dispatch(parkingSlice.actions.setShowInactivityModal(false));
    
    if (!willBeThere) {
      activeBookings.forEach(booking => {
        dispatch(parkingSlice.actions.cancelBooking(booking.slotId));
        dispatch(parkingSlice.actions.removeActiveBooking(booking.slotId));
      });
      showToast.info('Bookings Cancelled', 'All your bookings have been cancelled due to inactivity');
    } else {
      showToast.success('Thank You', 'We\'ll keep your booking active. Please arrive soon');
    }
  };

  if (activeBookings.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center px-6">
        <View className="bg-white rounded-2xl p-8 shadow-md items-center">
          <Text className="text-[60px] mb-4">🚗</Text>
          <Text className="text-xl font-semibold text-gray-800 mb-2 text-center">
            No Active Bookings
          </Text>
          <Text className="text-gray-500 text-center">
            You don't have any active parking bookings at the moment.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 pt-12 pb-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Active Bookings
        </Text>

        <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
          {activeBookings.map((booking: any) => (
            <View
              key={booking.slotId}
              className="bg-white rounded-2xl p-6 mb-4 shadow-md border-l-4 border-blue-500"
            >
              {/* Header */}
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="text-xl font-bold text-gray-800">{booking.slotId}</Text>
                  <Text className="text-gray-500">Section {booking.section}</Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-800 font-medium text-xs">Active</Text>
                </View>
              </View>

              {/* Details */}
              <View className="mb-4">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-500">Booked At:</Text>
                  <Text className="text-gray-800 font-medium">{formatTime(booking.bookedAt)}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-500">Date:</Text>
                  <Text className="text-gray-800 font-medium">{formatDate(booking.bookedAt)}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-500">Booked By:</Text>
                  <Text className="text-gray-800 font-medium">{booking.bookedBy}</Text>
                </View>
              </View>

              {/* Cancel Button */}
              <TouchableOpacity
                onPress={() => handleCancelBooking(booking)}
                className="bg-red-500 rounded-lg py-3"
              >
                <Text className="text-white text-center font-semibold">
                  Cancel Booking
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        {/* Summary */}
        <View className="mt-6 bg-blue-100 rounded-xl p-4">
          <Text className="text-lg font-semibold text-blue-900 mb-2 text-center">
            Booking Summary
          </Text>
          <Text className="text-blue-900 text-center">
            You have {activeBookings.length} active booking
            {activeBookings.length > 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Inactivity Modal */}
      <Modal
        visible={showInactivityModal}
        transparent
        animationType="slide"
        onRequestClose={() =>
          dispatch(parkingSlice.actions.setShowInactivityModal(false))
        }
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-6 mx-4 w-80">
            <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
              Inactivity Reminder
            </Text>
            <Text className="text-gray-700 text-center mb-6">
              You haven't parked your vehicle yet. Would you like to cancel this?
            </Text>

            <View className="space-y-3">
              <TouchableOpacity
                onPress={() => handleInactivityResponse(false)}
                className="bg-red-500 rounded-lg py-3"
              >
                <Text className="text-white text-center font-semibold">
                  Cancel Booking
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleInactivityResponse(true)}
                className="bg-blue-500 rounded-lg py-3 mt-4"
              >
                <Text className="text-white text-center font-semibold">
                  No, I will be there
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ActiveBookingsScreen;
