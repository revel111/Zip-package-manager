## Zip package manager

The project itself a website with the user-friendly UI for uploading and downloading zip files with the statistics about each user, such as how many zips he uploaded.

## Details
- Three distinct roles: admin, user, guest. Each of them has a unique ability, such as a user should be authenticated to upload a zip file or a user has to have adming to promote, demote or delete a user's account.
- CRUD operations: each entity in the project provides fully working interfaces for creating, reading, updating and deleting them (except roles).
- Pagination: view tables and zip feed page tightly work with pagination.
- Security: for authentication JWT tokens were used and certain handler and clauses on backend for safe resource managment.
- UI: the clean and minimalistic UI which might catch your eye.

### Pages
![image](https://github.com/user-attachments/assets/2bb4af2b-9737-44d4-a0ea-62666926dfd9)
![image](https://github.com/user-attachments/assets/eb746862-ffe5-4bb7-b810-1a6a2e349ec5)
![image](https://github.com/user-attachments/assets/aae29b64-2f70-4519-b1f4-e8f5c7777e05)
![image](https://github.com/user-attachments/assets/4e314888-d817-4e32-9c42-8a31c5790f00)
![image](https://github.com/user-attachments/assets/6ad3d240-2741-48e0-acee-64cfc78706d3)


## Tech stack
This project consists of two parts: backend and frontend. The backend was written in Express JS and the frontend was written in React primarly using components from [MUI](https://mui.com). Docker was also used for a simple transition from device to device.
