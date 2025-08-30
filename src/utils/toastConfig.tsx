import React from 'react';
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#10b981',
        backgroundColor: '#f0fdf4',
        borderLeftWidth: 6,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 40,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#065f46',
      }}
      text2Style={{
        fontSize: 14,
        color: '#047857',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#ef4444',
        backgroundColor: '#fef2f2',
        borderLeftWidth: 6,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 40,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#991b1b',
      }}
      text2Style={{
        fontSize: 14,
        color: '#dc2626',
      }}
    />
  ),
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: '#3b82f6',
        backgroundColor: '#eff6ff',
        borderLeftWidth: 6,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 40,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#1e40af',
      }}
      text2Style={{
        fontSize: 14,
        color: '#2563eb',
      }}
    />
  ),
};

export const showToast = {
  success: (title: string, message: string) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
    });
  },
  error: (title: string, message: string) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
  },
  info: (title: string, message: string) => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
    });
  },
};
