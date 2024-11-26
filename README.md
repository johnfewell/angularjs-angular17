# AngularJS and Angular 17 Coexistence Demo

This repository demonstrates the coexistence of AngularJS and Angular 17 within a single application. It showcases how a modern Angular application can be embedded within an existing AngularJS application, allowing for seamless state synchronization between the two frameworks.

[The full description is on my blog.](https://johnfewell.com/blog/angularjs-angular17/)

[The demo app is here](https://johnfewell.github.io/angularjs-angular17/#!/)

## Overview

The demo is based on the ToDo MVC project, which is designed to showcase various front-end frameworks. In this specific implementation, an Angular 17 custom element is embedded within an AngularJS application, both running the same ToDo MVC application.

## Features

- Seamless integration of Angular 17 within an AngularJS application
- State synchronization between AngularJS and Angular 17
- Demonstration of Angular Elements (custom elements) usage
- Modified build process to facilitate integration

## Getting Started

To run the demo locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/johnfewell/angularjs-angular17.git
```

2. Navigate to the project directory:

```
cd angularjs-angular17
```

3. Install the dependencies:

```
npm install
```

4. Start the development server:

```
npm run start
```

5. Open your browser and visit `http://localhost:4200` to see the demo in action.

## Project Structure

- `src/`: Contains the source code for the Angular 17 application
- `angularjs/`: Contains the AngularJS application code
  - `angularjs/bundles/`: Output directory for the compiled Angular 17 bundles
- `angular.json`: Angular configuration file
- `package.json`: Node.js package configuration file

## How It Works

The Angular 17 application is compiled as a custom element (Angular Element) and embedded within the AngularJS application. The build process is modified to generate consistently named bundles without hashing, facilitating the inclusion of the Angular 17 bundles in the AngularJS application.

State synchronization between AngularJS and Angular 17 is achieved through a directive that binds the input and output data from the Angular custom element to AngularJS. This ensures that any changes made in one framework are reflected in the other.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [AngularJS](https://angularjs.org/)
- [Angular](https://angular.io/)
- [ToDo MVC](https://todomvc.com/)
