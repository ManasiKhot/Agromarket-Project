
🌱 AgroMarket - Farmer to Buyer Platform

AgroMarket is a full-stack web application designed to bridge the gap between farmers and consumers. By eliminating intermediaries (middlemen), the platform ensures farmers get fair prices for their produce while buyers receive fresh, transparently sourced agricultural products at competitive rates.

🚀 Features

🧑‍🌾 For Farmers

Dedicated Dashboard: A secure panel to manage product listings.

Inventory Management: Add, Update, and Delete produce with details like Name, Price, Quantity, and Images.

Transparency: Display personal details (Name, Location, Contact Number) directly to buyers.

Pricing Control: Set "Actual Price" and "Discount Price" to attract customers.

🛒 For Buyers

Browse & Search: View all available produce with advanced filtering (Category, Price Range, Search Keyword).

Product Details: View detailed product information, stock status, and farmer location.

Direct Contact: "Call Farmer" button to negotiate or inquire directly without middlemen.

Shopping Cart: Add items to a global cart, adjust quantities, and view the total bill.

Secure Checkout: Place orders which are saved to the database.

🔐 General Features

Role-Based Authentication: Secure Login/Registration for Farmers and Buyers using Spring Security.

Responsive Design: Fully optimized for Mobile, Tablet, and Desktop using Tailwind CSS.

Real-time Updates: Instant UI updates without page reloads (Single Page Application).

🛠️ Technology Stack

Layer

Technology

Description

Frontend

React.js (Vite)

Fast, component-based UI library.

Styling

Tailwind CSS

Utility-first CSS framework for responsive design.

State Mgmt

Context API

For managing Auth state and Shopping Cart.

Backend

Spring Boot

robust Java-based framework for REST APIs.

Security

Spring Security

For Password Hashing (BCrypt) and Auth.

Database

MySQL

Relational database for Data Consistency.

ORM

Hibernate / JPA

For mapping Java Objects to Database Tables.
