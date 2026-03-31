![Logo](https://www.raffaelebini.com/assets/img/LogoRBScuroPiccolo.png)

![JavaScript](https://img.shields.io/badge/javascript-yellow?logo=javascript)
![HTML](https://img.shields.io/badge/html-blue?logo=html5)
![CSS](https://img.shields.io/badge/css-blue?logo=css3)
![React](https://img.shields.io/badge/react-js?logo=react)

# React Project: Vegetarian Recipes APP Chef Hippo

Chef Hippo is a responsive React web app designed for vegetarian users who want to discover new recipes in a simple and enjoyable way. The application connects to the Spoonacular API and allows users to search only for vegetarian recipes, showing a clean interface with recipe cards, images, and a dedicated detail page for each result. The Application was developed as final project for the React course in Start2Impact.

## How it works

The app starts with a search interface where users can type an ingredient or the name of a dish. When a search is submitted, the application sends a request to the Spoonacular API using the complexSearch endpoint with the diet=vegetarian parameter, so that only vegetarian recipes are returned.

The search results are displayed as responsive recipe cards, each showing the recipe title, image, and preparation time when available. When the user clicks on a recipe, the app navigates to a dedicated detail page using React Router. This page fetches additional information from the API, including ingredients, instructions, servings, and cooking time.

The project is built with React, React Router, Axios, and Context API. Context API is used to manage shared state such as search results, loading status, error messages, and the current search term, making the app structure more organized and easier to understand.

## App Link

[Click here to launch the App](https://RaffaeleBini.github.io/Progetto-React)

## Screenshots

![App Screenshot](src/assets/chefhippo.png)

## Author

- [@RaffaeleBini](https://www.github.com/RaffaeleBini)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_homepage-000?style=for-the-badge&logo=ko-fi&logoColor=yellow)](https://www.raffaelebini.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://https://www.linkedin.com/in/raffaelebini/)

## Feedback

If you have any feedback, please reach out to me at www.raffaelebini.com#6
