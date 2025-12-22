# Implementation Plan: User Role Hierarchy

## Overview

This plan implements UML-style class hierarchy with User as base class and Member/Admin as subclasses, including role-based authentication and authorization middleware.

## Tasks

- [x] 1. Update database schema for roles
  - [x] 1.1 Create migration to add/update role column in users table
    - Add role column VARCHAR(20) with default 'Member'
    - Add CHECK constraint for 'Member' or 'Admin' values
    - _Requirements: 6.1, 6.2, 6.4_

- [x] 2. Implement User base class with role support
  - [x] 2.1 Update User model with role property and methods
    - Add role to constructor with default "Member"
    - Add static findById method
    - Add getRole() method
    - Update save() to include role
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  - [ ]* 2.2 Write property test for role constraint
    - **Property 1: User Role Constraint**
    - **Validates: Requirements 1.5, 6.4**

- [x] 3. Implement Member class
  - [x] 3.1 Create Member model extending User
    - Extend User class with role="Member"
    - Add member-specific method stubs
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 4. Implement Admin class
  - [x] 4.1 Create Admin model extending User
    - Extend User class with role="Admin"
    - Inherit Member capabilities
    - Add admin-specific method stubs
    - _Requirements: 3.1, 3.2_

- [x] 5. Update AuthService for role handling
  - [x] 5.1 Update login to return and store role in session
    - Query role from database on login
    - Normalize role values (case-insensitive)
    - Default to "Member" if role is empty/null
    - Store role in session
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [ ]* 5.2 Write property test for role normalization
    - **Property 2: Role Normalization**
    - **Validates: Requirements 4.4**
  - [ ]* 5.3 Write property test for default role assignment
    - **Property 3: Default Role Assignment**
    - **Validates: Requirements 6.2, 6.3**

- [x] 6. Implement Authorization Middleware
  - [x] 6.1 Create requireAuth middleware
    - Check if session exists and has userId
    - Return 401 if not authenticated
    - _Requirements: 5.1, 5.2_
  - [x] 6.2 Create requireAdmin middleware
    - Check if user role is "Admin"
    - Return 403 if not admin
    - _Requirements: 5.3, 5.4_
  - [x] 6.3 Apply middleware to admin routes
    - Add requireAuth and requireAdmin to /api/admin/* routes
    - _Requirements: 5.5_
  - [ ]* 6.4 Write property test for unauthenticated denial
    - **Property 5: Unauthenticated Route Denial**
    - **Validates: Requirements 5.2**
  - [ ]* 6.5 Write property test for member admin route denial
    - **Property 4: Member Admin Route Denial**
    - **Validates: Requirements 2.5, 5.3**
  - [ ]* 6.6 Write property test for admin full access
    - **Property 6: Admin Full Access**
    - **Validates: Requirements 5.4**

- [x] 7. Checkpoint - Backend complete
  - Ensure all backend tests pass, ask the user if questions arise.

- [x] 8. Update frontend Login component
  - [x] 8.1 Store role in localStorage/sessionStorage after login
    - Save role from login response
    - _Requirements: 7.4_
  - [x] 8.2 Redirect based on role after login
    - Member → /ProfilePage
    - Admin → /admin
    - _Requirements: 7.1, 7.2_
  - [ ]* 8.3 Write property test for login role persistence
    - **Property 7: Login Role Persistence**
    - **Validates: Requirements 4.1, 4.2**

- [x] 9. Implement frontend route protection
  - [x] 9.1 Create ProtectedRoute component for admin routes
    - Check role from storage
    - Redirect Member to /ProfilePage if accessing /admin/*
    - _Requirements: 7.3_
  - [x] 9.2 Update App.js to use ProtectedRoute for admin routes
    - Wrap admin routes with role check
    - _Requirements: 7.3_
  - [ ]* 9.3 Write property test for frontend route protection
    - **Property 8: Frontend Member Route Protection**
    - **Validates: Requirements 7.3**

- [x] 10. Update navigation based on role
  - [x] 10.1 Update Sidebar/Navigation to show role-appropriate items
    - Show admin menu items only for Admin role
    - _Requirements: 7.5_

- [x] 11. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties
- Backend tasks (1-7) should be completed before frontend tasks (8-10)
