#Create a Form builder application
/ - Displays all the forms with the title
/form/create -> User should be able to create a form
/form/id/edit -> User should be able to edit the form
/form/id -> User can view the form

Create Form:
Need to provide a create Form Button in the home screen that navigates to create page
An empty form needs to be displayed
It should allow to edit the Title of the Form.
You need to provide an interface of your liking to allow the user to add different type of inputs to form.
Input types that has to be supported - Email, Text, Password, Number, date
You also need to ask the additional parameters for the input like title of the input, placeholder while selecting the type of the input
Upon selecting the input type, input with the title has to be added onto the Form.
Form has to display the inputs in (n rows x 2 columns) manner
Inputs should display in read only mode
Should allow maximum of 20 inputs
Should allow deleting the input from the form
Should provide a button to save the form in the Database


Edit From:
Should be able to edit the previously created form.


View Form:
User should be able to view the entire form with the exact same structure that was displayed during creation.
Should allow user to enter data into the inputs. All the type validations must work
A submit button must be provided which allows user to submit the form
Storing the responses from the form is optional

Bonus -
Can provide an option to arrange the inputs in the form while creating and editing the form using drag and drop
Can provide an option to group inputs into sections


Technologies:
Frontend - Reactjs (Not allowed to use any third party library except for Drag and Drop)
Design - anything of your choice
Backend - Sailsjs/Expressjs
Database - Mongodb