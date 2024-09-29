import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import emailjs from "emailjs-com";
function App() {
  const [location, setLocation] = useState("Miami"); // Default city set to Miami
  const [category, setCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]); // State to hold fetched events
  const [bookmarks, setBookmarks] = useState([]); // State to hold bookmarked events
  const [email, setEmail] = useState(""); // State to hold entered email

  const TICKETMASTER_API_KEY = "yodXRWLLvt0Nlcb4Uk3hpB3RPbWi79Ac"; // Replace with your API key

  // Format the date to YYYY-MM-DD in UTC format for the API
  const formatDate = (date) => {
    if (!date) return null;

    // Create a new Date object in UTC based on local midnight
    const utcYear = date.getUTCFullYear();
    const utcMonth = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is zero-indexed
    const utcDay = String(date.getUTCDate()).padStart(2, "0");

    return `${utcYear}-${utcMonth}-${utcDay}`;
  };

  // Fetch events from Ticketmaster API whenever filters change
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Prepare the API URL with the search filters
        const url = new URL(
          "https://app.ticketmaster.com/discovery/v2/events.json"
        );

        // Add required query parameters
        url.searchParams.append("apikey", TICKETMASTER_API_KEY);
        url.searchParams.append("city", location); // Add the city
        if (category !== "all")
          url.searchParams.append("classificationName", category); // Add category if not 'all'

        // If a date is selected, apply both startDateTime and endDateTime filters
        if (selectedDate) {
          const formattedDate = formatDate(selectedDate);
          url.searchParams.append(
            "startDateTime",
            `${formattedDate}T00:00:00Z`
          );
          url.searchParams.append("endDateTime", `${formattedDate}T23:59:59Z`);
        }

        // Fetch the events from Ticketmaster API
        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Log the API response to check the structure

        // Check if the data contains events
        if (data._embedded && data._embedded.events) {
          setEvents(data._embedded.events); // Update state with fetched events
        } else {
          console.log("No events found for this search criteria.");
          setEvents([]); // Set empty array if no events are found
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    // Fetch events when the location, category, or date changes
    fetchEvents();
  }, [location, category, selectedDate]); // Dependencies: city, category, and date

  // Handle location (city) change
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle date change
  // Handle date change and set it to the start of the selected day in local time
  const handleDateChange = (date) => {
    if (date) {
      // Set the selected date to the start of the day in local time
      date.setHours(0, 0, 0, 0); // Set to midnight local time
    }
    setSelectedDate(date); // Store the adjusted date
  };

  // Function to toggle event bookmarking and remove from event list
  const handleBookmark = (event) => {
    // Check if the event is already bookmarked by comparing event IDs
    const isBookmarked = bookmarks.some(
      (bookmarkedEvent) => bookmarkedEvent.id === event.id
    );

    if (!isBookmarked) {
      // If not already bookmarked, add the event to the bookmarks and remove it from events
      setBookmarks((prevBookmarks) => [...prevBookmarks, event]);
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id)); // Remove from events
    }
  };
  // Remove the event from the bookmarks
  const handleRemoveBookmark = (event) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmarkedEvent) => bookmarkedEvent.id !== event.id)
    );
    // Add the event back to the events list
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to send bookmarked events to the provided email
  const sendEmail = (e) => {
    e.preventDefault();

    if (bookmarks.length === 0) {
      alert("No bookmarked events to send.");
      return;
    }

    const bookmarkedDetails = bookmarks
      .map(
        (event) =>
          `Event: ${event.name}\nDate: ${new Date(
            event.dates.start.localDate
          ).toLocaleDateString()}\nLink: ${event.url}\n\n`
      )
      .join("");

    const templateParams = {
      from_name: "Eventi-Scout",
      to_email: email,
      message: bookmarkedDetails,
      from_email: "ragulkumar2611@gmail.com", // Sender's email
    };

    emailjs
      .send(
        "service_l4ju689", // Replace with your EmailJS Service ID
        "template_2sr6gy6", // Replace with your EmailJS Template ID
        templateParams,
        "RMnbOvESzwo_F_1hw" // Replace with your EmailJS User ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Bookmarked events sent to your email!");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Failed to send email. Please check your email id.");
        }
      );
  };

  return (
    <div className="App">
      <h1 className="main-title">Eventi-Scout</h1>
      <p className="subtitle">
        Discover local events by your your city, category, and date
      </p>
      <p className="subtitle">
        Find exciting local events, mark your favorites, and get them sent
        directly to your inbox!
      </p>
      {/* Filter inputs in a flexbox container */}
      <div className="filter-container">
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter city"
          className="location-input"
        />

        <select
          value={category}
          onChange={handleCategoryChange}
          className="category-dropdown"
        >
          <option value="all">All Categories</option>
          <option value="arts">Arts</option>
          <option value="theater">Theater</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
        </select>

        {/* Date Picker for selecting the event date */}
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Select event date"
            className="date-picker"
            dateFormat="MMMM d, yyyy"
          />
        </div>
      </div>
      {/* Polaroid-style images with relevant event photos from Miami */}
      <div className="polaroid-container">
        <a target="_blank" rel="noopener noreferrer" className="polaroid">
          <img src="/images/Arts.jpeg" alt="Food & Fun in Miami" />
          <div className="caption">Arts</div>
        </a>
        <a target="_blank" rel="noopener noreferrer" className="polaroid">
          <img src="/images/Theater.jpeg" alt="City Vibes - Miami" />
          <div className="caption">Theater</div>
        </a>
        <a target="_blank" rel="noopener noreferrer" className="polaroid">
          <img src="/images/miami-music.jpg" alt="Miami Music & Arts" />
          <div className="caption">Music</div>
        </a>

        <a target="_blank" rel="noopener noreferrer" className="polaroid">
          <img src="/images/sports.jpeg" alt="Food & Fun in Miami" />
          <div className="caption">Sports</div>
        </a>
      </div>
      <button
        onClick={() =>
          alert(
            `Searching events for: ${location} in ${category} on ${
              selectedDate ? selectedDate.toDateString() : "any date"
            }`
          )
        }
      >
        Search
      </button>
      <div className="event-list">
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.name}</h3>
              <p>
                Date:{" "}
                {new Date(event.dates.start.localDate).toLocaleDateString()}
                &nbsp; - &nbsp; Time:{" "}
                {event.dates.start.localTime
                  ? event.dates.start.localTime
                  : "N/A"}{" "}
                {/* Display time next to the date */}
              </p>
              <button className="view-details-btn">
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  View Details
                </a>
              </button>
              <button onClick={() => handleBookmark(event)}>Bookmark</button>
            </div>
          ))
        )}
      </div>

      <h2 className="bookmarks-title">Bookmarked Events</h2>
      <div className="bookmarked-events">
        {bookmarks.length === 0 ? (
          <p className="no-bookmarked-events">
            Come on!! SAVE SOME EXCITING EVENTS!!
          </p>
        ) : (
          bookmarks.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.name}</h3>
              <p>
                Date:{" "}
                {new Date(event.dates.start.localDate).toLocaleDateString()}
              </p>
              <button className="view-details-btn">
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  View Details
                </a>
              </button>
              <button onClick={() => handleRemoveBookmark(event)}>
                Remove
              </button>{" "}
              {/* Add Remove button */}
            </div>
          ))
        )}
      </div>

      {/* Email Section */}
      <div className="email-section">
        <h3>Send Bookmarked Events to Your Email!!!</h3>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="email-input"
        />
        <button className="mail-me-btn" onClick={sendEmail}>
          Mail Me
        </button>
      </div>
    </div>
  );
}

export default App;
