import { useState, useEffect } from 'react';

const ComingSoon = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-10-06T05:30:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval as keyof typeof timeLeft]) {
      timerComponents.push(
        <span key={interval}>
          {timeLeft[interval as keyof typeof timeLeft]} {interval}{' '}
        </span>
      );
    }
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Coming Soon!</h1>
      <p style={styles.subtitle}>We are launching on October 6, 2024, at 05:30 AM.</p>
      {timerComponents.length ? <div style={styles.timer}>{timerComponents}</div> : <span>Time's up!</span>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#282c34',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '24px',
    marginBottom: '40px',
  },
  timer: {
    fontSize: '32px',
  },
};

export default ComingSoon;
