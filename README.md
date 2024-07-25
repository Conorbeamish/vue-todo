# Todo List App

A Todo List application built with **Vue 3**, **Pinia** for state management, and **Tailwind CSS** for styling. This app allows users to add, edit, delete, and filter todos.

## Technologies Used

- **[Vue 3](https://v3.vuejs.org/)**: A progressive JavaScript framework for building user interfaces.
- **[Pinia](https://pinia.vuejs.org/)**: A store library for Vue.js that provides a simple and powerful API for state management.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for creating custom designs without leaving your HTML.

## Setup

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

This app uses [dummy json API](https://dummyjson.com/docs/todos)

### Installation

Clone into repo
```
git clone https://github.com/Conorbeamish/vue-todo.git
cd vue-todo
```
Install
```
npm install
```

Start development
```
npm run dev
```

### Testing

Testing is done using vitest, simply run the command
```
npm run test:unit
```
Please note due to the dummy api not saving data to the server not all API calls can be tested properly

Test can be found in the __tests__ folder for both components and stores

### File Structure

src/
├── assets/               # Static assets like images
├── components/           # Vue components
│   ├── AddTodo.vue       # Component to add a new todo
│   ├── Banner.vue       # Component to add a new todo
│   ├── TodoItem.vue      # Component to display a single todo item
│   ├── TodoItemDisplay.vue # Component to display todo details (non-editable)
│   ├── TodoItemEdit.vue  # Component to edit a todo item
│   ├── TodoList.vue      # lists todos and handles logic for updating store
├── stores/               # Pinia store modules
│   └── todo.js           # Todo store module, **API calls are handled from here**
├── App.vue               # Root Vue component
├── main.js               # Main entry point of the application






