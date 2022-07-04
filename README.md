This technical assessment task represents a rudimentary contacts storage system. Registered users have the option of storing contact details in the cloud and retrieving them later, removing them and editing them. The task is to design a simple, clean and modern UI for the pre-existing API.

The API server is non-persistent by design, and all data is stored in memory ONLY. The server may be reset on request which will reset all data to its initial values.

This is not a test with a specific right or wrong answer, you are free to choose your own approach and what you do or don’t include, however we would like to see a UI which at a minimum can:

- Interface with and retrieve a JWT token from the login endpoint
- Display and allow setting of the user’s profile image
- Retrieve a list of countries and their dialling codes for use in submitting contacts
- Display any error responses received from the backend to the user.
- 500 codes should be presented with a suitable text to inform the user to contact support if the problem persists
- 400 codes should be handled similarly.
- The non-standard use of a 418 error code indicates that the error message is to be displayed to the user.
- Allow the user to change their password
- Allow the user to save, update and delete contact details
