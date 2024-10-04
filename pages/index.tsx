import { useState, useEffect } from 'react';

const Home = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-10-06T05:30:00+05:30') - +new Date();
    let timeLeft: { [key: string]: number } = {};

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) return;

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Coming Soon</h1>
      <p style={styles.subtitle}>Our website is under construction. Stay tuned!</p>
      {timerComponents.length ? (
        <div style={styles.timer}>
          {timerComponents}
        </div>
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    textAlign: 'center' as 'center',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold' as 'bold',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '24px',
    marginBottom: '40px',
  },
  timer: {
    fontSize: '32px',
    fontWeight: 'bold' as 'bold',
  },
};

export default Home;
