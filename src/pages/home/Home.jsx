import { Navbar } from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import "./home.css";

export const Home = () => {
  const [bets, setBets] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [flying, setFlying] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [cashOutAltitude, setCashOutAltitude] = useState(0);
  const [cashOutAmount, setCashOutAmount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [cashOutHistory, setCashOutHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [betPlaced, setBetPlaced] = useState(false);

  // Function to handle starting the flight
  const startFlight = () => {
    // Logic to update altitude over time (e.g., using setInterval)
    setFlying(true);
    setAltitude(0); // Reset altitude when starting a new flight
    setCashOutAltitude(Math.floor(Math.random() * 100) + 1); // Cash out altitude between 1 and 100
    setErrorMessage(""); // Clear any previous error messages
  };

  // Function to handle cashing out
  const cashOut = () => {
    if (!betPlaced) {
      setErrorMessage("You haven't placed a bet.");
      return;
    }
    // Logic to determine cash out amount based on current altitude
    const cashOutAmount = calculateCashOutAmount();
    setCashOutAmount(cashOutAmount);
    // Add cash out to history
    setCashOutHistory([...cashOutHistory, { altitude: altitude.toFixed(1), cashOutAmount }]);
    // Reset game state after a delay
    setTimeout(() => {
      setFlying(false);
      setCashOutAmount(0);
      setBetPlaced(false); // Reset betPlaced state
    }, 5000); // Delay for 5 seconds after cashing out
  };

  // Function to calculate cash out amount based on current altitude
  const calculateCashOutAmount = () => {
    // Example logic: cash out amount increases with altitude
    return altitude * 0.1; // Example: $0.10 per altitude unit
  };

  // Function to handle placing a bet
  const placeBet = () => {
    if (flying) {
      setErrorMessage("You cannot place a bet while the plane is in the air.");
      return;
    }
    // Logic to deduct bet amount from balance and update state
    setBalance(balance - betAmount);
    setBets(bets + 1);
    setBetPlaced(true); // Set betPlaced to true
    setErrorMessage(""); // Clear any previous error messages
  };

  // Effect to simulate plane movement
  useEffect(() => {
    let interval;
    if (flying) {
      let currentAltitude = 0; // Starting altitude
      interval = setInterval(() => {
        // Increment altitude
        currentAltitude += 0.5; // Increment by 0.5 in each interval
        setAltitude(currentAltitude.toFixed(1)); // Update altitude with one decimal point
        // Check if altitude reaches cash out altitude
        if (currentAltitude >= cashOutAltitude) {
          cashOut();
        }
      }, 500); // Interval: 500 milliseconds
    }
    return () => clearInterval(interval);
  }, [flying, cashOutAltitude]);

  // Effect to automatically start flight when cash out altitude is reached
  useEffect(() => {
    if (altitude >= cashOutAltitude && !flying) {
      startFlight();
    }
  }, [altitude, cashOutAltitude, flying]);

  // Effect to calculate time remaining before takeoff
  useEffect(() => {
    if (!flying && altitude < cashOutAltitude) {
      const remainingTime = Math.max(0, 10 - (altitude * 0.1)); // Remaining time in seconds
      setTimeRemaining(remainingTime);
    } else {
      setTimeRemaining(0);
    }
  }, [flying, altitude, cashOutAltitude]);

  return (
    <div>
      <Navbar balance={balance} />
      {/* Cash out history bar */}
      <div className="cash-out-history">
        <h3>Cash Out History</h3>
        <ul>
          {cashOutHistory.map((item, index) => (
            <li key={index}>
              Altitude: {item.altitude}, Cash Out Amount: ${item.cashOutAmount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-container">
        {/* Left side content bar */}
        <div className="left-side-content-bar">
          <div className="left-side-content-bar-title">
            <h3>All bets: {bets}</h3>
          </div>
          <div className="bets-list">
            <div className="bet-list-header">
              <p>User</p>
              <p>Stake</p>
              <p>Cash out</p>
            </div>
            <ul>
              <li>
                <div className="bet-list-item">
                  <p>User</p>
                  <p>{betAmount}</p>
                  <p>{cashOutAmount}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle content */}
        <div className="middle-content-bar">
          <div className="App">
            <h1>Spribe Aviator Clone</h1>
            <p>Balance: ${balance}</p>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button onClick={startFlight} disabled={flying || !betAmount}>
              Start Flight
            </button>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
            />
            <button onClick={placeBet}>Place Bet</button>
            <div className="plane-box">
              <div className="plane" style={{ top: `${altitude * 3}%`, right: `${altitude * 3}%` }}></div>
            </div>
            <p>Altitude: {altitude}</p>
            {flying && <p>Cash Out Altitude: {cashOutAltitude}</p>}
            <button onClick={cashOut} disabled={!flying || !betPlaced}>
              Cash Out
            </button>
            {cashOutAmount > 0 && <p>Profited Amount: ${cashOutAmount.toFixed(2)}</p>}
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(timeRemaining / 10) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Right side content bar */}
        <div className="right-side-content-bar">
          <div className="right-side-content-bar-title">
            <h3>Aviator</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
