import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { parkingSlice } from '../store/parkingSlice';
import { getTimeOfDay, getGreeting } from '../utils/helpers';
import { showToast } from '../utils/simpleToastConfig';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, availableSpots, totalSpots } = useAppSelector(state => state.parking);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const navigation = useNavigation();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const greeting = getGreeting(timeOfDay);

  const handleBookSpot = () => {
    navigation.navigate('Parking Layout' as never);
  };

  const handleMyBookings = () => {
    navigation.navigate('My Bookings' as never);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 pt-12 pb-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-2xl font-bold text-gray-800">{greeting}</Text>
            <Text className="text-lg text-gray-500">{user?.name || 'Employee'}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              dispatch(parkingSlice.actions.logout());
              showToast.success('Logged Out', 'You have been successfully logged out');
            }}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-medium">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Total Spots Card */}
          <View className="bg-blue-500 rounded-2xl p-8 mb-4 shadow-md shadow-black/10">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white text-lg font-medium mb-1">Total Spots</Text>
                <Text className="text-white text-3xl font-bold">{totalSpots}</Text>
              </View>
              <View className="bg-white/20 rounded-full p-3">
                <Text className="text-white text-2xl">🚗</Text>
              </View>
            </View>
          </View>

          {/* Available Spots Card */}
          <View className="bg-emerald-500 rounded-2xl p-8 mb-4 shadow-md shadow-black/10">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white text-lg font-medium mb-1">Available Spots</Text>
                <Text className="text-white text-3xl font-bold">{availableSpots}</Text>
              </View>
              <View className="bg-white/20 rounded-full p-3">
                <Text className="text-white text-2xl">✅</Text>
              </View>
            </View>
          </View>

          {/* Occupied Spots Card */}
          <View className="bg-amber-500 rounded-2xl p-8 mb-4 shadow-md shadow-black/10">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white text-lg font-medium mb-1">Occupied Spots</Text>
                <Text className="text-white text-3xl font-bold">{totalSpots - availableSpots}</Text>
              </View>
              <View className="bg-white/20 rounded-full p-3">
                <Text className="text-white text-2xl">🔒</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <View className="mt-8">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</Text>

          <View className="bg-white rounded-2xl p-8 shadow-md">
            <Text className="text-gray-500 text-center mb-5">
              Navigate to the Parking Layout tab to view and book available parking spots
            </Text>

            <View className="flex-row space-x-6 gap-4">
              <TouchableOpacity
                onPress={handleBookSpot}
                className="flex-1 bg-blue-100 rounded-lg p-3 active:opacity-70"
              >
                <Text className="text-blue-900 text-center font-medium">Book Spot</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleMyBookings}
                className="flex-1 bg-blue-100 rounded-lg p-3 active:opacity-70"
              >
                <Text className="text-blue-900 text-center font-medium">My Bookings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
