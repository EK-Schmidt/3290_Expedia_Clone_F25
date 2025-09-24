This project is a web app built for SE 3290, It replicates most of Expedia, allowing users to search, filter and book flights and stays while allowing admins the ability to change
book, delete entries. 

This app is built with React, Redux, Firebase, and Node.js

FEATURES

User

Landing Page with navigation and search

Login and Signup via Firebase Authentication (phone/OTP)

Flights

Search and view flight details

Add to cart and proceed to checkout

Hotels

Search by city and date range

Filter by price range and availability

View hotel details and book stays

Cart

View all selected flights and hotels

Remove items from cart

Display total price

Dark/Light Theme Toggle

Administrator

Admin Panel with sidebar navigation

Add Flights & Hotels to the database (Firestore)

View All Listings with delete/edit functionality

Booking Requests Management

Cart & Transaction Oversight

HOW TO INSTALL

1. Clone repository

using git, you can clone the repository with: 

git clone https://github.com/EK-Schmidt/3290_Expedia_Clone_F25.git
cd 3290_Expedia_Clone_F25

2. Install Dependencies: 
In a console, type: npm install

3. Config Firebase:

Go to Firebase Console
Create a Project and enable. Firestore Database, Authentification (Phone/OTP)

Copy your config and update it inside path 

src/01_firebase/config_firebase.js

4. Run the application locally by typing: npm start

4.5 Run the JSON Server (as Needed)
