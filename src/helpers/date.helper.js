import { formatDistanceToNow } from 'date-fns';

export function getStartDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export const formatDate = (options) => (timestamp) => {
  if (!timestamp) {
    return '';
  }

  const date = new Date(timestamp);

  return date.toLocaleDateString('en-US', options);
};

// https://date-fns.org/v2.2.1/docs/formatDistanceToNow
export const dateDistance = (timestamp) =>
  formatDistanceToNow(new Date(timestamp), { addSuffix: true });
