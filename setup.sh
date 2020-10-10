#!/bin/bash

error() {
  echo $1
  exit 1
}

touch backend/.env
echo "# MongoDB Atlas" >> backend/.env
echo "MONGODB_CONNECTION_STRING=mongodb+srv://<user>:<password>@<uri>/<dbname>?<options>" >> backend/.env
echo "# JSON Web Token" >> backend/.env
echo "JWT_SECRET=<password>" >> backend/.env

cd backend
npm i || error "Error installing backend dependencies"
cd ../frontend
npm i || error "Error installing frontend dependencies"

echo "Setup completed"