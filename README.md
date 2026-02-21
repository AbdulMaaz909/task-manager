
# Task Tracker Frontend

## Overview
This is a full-featured Task Tracker web application frontend built with Next.js and React. It provides a comprehensive platform for employee and admin management, including task assignment, timesheet logging, salary management, expense tracking, leave management, memos, approvals, and a built-in AI chatbot assistant.

## Live Demo
Watch on Chrome: https://task-trackers-mu.vercel.app/

## Features

- **Authentication**: Secure login and registration for users and admins.
- **Role-based Dashboards**:
	- **Admin Dashboard**: Assign tasks, manage users, view all timesheets, expenses, memos, and handle approvals.
	- **User Dashboard**: View and update assigned tasks, log timesheets, manage expenses, apply for leave, write memos, and request approvals.
- **Task Management**:
	- Admins can create, assign, and delete tasks for users.
	- Users can view and update the status of their tasks (Pending, In Progress, Completed).
- **Timesheet Logging**:
	- Users can log daily work with start/end times, task names, and descriptions.
	- Admins can view all users' timesheets.
- **Salary Management**:
	- Admins can add salary details for employees (basic, bonus, deduction, net salary).
	- Users can view their salary history.
- **Expense Tracking**:
	- Users can add and track their daily expenses.
	- Admins can view all employee expenses and filter by employee name.
- **Leave Management**:
	- Users can apply for different types of leave (annual, sick, personal, maternity), track leave history, and view leave balances.
- **Memo System**:
	- Users can create, view, and delete personal memos.
	- Admins can view all memos from users.
- **Request Approvals**:
	- Users can submit requests (leave, asset, work from home, other) for admin approval.
	- Admins can approve or reject requests.
- **Settings**:
	- Admins can update profile, change password, enable/disable notifications, and toggle dark mode.
- **AI Chatbot**:
	- Integrated chatbot assistant for user help and support.

## Folder Structure

```
my-frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin pages (dashboard, users, salary, etc.)
│   │   ├── user/            # User pages (dashboard, expense, leave, etc.)
│   │   ├── register/        # Registration page
│   │   └── ...
│   ├── components/
│   │   ├── Admin/           # Admin components
│   │   ├── User/            # User components
│   │   ├── Chatbot/         # Chatbot component
│   │   ├── Login/           # Login component
│   │   ├── Register/        # Register component
│   │   ├── RequestAprovals/ # Request Approvals component
│   │   └── layout/          # Sidebar layouts
│   └── services/            # API service layer
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
└── ...
```

## How It Works

### Authentication & Roles
- Users and admins register and log in.
- JWT tokens are stored in localStorage for API authentication.
- Role-based routing directs users to the correct dashboard.

### Admin Functionality
- **Dashboard**: View stats, assign tasks, and manage all users.
- **Users**: View all registered users and their roles.
- **Add Salary**: Assign salary details to employees.
- **View Timesheet/Expenses/Memo**: Monitor all user activity.
- **Request Approvals**: Approve or reject user requests.
- **Settings**: Update admin profile and preferences.

### User Functionality
- **Dashboard**: View assigned tasks and update their status.
- **Timesheet**: Log daily work with time and description.
- **Expense**: Add and track personal expenses.
- **Leave**: Apply for leave, view history, and check balances.
- **Memo**: Write and manage personal memos.
- **Salary**: View salary details and history.
- **Request Approvals**: Submit requests for admin approval.

### Chatbot
- Accessible on all main pages for instant help and support.

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS
- Axios
- React Toastify
- Lucide React Icons

## Getting Started

1. **Install dependencies:**
	 ```bash
	 npm install
	 ```
2. **Run the development server:**
	 ```bash
	 npm run dev
	 ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## API Endpoints
All API requests are made to a backend server (default: `http://localhost:5000/api`). Endpoints include:
- `/auth/login`, `/auth/register`, `/auth/users`
- `/createtask`, `/getalltasks`, `/getmytask`, `/updatetask`, `/deletetask`
- `/createsalary`, `/mysalary`, `/getallsalary`
- `/createexpense`, `/getallexpense`, `/mysalary`
- `/creatememo`, `/getmemo`, `/deletememo`
- `/addtimesheet`, `/getalltimesheets`

## Contribution
Feel free to fork and contribute! Open issues or submit PRs for improvements.

## License
This project is for educational/demo purposes.
