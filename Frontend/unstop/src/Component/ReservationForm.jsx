import React, { useState } from 'react';

function ReservationForm() {
  const [numSeats, setNumSeats] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numSeats }),
      });

      const data = await response.json();
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
    </div>
  );
}

export default ReservationForm;
