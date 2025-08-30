import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { parkingSlice } from '../store/parkingSlice';
import { loginSchema, otpSchema } from '../utils/validation';
import { showToast } from '../utils/simpleToastConfig';
import PasswordResetScreen from './PasswordResetScreen';

const LoginScreen: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [dynamicOTP, setDynamicOTP] = useState('');

  const dispatch = useAppDispatch();
  const { storedOTP } = useAppSelector(state => state.parking);

  const handleSendOTP = () => {
    try {
      loginSchema.parse({ employeeId, password });

      if (employeeId !== 'EMP001' || password !== 'password123') {
        showToast.error('Invalid Credentials', 'Please use EMP001 / password123 for testing');
        return;
      }

      const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
      setDynamicOTP(newOTP);
      dispatch(parkingSlice.actions.setStoredOTP(newOTP));

      setPassword('');
      setOtp('');

      setTimeout(() => {
        setShowOTPInput(true);
        dispatch(parkingSlice.actions.setShowOTPInput(true));
        showToast.success('OTP Sent', `OTP sent to your registered mobile number: ${newOTP}`);
      }, 100);
    } catch (error: any) {
      showToast.error('Validation Error', error.errors[0]?.message || 'Please check your inputs');
    }
  };

  const handleVerifyOTP = () => {
    try {
      otpSchema.parse({ otp });

      if (otp === storedOTP) {
        const user = {
          employeeId,
          name: 'John Doe',
          isLoggedIn: true,
        };
        dispatch(parkingSlice.actions.setUser(user));
        dispatch(parkingSlice.actions.initializeParkingSlots());
        showToast.success('Login Successful', 'Welcome to Gupio Smart Parking!');
      } else {
        showToast.error('Invalid OTP', 'Please enter the correct OTP');
      }
    } catch (error: any) {
      showToast.error('Validation Error', error.errors[0]?.message || 'Please enter a valid 6-digit OTP');
    }
  };

  const handleForgotPassword = () => {
    setShowPasswordReset(true);
  };

  if (showPasswordReset) {
    return (
      <PasswordResetScreen onBack={() => setShowPasswordReset(false)} />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#eff6ff] border-2 border-[green]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 h-full">
        <View className="flex-1 justify-center">
          {/* Header */}
          <View className="items-center mb-12">
            <Text className="text-2xl font-bold text-black">Gupio Smart Parking</Text>
            <Text className="text-lg text-blue-700 text-center">Services</Text>
          </View>

          {/* Login Form */}
          <View className="bg-white rounded-2xl p-6 shadow-md shadow-black/10">
            {!showOTPInput ? (
              <>
                <Text className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  Employee Login
                </Text>

                <View className="mb-4">
                  <Text className="text-gray-700 mb-2 font-medium">Employee ID</Text>
                  <TextInput
                    value={employeeId}
                    onChangeText={setEmployeeId}
                    placeholder="Enter your Employee ID"
                    className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    autoCapitalize="none"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-gray-700 mb-2 font-medium">Password</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                    className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  />
                </View>

                <TouchableOpacity
                  onPress={handleForgotPassword}
                  className="mb-6"
                >
                  <Text className="text-blue-600 text-center font-medium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSendOTP}
                  className="bg-blue-600 rounded-lg py-4 w-full"
                >
                  <Text className="text-white text-center font-semibold text-lg">
                    Send OTP
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  Enter OTP
                </Text>

                <Text className="text-gray-500 mb-4 text-center">
                  We've sent a 6-digit OTP to your registered mobile number
                </Text>

                <View className="mb-4">
                  <Text className="text-gray-700 mb-2 font-medium">OTP</Text>
                  <TextInput
                    key={`otp-${dynamicOTP}`}
                    value={otp}
                    onChangeText={setOtp}
                    placeholder={`Enter 6-digit OTP (${dynamicOTP})`}
                    className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-center text-xl font-semibold"
                    keyboardType="numeric"
                    maxLength={6}
                    textContentType="oneTimeCode"
                    autoComplete="one-time-code"
                    autoCorrect={false}
                    autoCapitalize="none"
                    spellCheck={false}
                  />
                </View>

                <View className="flex-row justify-between">
                  <TouchableOpacity
                    onPress={() => {
                      setShowOTPInput(false);
                      dispatch(parkingSlice.actions.setShowOTPInput(false));
                      setOtp('');
                    }}
                    className="w-[47.5%] bg-gray-300 rounded-lg py-4"
                  >
                    <Text className="text-gray-700 text-center font-semibold">
                      Back
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleVerifyOTP}
                    className="w-[47.5%] bg-blue-600 rounded-lg py-4"
                  >
                    <Text className="text-white text-center font-semibold text-lg">
                      Verify
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
