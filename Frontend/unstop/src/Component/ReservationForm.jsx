import React, { useState } from 'react';

function ReservationForm() {
  const [numSeats, setNumSeats] = useState('');
  const [reservationResult, setReservationResult] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numSeats }),
      });

      const data = await response.json();
      setReservationResult(data);
      console.log(data);
      // Handle the response data here (e.g., display a success message or error)
    } catch (error) {
      console.error('Error occurred while reserving seats:', error);
    }
  };

  return (
    <div>
      <h2>Seat Reservation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Seats:
          <input
            type="number"
            value={numSeats}
            onChange={(e) => setNumSeats(e.target.value)}
          />
        </label>
        <button type="submit">Reserve Seats</button>
      </form>
      {reservationResult && (
        <div>
          {reservationResult.success ? (
            <p>Seats reserved successfully: {reservationResult.reservedSeats}</p>
          ) : (
            <p>Reservation failed: {reservationResult.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ReservationForm;
