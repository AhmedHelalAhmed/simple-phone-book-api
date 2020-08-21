# Phone Book API

A phone book to store user contact information

Each contact have the following information

- Name
- Address
- Email Address
- Phone numbers (Array of numbers)

1. We need to store AppAuthKey in the configuration file.
2. We need to maintain data persistence (Use JSON file).
3. The JSON file should be readable.
4. We need only authorized users to access these resources (authorized requests contain appauthkey header).
5. Create the following APIS
   - Create Contact
   - Get all contacts
   - Get contact by id
   - Delete contact
   - Update contact
   - Implement Custom endpoint for search by name, email phone

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. you can check docs directory to get postman collection or [postman collection](https://www.getpostman.com/collections/ad6cf7c0d83f72e0cfb3)

### Prerequisites

Some packages need to be install via npm check Installing section

### Installing

open terminal in project directory then do the command

```
npm install
```

To get all dependancies Then

```
node server.js
```

or

```
npm start
```

To start the Server

## Built With

- [Node.js](https://nodejs.org) - Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.
- [Express.js](https://expressjs.com) - Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License

## Authors

- **Ahmed Helal Ahmed** - _Initial work_ - [Ahmed Helal Ahmed](https://github.com/AhmedHelalAhmed)

See also the list of [contributors](https://github.com/AhmedHelalAhmed/simple-phone-book-api/contributors) who participated in this project.

## License

This project is licensed under the MIT License

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
