import React from "react";
import appointment from "../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// calender style
const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    color: #0FCFEC;
    border: 2px solid #0FCFEC;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: #19D3AE;
    color: #19D3AE;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: #19D3AE;
  }
`;

const AppointmentHero = ({ date, setDate }) => {
  return (
    <div className="hero min-h-[70vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={appointment}
          className="max-w-sm rounded-lg shadow-2xl"
          alt="Appointment hero img"
        />
        <div>
          <style>{css}</style>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiersClassNames={{
              selected: "my-selected",
              today: "my-today",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentHero;
