# recipe-app-week3

FlavorFinder ReadME

Project Title

	FlavorFinder

Project Description

	Welcome to Flavorfinder! This is a recipe saving web application created by Forge Launch 2024 students in order to extend the knowledge of API requests and firebase while incorporating skills such as Express backend and authentication. In order to use this application, the user should make sure their account is created within the email list of our project. This web application was created in order to keep users engaged with user created recipes and also Edamam API created recipes. The features of the web application include: home page, all recipes page, recipe details page,my recipes page, create recipe page, and admin page.

Table of Contents

    Project Description 
    Installation
    How to use Project
    Major Features and Components
    Current Status
    Credits

Installation

Initial setup: 

    Begin by cloning the github repo with the following command (you may need to first either fork the repo or request permissions to do so if not already allowed): 
        git clone https://github.com/FridahNtika/recipe-app-week3.git

    Next change directories into the front end folder and within the recipes folder run the following command: 
        -npm install 

    Next change directories into the backend folder and run the following command: 
        npm install 

        *To view specific installations taking place when using npm install, refer to the description section of the package,json file. 

    In addition, go to the firebase portal and generate a new private key, which will be downloaded locally to your computer. Rename this file permissions.json and add it to the backend folder. This serves as your credentials to access the firebase database. 

        *Both the back and front end files contain a .gitignore, which is set up to already include all the anticipated private files within the project (node_modules, permissions.json, and .env)

Running the App:

    To run the app locally you first need to open two terminals. In one terminal change directories into the recipes folder. Within this folder start the front end by running the command:
        Npm run dev

    Next, to start the back end change directories in into the backend folder and run the command:
        Npm start

    Running both commands should ensure the front and back end are properly running. If you return to the command where you ran npm run dev, you should see a local host link which you can copy into the browser to run the file. 
	


How to use Project
    Log in as a User: Once logged in you can navigate to different pages by clicking on the side bar
    All recipes Page: All users can view this page and see the local databases recipes but also the Edamam API recipes.
    My Recipes Page: You can see the recipes you’ve liked and also the recipes you’ve created.
    Add Recipes Page: You can add a recipe to put into the database. However, it will not be shown unless the recipe is approved by the admin.
    Admin Page: The admin is able to add and remove recipes and also approve of pending recipes.

Major Components and Features 
    Viewing all recipes with their reviews, approximate cooking time, author, and name of the recipe.
    Users can create their own recipes to show others a recipe they enjoy and want to share.
    Users can review, like and share their recipes.
    Admins can approve or disapprove recipes.

Credits 
    Collaborators:
        Sara Inoue – Software Engineer
        Carson Colyer – Software Engineer
        Fridah Ntika – Software Engineer
        Milton Vento– Software Engineer
        Ahn Nguyen – Software Engineer

    Special Thanks to:
        Edamam API - for providing necessary API services for this project.
        Forge Launch 2024 Program - for tasking and supporting this project.



