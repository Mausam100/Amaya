import React, { useState } from "react";

function BookingFrom() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#3330 flex items-center justify-center z-50">
      <div className="w-full max-w-3xl bg-[#1d1d1da6] backdrop-blur-xs rounded-lg p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-[#d4af7a] mb-6">
          Make a Reserve
        </h2>
        <form  className="grid grid-cols-2 gap-6">
          {/* Name Input */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm text-white mb-2">Your Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#d4af7a]"
              required
            />
          </div>

          {/* Phone Input */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm text-white mb-2">Your Phone *</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#d4af7a]"
              required
            />
          </div>

          {/* Persons Dropdown */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm text-white mb-2">Number of Persons</label>
            <select
              name="persons"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#d4af7a]"
            >
              <option>1 Person</option>
              <option>2 Persons</option>
              <option>3 Persons</option>
              <option>4 Persons</option>
              <option>5 Persons</option>
            </select>
          </div>

          {/* Date Input */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm text-white mb-2">Date</label>
            <input
              type="date"
              name="date"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#d4af7a]"
              required
            />
          </div>

          {/* Time Dropdown */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm text-white mb-2">Time</label>
            <select
              name="time"
              className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#d4af7a]"
            >
              <option>07:00 pm</option>
              <option>08:00 pm</option>
              <option>09:00 pm</option>
              <option>10:00 pm</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#ffd191] text-black font-bold rounded-lg hover:bg-[#edc38d] transition-colors"
            >
              Book a Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingFrom;
