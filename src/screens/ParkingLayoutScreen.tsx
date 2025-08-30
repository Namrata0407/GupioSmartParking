import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { parkingSlice } from '../store/parkingSlice';
import { showToast } from '../utils/simpleToastConfig';

const ParkingLayoutScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    parkingSlots,
    selectedSlot,
    showBookingModal,
    showCancelModal,
    user,
  } = useAppSelector(state => state.parking);

  const [scaleAnim] = useState(new Animated.Value(1));
  const [glowAnim] = useState(new Animated.Value(0));
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  const sections = ['US', 'LS', 'B3'] as const;

  useEffect(() => {
    if (parkingSlots.length === 0) {
      dispatch(parkingSlice.actions.initializeParkingSlots());
    }

    if (!user) {
      dispatch(parkingSlice.actions.setUser({
        employeeId: 'EMP001',
        name: 'Test User',
        isLoggedIn: true,
      }));
    }
  }, [dispatch, parkingSlots.length, user]);

  const handleSlotPress = (slot: any) => {
    setHoveredSlot(slot.id);

    Animated.sequence([
      Animated.timing(glowAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.timing(glowAnim, { toValue: 0, duration: 300, useNativeDriver: false }),
    ]).start(() => setHoveredSlot(null));

    if (slot.status === 'available') {
      dispatch(parkingSlice.actions.setSelectedSlot(slot));
      dispatch(parkingSlice.actions.setShowBookingModal(true));
    } else {
      showToast.error('Slot Occupied', 'This parking slot is already booked');
    }
  };

  const handleConfirmBooking = () => {
    if (selectedSlot && user) {
      dispatch(parkingSlice.actions.bookSlot({ slotId: selectedSlot.id, employeeId: user.employeeId }));
      dispatch(parkingSlice.actions.addActiveBooking({
        slotId: selectedSlot.id,
        section: selectedSlot.section,
        bookedAt: new Date().toISOString(),
        bookedBy: user.employeeId,
      }));
      dispatch(parkingSlice.actions.setShowBookingModal(false));
      dispatch(parkingSlice.actions.setSelectedSlot(null));

      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();

      showToast.success('Booking Confirmed', 'Your parking slot has been booked successfully!');
    }
  };

  const confirmCancelBooking = () => {
    if (selectedSlot) {
      dispatch(parkingSlice.actions.cancelBooking(selectedSlot.id));
      dispatch(parkingSlice.actions.removeActiveBooking(selectedSlot.id));
      dispatch(parkingSlice.actions.setShowCancelModal(false));
      dispatch(parkingSlice.actions.setSelectedSlot(null));
      showToast.success('Booking Cancelled', 'Your booking has been cancelled successfully');
    }
  };

  const renderSection = (section: 'US' | 'LS' | 'B3') => {
    const sectionSlots = parkingSlots.filter(slot => slot.section === section);

    return (
      <View key={section} className="mb-8">
        <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
          Section {section}
        </Text>

        {/* shadowOpacity:0.05, shadowRadius:4, offset:{0,1}, elevation:2 */}
        <View
          className="bg-white rounded-2xl p-4"
          style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 2 }}
        >
          <View className="flex-row flex-wrap justify-center">
            {sectionSlots.map(slot => {
              const isHovered = hoveredSlot === slot.id;
              const glowColor = isHovered ? (slot.status === 'available' ? '#10b981' : '#ef4444') : 'transparent';
              const glowOpacity = isHovered ? 0.8 : 0;
              const glowRadius = isHovered ? 8 : 0;
              const glowOffset = isHovered ? 2 : 0;

              return (
                <Animated.View
                  key={slot.id}
                  style={{
                    transform: [{ scale: scaleAnim }],
                    shadowColor: glowColor,
                    shadowOpacity: glowOpacity,
                    shadowRadius: glowRadius,
                    shadowOffset: { width: glowOffset, height: glowOffset },
                    elevation: glowRadius,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleSlotPress(slot)}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // ✅ restored
                    className={`m-1 w-16 h-16 rounded-lg justify-center items-center border-2 
                      ${slot.status === 'available' ? 'bg-emerald-500' : 'bg-red-500'} border-white/30`}
                  >
                    <Text className="text-white font-semibold text-sm">
                      {slot.id.split('-')[1]}
                    </Text>
                    <Text className="text-white text-xs">
                      {slot.status === 'available' ? 'Free' : 'Booked'}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 pt-12 pb-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Parking Layout
        </Text>

        {/* Legend (shadow + spacing match) */}
        <View
          className="bg-white rounded-xl p-4 mb-6"
          style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 2 }}
        >
          <Text className="text-lg font-semibold text-gray-800 mb-3 text-center">Legend</Text>
          <View className="flex-row justify-center space-x-6 gap-4">
            <View className="flex-row items-center">
              <View className="w-4 h-4 bg-emerald-500 rounded mr-2" />
              <Text className="text-gray-700">Available</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-4 h-4 bg-red-500 rounded mr-2" />
              <Text className="text-gray-700">Booked</Text>
            </View>
          </View>
        </View>

        {sections.map(renderSection)}

        {/* Booking Modal */}
        <Modal
          visible={showBookingModal}
          transparent
          animationType="slide"
          onRequestClose={() => dispatch(parkingSlice.actions.setShowBookingModal(false))}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-2xl p-6 w-80">
              <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
                {selectedSlot?.id}
              </Text>

              <View className="bg-gray-100 rounded-lg p-4 mb-6">
                <Text className="text-center text-gray-700">
                  Status: <Text className="font-semibold text-emerald-500">Available</Text>
                </Text>
              </View>

              <View className="flex-row space-x-3 gap-4">
                <TouchableOpacity
                  onPress={() => dispatch(parkingSlice.actions.setShowBookingModal(false))}
                  className="flex-1 bg-gray-300 rounded-lg py-3"
                >
                  <Text className="text-gray-700 text-center font-semibold">Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleConfirmBooking}
                  className="flex-1 bg-blue-600 rounded-lg py-3"
                >
                  <Text className="text-white text-center font-semibold">Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Cancel Confirmation Modal */}
        <Modal
          visible={showCancelModal}
          transparent
          animationType="slide"
          onRequestClose={() => dispatch(parkingSlice.actions.setShowCancelModal(false))}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-2xl p-6 w-80">
              <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
                Cancel Booking
              </Text>

              <Text className="text-gray-700 text-center mb-6">
                Do you want to cancel your booking?
              </Text>

              <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={() => dispatch(parkingSlice.actions.setShowCancelModal(false))}
                  className="flex-1 bg-gray-300 rounded-lg py-3"
                >
                  <Text className="text-gray-700 text-center font-semibold">No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={confirmCancelBooking}
                  className="flex-1 bg-red-500 rounded-lg py-3"
                >
                  <Text className="text-white text-center font-semibold">Yes, Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ParkingLayoutScreen;
