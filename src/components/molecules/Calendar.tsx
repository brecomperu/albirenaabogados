import React from 'react';
import styles from './Calendar.module.css';
import Typography from '../atoms/Typography';

interface CalendarProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

  return (
    <div className={styles.calendar}>
      <div className={styles.weekDays}>
        {weekDays.map(day => (
          <span key={day} className={styles.weekDay}>{day}</span>
        ))}
      </div>
      <div className={styles.daysGrid}>
        {days.map(day => {
          const dateStr = `2026-03-${day.toString().padStart(2, '0')}`;
          const isSelected = selectedDate === dateStr;
          const isDisabled = day < 21; // Mocking passed days

          return (
            <button
              key={day}
              className={`${styles.day} ${isSelected ? styles.active : ''} ${isDisabled ? styles.disabled : ''}`}
              onClick={() => !isDisabled && onDateSelect(dateStr)}
              disabled={isDisabled}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
