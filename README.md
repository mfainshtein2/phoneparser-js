# phoneparser-js

## Prerequisites
- Node.js
- Postman(nice to have)

## Installing
- Download this repo
- Navigate to its Directory via command line
- run the following to install all the packages
```ch
npm install
``` 

## How to use

### Start the server by entering:
```ch
npm run dev
``` 
The following is obtained by using Postman
### Running as Get
- Enter http://localhost:8000/api/phonenumbers/parse/text/testparser+12224445555 into the URL(only one works).
- Hit send and the following  should appear:


### Running as Post
- Enter http://localhost:8000/api/phonenumbers/parse/file into the URL.
- Enter a Header Key as shown below:

- Attach the file as form-data in the body and name it 'file':

- This should be the result:

## How to Test
Enter the following in the command line:
```ch
npm run jest
``` 
