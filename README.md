# [Task management](https://mykola-hadupiak.github.io/Task_management/)
This is an implementation for an application where you can create your own board and add your cards (tasks) on it.

The database and server are hosted at https://render.com/, and the server itself is implemented here https://github.com/Mykola-Hadupiak/Task_management_server.

# The main technologies that were used:
* React (tsx), Redux toolkit (inc. thunk), React DnD, React Router
* Hooks (useMemo, useState, useRef, useEffect, useNavigate, etc), custom hooks
* TypeScript, fetch
* SCSS, classNames utility, BEM

# Instructions and functionality in a nutshell

1. The first time you open the application, you will see a search where you can search for your board by ID or create a new board (if there are no boards yet).
2. When you click on the "create new board" button, you will be redirected to a page with columns, namely: **To do**, **In progress**, **Done**.
3. You can create, delete, edit or drag and drop your tasks into the appropriate columns.
4. You can also see the board and the beginning of your ID (5 first characters), next to which there is a "copy" button, by clicking on which you will copy the complete ID board and can then easily find it or save it.
