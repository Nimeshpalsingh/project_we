
CRUD Operations with React.js and Node.js
Overview
This documentation provides an overview of a simple CRUD application developed using React.js for the frontend and Node.js for the backend. The application allows users to create, read, update, and delete records, and also provides the functionality to copy the table as an image to the clipboard.

Technologies Used
React.js
Node.js
Express.js
Axios
HTML-to-Image
Copy-Image-Clipboard
SweetAlert2
React Bootstrap
React.js Frontend
Components
Home Component
The Home component serves as the main page of the application. It includes:

A form for adding and editing records.
A table for displaying records.
Buttons for adding, copying the table to the clipboard, and searching records.
State
show: Manages the visibility of the Add/Edit modal.
formValues: Stores form input values.
formErrors: Stores validation errors for form inputs.
formRefs: References to form input elements.
searchQuery: Stores the search query.
showUpdateBtn: Indicates whether the modal is in edit mode.
isLoading: Indicates if a loading spinner should be displayed.
showButtonLoader: Indicates if a loading spinner should be displayed on buttons.
isSubmitting: Indicates whether the form is currently being submitted.
addData: Stores the list of records.
indexToEdit: Index of the record being edited.
sortColumn: Column used for sorting the table.
sortOrder: Order of sorting (ascending/descending).
Functions
loadStoredData(): Loads data from local storage when the component is mounted.
handleSort(column): Handles sorting of the table based on the selected column.
submitClickHandler(): Initiates form submission.
submit(): Performs form submission, validates data, and updates the state.
keyDownHandler(e, name): Handles key events for input fields.
deleteClickHandlar(indexToDelete): Handles record deletion.
editClickHandlar(indexToEdit): Handles record editing.
onClickAddBtn(): Opens the Add/Edit modal for adding a new record.
copyImageBtn(): Copies the table as an image to the clipboard using HTML-to-Image and Axios.
Render
Renders buttons for Add and Copy to Clipboard.
Renders a search input field.
Renders the table with sortable columns.
Displays a loading spinner if isLoading is true.
Displays the Add/Edit modal.
CommonInputBoxNew Component
This component is used for rendering input fields in the form. It includes various properties such as name, label, value, error, and validationType to control input behavior.

Loader Component
The Loader component displays a loading spinner.

Node.js Backend
Dependencies
Express.js: A web application framework for Node.js.
Axios: A promise-based HTTP client for making requests to the frontend.
base64-img: A library for converting base64 data to an image file.
fs: The Node.js file system module for working with file operations.
path: The Node.js path module for working with file paths.
cors: Middleware for handling Cross-Origin Resource Sharing.
Routes
/base64_to_image POST Route
This route receives base64 image data from the frontend, saves it as an image file, and responds with the file path. The main steps are as follows:

Receive base64 image data from the request.
Define a filename and file path for the image.
Use the base64-img library to convert and save the image.
Respond with the file path of the saved image.
Static Files
The server serves static image files located in the ./images directory. This directory is used to store the images generated from base64 data.

Server Start
The server listens on a specified port (default is 5000) and logs a message indicating that it is running.

Running the Application
To run the application, follow these steps:

Install the required dependencies for both the frontend and backend using npm install in their respective directories.
Start the Node.js server using npm start in the backend directory.
Start the React.js development server using npm start in the frontend directory.
Access the application in a web browser at http://localhost:3000 (or the specified port for React.js).
Conclusion
This documentation provides an overview of a CRUD application built with React.js and Node.js. It includes details on the frontend components, state management, and backend routes for handling base64 image data. You can use this as a reference for building similar applications or extending the functionality as needed.