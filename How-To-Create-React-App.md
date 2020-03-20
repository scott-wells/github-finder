# How to Create a React App

1. Create folder for you project.

2. In Git, run "npx create-react-app ."

3. In the project directory, run "yarn start" or "npm start"

   - other useful commands
     - "yarn build" or "npm run build" - builds static assets for deployment
     - "yarn test" - for running tests on your code ???

4. Clean up your project file structure.
   - Delete "App.test.js", "index.css", and "logo.svg"
   - Delete "serviceWorker.js" if you are not working with PWAs ???
   - In "index.js", delete the import statements for each file you deleted. Also, we do not need the comments and line about serviceWorker
   - In "App.js", delete the import statement for the logo. Also, delete everything inside the main div ('App'). Replace it with some generic text.
   - Delete the styles inside "App.css". Replace it with your own styles.

_This next section is coding vanilla, or old school React - before Hooks, Redux, etc._

## Class Based Components

In "App.js", change the function to a class:

```
 import React, { Component } from "react";
 import "./App.css";

 class App extends Component{
     render() {
         return (
         <div className='App'>
             <h1>Hello from React</h1>
         </div>
         );
     }
 }

 export default App;
```

## Expressions in JSX

You can easily reuse static variables in our class-based component. In the `render(){}` function, create your variable. In the `return()`, add `{}` with your variable name inside. Now, the `<h1>` will display our variable name.

```
class App extends Component {
  render() {
    const name = "John Doe";

    return (
      <div className='App'>
        <h1>Hello {name}</h1>
      </div>
    );
  }
}
```

You can also add any javascript method inside the `{}`, or chain onto your variable. Here, we add `.toUpperCase` to the variable to make the text all uppercase.

```
class App extends Component {
  render() {
    const name = "John Doe";

    return (
      <div className='App'>
        <h1>Hello {name.toUpperCase()}</h1>
      </div>
    );
  }
}
```

You can add any sort of class method or if statements to your class-based component, as well. In this example, we use an expression with ternary operators to create a condition to either load some text or display the variable.

```
class App extends Component {
  render() {
    const name = "John Doe";
    const loading = false; //boolean value is hard coded in this example

    return (
      <div className='App'>
        {loading ? <h4>Loading...</h4> : <h1>Hello {name}</h1>}
      </div>
    );
  }
}
```

## Create a Navbar

1. In the "src" folder, make another folder name "components". Inside "components", create a folder name "layout". Inside that folder, create a file named "Navbar.js".

2. Add your import statements, class component, and export statement.

```
import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <nav className='navbar bg-primary'>
        <h1>Navbar</h1>
      </nav>
    );
  }
}

export default Navbar;
```

3. Import the file at the top of "App.js" Insert it into the `return()`.

```
import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
      </div>
    );
  }
}

export default App;
```

4. _(partial step)_ Add a fontawesome.com CDN link to "index.html" in the "public" folder. Add `<i className='fab fa-github' />` inside the `<h1>` of "Navbar.js".

## Create Your First Prop (Property)

Props are attributes, data(state) or properties that can be passed from one component to another in the React DOM tree. This is one of the real powers of React.

1. Add `title="Github Finder"` to the `<Navbar />` component in "App.js".

```
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar title='Github Finder' />
      </div>
    );
  }
}
```

2. Now pass this prop down to the `<Navbar />` component by replacing "Navbar" in the `<h1>` with `{this.props.title}` in "Navbar.js".

```
export class Navbar extends Component {
  render() {
    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className='fab fa-github' /> {this.props.title}
        </h1>
      </nav>
    );
  }
}
```

3. Repeat these steps for the Github icon.

4. You can also add `defaultProps` to set the default or inital state of a component. In "Navbar.js", above `render()`, add your default props.

```
export class Navbar extends Component {
  static defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github"
  };

  render() {
    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className={this.props.icon} /> {this.props.title}
        </h1>
      </nav>
    );
  }
}
```

- This will make sure that even if no props are passed in to the component, the component will still display some sort of information.

## Proptypes (Type Checking Your Code)

Type checking your code to make sure you are inputting the correct type of variables can be very important. An improper variable type can cause frustrating errors in your application that are difficult to find. React allows us to check our variable types with "Proptypes".

1. Import "Proptypes" at the top of "Navbar.js". `import PropTypes from 'prop-types';`

2. Add a `propTypes` object that includes a proptype for each prop.

```
export class Navbar extends Component {
  static defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github"
  };

  static propTypes = {
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
  }

  render() {
    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className={this.props.icon} /> {this.props.title}
        </h1>
      </nav>
    );
  }
}
```

- Now, if you pass a prop that doesn't match the correct type required for your component, React with show an error in the console.
