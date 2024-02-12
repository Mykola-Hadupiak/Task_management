# [Task management](https://mykola-hadupiak.github.io/Task_management/)
This is an implementation for an application where you can create your own board and add your cards (tasks) on it.

The database is hosted at https://render.com/, and the server itself is implemented here https://github.com/Mykola-Hadupiak/Task_management_server.

Before you start using it, you need to download the server repository and run it by writing the command (npm start), you also need the file .env to access the database.

Also, you need to paste your server IP into the file ./src/helpers/fetchMain.ts (if you are using a local server)

# The main technologies that were used:
* React (tsx), Redux toolkit (inc. thunk), React DnD
* Hooks (useMemo, useState, useRef, useEffect, etc), custom hooks
* Typescript, fetch
* SCSS, classNames utility, BEM

# Instructions and functionality in a nutshell

To run, write **npm start**

1. The first time you open the application, you will see a search where you can search for your board by ID or create a new board (if there are no boards yet).
2. When you click on the "create new board" button, you will be redirected to a page with columns, namely: **To do**, **In progress**, **Done**.
3. You can create, delete, edit or drag and drop your tasks into the appropriate columns.
4. You can also see the board and the beginning of your ID (5 first characters), next to which there is a "copy" button, by clicking on which you will copy the complete ID board and can then easily find it or save it.
