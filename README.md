##Create React App from scratch

1. this project use npm for package manager.
2. the goal of this project is to built a Sales Order Record web application using react.js with class component and functional component
3. as this is my first time creating react app without using CRA(create react app), i will create a step by step tutorial
4. in this project, im using macbook pro, and vs code as tool.
5. we will start by creating a folder, named the folder. then right click at the folder, choose 'New terminal at folder'
6. from your terminal write a command 
    ```````````````
        code .
    ```````````````
7. it will start vs code, and you can see an empty folder. open a terminal in vs code, write a command
    ```````````````````
        npm init -y
    ```````````````````
8. you will have to install npm for package manager.
9. on the same terminal, you need to install react, write the following command
    ```````````````````````````````````
        npm install react react-dom
    ```````````````````````````````````
10. next, you will need babel for js and jsx 
11. and webpack to build the project 
write ther command below into your terminal
    ```````````````````````````````````````````````````````````````````
        npm install --save-dev @babel/preset-env react-hot-loader webpack webpack-cli webpack-dev-server @babel/core @babel/preset-react babel-loader
    ```````````````````````````````````````````````````````````````````
12. now you have completed the basic need for a react app. Feel free to continue with your creativity