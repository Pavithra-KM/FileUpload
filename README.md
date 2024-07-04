# FileUpload

## Description

This project involves building a comprehensive Node.js application with multiple functionalities, including data upload, data search, data aggregation, real-time server monitoring, and scheduled message posting. The project is divided into two main tasks, each with specific objectives and implementation details.


## Table of Contents

- [Task 1: Data Management API](#task-1-data-management-api)
  - [1. API to Upload CSV Data to MongoDB](#1-api-to-upload-xlsx-csv-data-to-mongodb)
  - [2. Search API to Find Policy Info by Username](#2-search-api-to-find-policy-info-by-username)
  - [3. API to Provide Aggregated Policy Data by User](#3-api-to-provide-aggregated-policy-data-by-user)
- [Task 2: Server Monitoring and Scheduled Messaging](#task-2-server-monitoring-and-scheduled-messaging)
  - [1. Real-Time CPU Utilization Tracking and Server Restart](#1-real-time-cpu-utilization-tracking-and-server-restart)
  - [2. Post-Service for Scheduled Messaging](#2-post-service-for-scheduled-messaging)
- [Installation](#installation)
- [Acknowledgements](#acknowledgements)

## Task 1: Data Management API

### 1. API to Upload CSV Data to MongoDB

- Implement an API that uploads data from CSV files into MongoDB.
- Utilize worker threads to handle file processing and data insertion efficiently.
- Each type of information (Agent, User, User's Account, LOB, Carrier, Policy) is stored in a separate MongoDB collection.

### 2. Search API to Find Policy Info by Username

- Develop an API endpoint to search and retrieve policy information using the username.
- Ensure efficient querying and data retrieval from the MongoDB collections.

### 3. API to Provide Aggregated Policy Data by User

- Create an API that aggregates and provides policy data for each user.
- Implement aggregation queries to compile data across multiple collections.

## Task 2: Server Monitoring and Scheduled Messaging

### 1. Real-Time CPU Utilization Tracking and Server Restart

- Implement a mechanism to track the real-time CPU utilization of the Node.js server.
- Automatically restart the server if CPU usage exceeds 70% to ensure optimal performance and prevent server overload.

### 2. Post-Service for Scheduled Messaging

- Create a POST service that accepts a message, day, and time as body parameters.
- Store the message in the database and schedule it to be inserted at the specified day and time.
  
## Installation

Step-by-step instructions on how to get a development environment running.

```bash
# Clone the repository
git clone https://github.com/Pavithra-KM/FileUpload.git

# Navigate into the project directory
cd FileUpload

# Install dependencies
npm install

## Acknowledgements

List of acknowledgements, inspirations, and resources used.
- [Node.js](#https://nodejs.org/)
- **[Express](https://expressjs.com/)**
- **[NPM](https://www.npmjs.com/)**
- **[MongoDB](https://www.mongodb.com/)**
