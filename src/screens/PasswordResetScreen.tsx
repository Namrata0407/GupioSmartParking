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
import { showToast } from '../utils/simpleToastConfig';

const PasswordResetScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const handleResetPassword = () => {
    if (!email.trim()) {
      showToast.error('Email Required', 'Please enter your email address');
      return;
    }

    if (!newPassword.trim()) {
      showToast.error('Password Required', 'Please enter a new password');
      return;
    }

    if (newPassword.length < 6) {
      showToast.error('Password Too Short', 'Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast.error('Passwords Don\'t Match', 'Please make sure both passwords are the same');
      return;
    }

    setIsResetting(true);

    // Simulate API call
    setTimeout(() => {
      setIsResetting(false);
      showToast.success('Password Reset Successful', 'Your password has been updated successfully');
      onBack();
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#eff6ff]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 h-full">
        <View className="flex-1 justify-center">
          {/* Header */}
          <View className="items-center mb-12">
            <Text className="text-2xl font-bold text-black">Gupio Smart Parking</Text>
            <Text className="text-lg text-blue-700 text-center">Services</Text>
          </View>

          {/* Password Reset Form */}
          <View className="bg-white rounded-2xl p-6 shadow-md shadow-black/10">
            <Text className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Reset Password
            </Text>

            <Text className="text-gray-600 mb-6 text-center">
              Enter your email address and create a new password to reset your account
            </Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">New Password</Text>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password (min 6 characters)"
                secureTextEntry
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              />
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 mb-2 font-medium">Confirm New Password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your new password"
                secureTextEntry
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              />
            </View>

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={onBack}
                className="w-[47.5%] bg-gray-300 rounded-lg py-4"
                disabled={isResetting}
              >
                <Text className="text-gray-700 text-center font-semibold">
                  Back to Login
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleResetPassword}
                className={`w-[47.5%] rounded-lg py-4 ${isResetting ? 'bg-gray-400' : 'bg-blue-600'}`}
                disabled={isResetting}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {isResetting ? 'Resetting...' : 'Reset Password'}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-6 p-4 bg-blue-50 rounded-lg">
              <Text className="text-blue-800 text-sm text-center">
                💡 Password must be at least 6 characters long
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordResetScreen;
