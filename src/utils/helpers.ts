import { TimeOfDay } from '../types';

export const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
};

export const getGreeting = (timeOfDay: TimeOfDay): string => {
  switch (timeOfDay) {
    case 'morning':
      return 'Good Morning';
    case 'afternoon':
      return 'Good Afternoon';
    case 'evening':
      return 'Good Evening';
    default:
      return 'Hello';
  }
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
