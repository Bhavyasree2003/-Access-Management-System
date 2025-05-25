# Access Management System

## Introduction

### Purpose
The purpose of this document is to outline the requirements for a basic User Access Management System. This system allows users to sign up, request access to software applications, and enables managers to approve or reject these requests. The document aims to provide a clear understanding of the system's functionalities, user roles, and how they interact within the system.

### Scope
The system will implement the following features:
- User Registration (Sign-Up)
- User Authentication (Login)
- Software Application Listing and Creation
- Access Request Submission
- Access Request Approval or Rejection

## Overall Description

### Product Perspective
The User Access Management System is a web-based application designed to streamline the process of managing user access to various software applications within an organization. It is an internal tool meant to enhance security and efficiency.

### Product Functions
- **User Registration**: New users can sign up and create an account.
- **User Authentication**: Registered users can log in to the system.
- **Software Management**: Admins can add new software applications to the system.
- **Access Request Submission**: Employees can request access to software applications.
- **Access Request Approval**: Managers can approve or reject access requests.

### User Classes and Characteristics

#### Employee
- Can sign up and create an account
- Can log in to the system
- Can request access to software applications
- Cannot approve or reject access requests
- Cannot create new software applications

#### Manager
- Can log in to the system
- Can view pending access requests
- Can approve or reject access requests
- Cannot request access to software applications
- Cannot create new software applications

#### Admin
- Can log in to the system
- Has all the privileges of an Employee and Manager
- Can create new software applications
- Can manage system settings

### Operating Environment
- **Server-Side**: Java Servlet Container (e.g., Apache Tomcat)
- **Client-Side**: Web Browser with HTML, CSS, JavaScript support
- **Database**: PostgreSQL

### Design and Implementation Constraints
- The system must be developed using Java Servlets and JSP.
- PostgreSQL must be used for database management.
- The project should be managed using Maven.

## Specific Requirements

### Sign-Up System (`SignUpServlet`)
**Description**:  
Allows new users to register for the system by creating an account with a default role of "Employee".

**Functional Requirements**:
- **Sign-Up Page (`signup.jsp`)**
  - Fields:
    - Username (Text input)
    - Password (Password input)
    - Role (Hidden field, defaulted to "Employee")
  - On submission, data is sent to `SignUpServlet`.

- **`SignUpServlet.java`**
  - Stores the new user in the `users` table with a default role of "Employee".
  - Redirects to the Login Page upon successful registration.

### Login System (`LoginServlet`)
**Description**:  
Allows registered users (Employees, Managers, Admins) to log in to the system.

**Functional Requirements**:
- **Login Page (`login.jsp`)**
  - Fields:
    - Username
    - Password
  - On submission, data is sent to `LoginServlet`.

- **`LoginServlet.java`**
  - Validates credentials against the `users` table.
  - Manages user sessions.
  - Redirects users based on their role:
    - Employee: to `requestAccess.jsp`
    - Manager: to `pendingRequests.jsp`
    - Admin: to `createSoftware.jsp`

### Software Management (Admin Only)
**Description**:  
Admins can add new software applications to the system.

**Functional Requirements**:
- **Software Creation Page (`createSoftware.jsp`)**
  - Fields:
    - Software Name
    - Description
    - Access Levels (Read, Write, Admin)
  - On submission, data is sent to `SoftwareServlet`.

- **`SoftwareServlet.java`**
  - Adds new software into the `software` table.

### Access Request System (Employee)
**Description**:  
Employees can request access to software applications.

**Functional Requirements**:
- **Access Request Page (`requestAccess.jsp`)**
  - Fields:
    - Software Name (Dropdown)
    - Access Type (Dropdown: Read, Write, Admin)
    - Reason for Request
  - On submission, data is sent to `RequestServlet`.

- **`RequestServlet.java`**
  - Stores the request in the `requests` table with a status of "Pending".

### Approval System (Manager)
**Description**:  
Managers can approve or reject access requests.

**Functional Requirements**:
- **Pending Requests Page (`pendingRequests.jsp`)**
  - Displays pending requests:
    - Employee Name
    - Software Name
    - Access Type
    - Reason for Request
  - Managers can approve/reject requests via `ApprovalServlet`.

- **`ApprovalServlet.java`**
  - Updates the status of the request to "Approved" or "Rejected".

## Data Requirements

### Database Design (PostgreSQL)

#### `users` table
- `id` (Primary Key)
- `username` (Text, Unique)
- `password` (Text)
- `role` (Text: Employee, Manager, Admin)

#### `software` table
- `id` (Primary Key)
- `name` (Text)
- `description` (Text)
- `access_levels` (Text: Read, Write, Admin)

#### `requests` table
- `id` (Primary Key)
- `user_id` (Foreign Key referencing `users`)
- `software_id` (Foreign Key referencing `software`)
- `access_type` (Text)
- `reason` (Text)
- `status` (Text: Pending, Approved, Rejected)

## Deliverables

- **Source Code**:
  - Java Servlets:
    - `SignUpServlet.java`
    - `LoginServlet.java`
    - `SoftwareServlet.java`
    - `RequestServlet.java`
    - `ApprovalServlet.java`
  - JSP Pages:
    - `signup.jsp`
    - `login.jsp`
    - `createSoftware.jsp`
    - `requestAccess.jsp`
    - `pendingRequests.jsp`
- **Database Scripts**:
  - PostgreSQL script to create all tables.
- **Documentation**:
  - `README.md` file with setup and run instructions.

## Evaluation Criteria

- **Basic Functionality**: Signup, login, request access, approve/reject, software creation.
- **Code Structure**: Clean, modular Servlets and JSP structure.
- **Database Interaction**: Functional data operations with PostgreSQL.
- **Completeness**: All described features should be working.

## Roles Summary

### Employee
- Requests access to software
- Default role after sign-up

### Manager
- Reviews and approves/rejects requests

### Admin
- Manages software and settings
- Has all permissions of Employee and Manager
