# *Eventi-Scout*

## *Project Overview :*
LocalVibe Lite is a web application designed to help users discover local events based on city, category, and date. Users can search for events happening around their area, bookmark events of interest, and remove bookmarked events from the list. The application enhances the digital experience by seamlessly integrating user interaction with event data fetched via an external API. Users can view event details, bookmark events, and even share their bookmarked events via email.
This project is a streamlined version of a larger platform with a focus on simplicity, user experience, and performance. The application is built with React and uses the Ticketmaster API to fetch real-time event data based on user inputs.
________________________________________
## *Scope of the Project :*
- *Event Discovery:* Users can search for local events based on city/zip code, category, and date.
- *Bookmarking Feature:* Users can bookmark events, which are saved locally (in-memory) and displayed in a separate "Bookmarked Events" section.
- *Event Management:* Events that are bookmarked are removed from the main event list and can be unbookmarked to move them back to the main event list.
- *Email Integration:* Users can email their bookmarked events by entering their email address and receiving the event list via EmailJS.
________________________________________
## *Digital Experience :*
LocalVibe Lite aims to enhance the Connected World by creating a more interactive digital experience:
- *User-Friendly Interface:* With a clean and intuitive interface, users can quickly find local events of interest without being overwhelmed.
- *Personalized Event Management:* The bookmarking feature allows users to personalize their experience by saving events they want to attend and removing those they don't.
- *Email Functionality:* Bookmarked events can easily be shared via email using the integrated EmailJS service, making it convenient to share events with friends and family.
________________________________________
## *Features :*
- City/Category Search: Find events based on your city and preferred category.
- Date Filter: Search for events happening on a specific date.
- Bookmark Events: Save events to your bookmarked list for easy access later.
- Unbookmark Events: Remove bookmarked events and send them back to the event list.
- Email Bookmarked Events: Share your bookmarked events by email.
- Responsive Design: Optimized for mobile and desktop use.
________________________________________
## *Installation and Setup Instructions:*
### *Prerequisites*
- Node.js (v14 or higher)
- npm (v6 or higher)
### Steps to Install and Run the Application
*1.	Clone the Repository:* Clone the GitHub repository to your local machine:


git clone https://github.com/ragulkumar-v/Eventi-Scout/


2.	Navigate to the Project Directory:
   
cd localvibe-lite

4.	Install Dependencies: Use npm to install the project dependencies:

npm install

6.	Set Up API Keys:
- This project uses the Ticketmaster API to fetch event data. Sign up for an API key here.
- Add your API key to the environment file. Create a .env file in the root of your project and add your key:
*REACT_APP_TICKETMASTER_API_KEY=your-api-key-here*
- To enable email functionality, sign up for EmailJS and add your public and service keys to the .env file:
*REACT_APP_EMAILJS_SERVICE_ID=your-service-id-here*
*REACT_APP_EMAILJS_TEMPLATE_ID=your-template-id-here*
*REACT_APP_EMAILJS_USER_ID=your-user-id-here*
7.	Run the Application: Start the development server:

npm start

8.	Access the Application: Once the server is running, open your browser and go to:

http://localhost:3000

________________________________________
## *How to Use the Application*
1.	*Search for Events:* Enter a city or zip code, choose a category, and select a date to filter events.
2.	*Bookmark an Event:* Click the "Bookmark" button to save an event.
3.	*Unbookmark an Event:* Click the "Remove" button in the bookmarked section to move an event back to the main event list.
4.	*Send Bookmarked Events by Email:* Enter an email address and click "Send" to share bookmarked events via email.
________________________________________
## *Technologies Used*
•	Frontend: React.js, HTML5, CSS3, JavaScript
•	Backend: Ticketmaster API for event data
•	Email Service: EmailJS
•	Styling: Flexbox, CSS3, Responsive Design
•	Version Control: Git & GitHub
________________________________________
## *Future Enhancements*
•	User Authentication: Add user login and authentication features to allow users to save bookmarks across sessions.
•	Persistent Storage: Use a backend database (e.g., MongoDB) to persist event bookmarks.
•	Additional Filters: Introduce more event filters (e.g., price range, distance).
•	Event Notifications: Allow users to receive notifications for bookmarked events.
________________________________________
## *License*
This project is licensed under the MIT License. See the LICENSE file for details.
________________________________________
## *Contact*
For more information or queries about this project, feel free to contact:
•	Your Name: Ragul Kumar Venkateswaran
•	Email: ragulkumar2611@gmail.com
## **Contributors: **
Raja S
Kavennesh
Shabaazh
