# Spotify Clone

## Introduction
This repository contains the frontend codebase for the final project - Spotify Clone (FullStack).

## Description
The project is meant to clone the basic functionalities of the frontend for the [Spotify Website](https://open.spotify.com/). 

### Features of the Web Application
Features of the website include:
1. Login
2. Signup
3. Logout
4. Profile (Update profile)
5. Artist Profile <sup>new</sup>
    1. Follow artists
    2. View artists public data
6. Other User Profile <sup>new</sup>
    1. Follow users
    2. View users public data
7. Homepage
8. Settings (to allow user to become an artist for access to 9.1, 9.2 and 10.1, 10.2, 10.3)
9. Album
    1. Create an Album
    2. Delete an album
    3. Like an album
    4. View Details
10. Song
    1. Upload a song
    2. Update a song
    3. Delete a song
    4. Like a song
    5. View Details
11. Playlists <sup>new</sup>
    1. Create New Playlist
    2. Update Your Playlist
    3. Delete Your Playlist
    4. Remove Track From Playlist
    5. Add Song To Playlist
    6. Like A Playlist
    7. View Details
12. Homepage Media Player <sup>new</sup>
    1. Keeps Track of Queue (Tracklist)
    2. Next and Previous Songs
    3. Increment Streams
13. Homepage Content shows: <sup>new</sup>
    1. Recently Played Albums and Playlists
    2. Sidebar with Liked Songs and User Library Items (artists, albums, playlists)
    3. New Album Releases
    4. Recently Created Public Albums
    5. Followed Users
14. Userdata Library Sidebar (Automatic) <sup>new</sup>
    1. Update recent items
    2. Update liked items
    3. Remove recent items
    4. Remove liked items
15. Search <sup>new</sup>
    1. Search using genre
    2. Seach using keyword

## Clone the repository

Run the following commands to clone the repository and test out the playlist branch.

`$ git init`

`$ git clone https://gitlab.arbisoft.com/minahil.faisal/final-project-frontend.git`

`$ cd final-project-frontend`

`$ git pull origin playlist`

## Installation / Project Setup

This project uses React + Vite with HMR and ESLint rules.

To setup the project, run

`$ npm install`

Now, run the server and open the website on `http://localhost:3000/`

`$ npm run dev`

You can login using the following test credentials:

username: minahil
password: testing321

**Note:** Make sure the backend for this project is running on `http://localhost:8000/`

## Working routes

Working routes for this project include:

Login: http://localhost:3000/auth/login

Signup: http://localhost:3000/auth/signup

Protected routes (after successful signup and login)

Homepage: http://localhost:3000/

User's Own Profile: http://localhost:3000/profile

Other user's Profile: http://localhost:3000/profile/{username}

Artist Profile: http://localhost:3000/artists_profile/{username}

**Note:** Click on the profile icon in the top right corner of the homepage (once you have logged in) to access the following pages and the logout button.

Settings: http://localhost:3000/settings

**Note:** You will have to update yourself to an artist to access the following page:

Create an Album / Upload a song: http://localhost:3000/artists_create

Album Details: http://localhost:3000/album_details/{id}

Playlist Details: http://localhost:3000/playlist_details/{id}

User's Own Liked Songs Playlist: http://localhost:3000/playlist_details/liked_songs

Search: http://localhost:3000/search

Get Tracks by Genre: http://localhost:3000/genre/{id}

## Project status
Development.

