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

---

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

---

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

---

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

---

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

---

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

---

## Create a UserItem component

1. Make a new folder in the "components" folder called "users". Make a new file named "UserItem.js".

2. Inside "UserItem.js", type out a class component.

```
import React, { Component } from 'react'

class UserItem extends Component {
    render() {
        return (
            <div>
                User Item
            </div>
        )
    }
}

export default UserItem
```

3. Add `import UserItem from "./components/users/UserItem";` to the imports section of "App.js".

4. Add `<UserItem />` in the `return()` section below.

```
import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import UserItem from "./components/users/UserItem";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <UserItem />
      </div>
    );
  }
}

export default App;
```

---

## Add State to Component

1. In "UserItem.js", add a `state` object for our first user item. (You can also use a constructor. Inside the constructor, include `super();`, otherwise you will get an error.Then dd a `this.state` object.)

```
class UserItem extends Component {
  state = {
    id: 'id',
    login: 'mojombo',
    avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/mojombo'
  };
```

2. Now you can use this state in the rendered component. Add some styles to the component `<div>` and put an `<img>` inside it.

3. Also, add the username as an `<h3>`and a link to the profile below the `<img>` inside another `<div>`.

```
render() {
  return (
    <div className='card text-center'>
      <img
        src={this.state.avatar_url}
        alt='avatar url'
        className='round-img'
        style={{ width: "60px" }}
      />
      <h3>{this.state.login}</h3>
      <div>
        <a href={this.state.html_url} className='btn btn-dark btn-sm my-1'>
          More
        </a>
      </div>
    </div>
  );
}

```

4. You can destructure your state object to make your code a little cleaner and less verbose. Destructure you state object right below the `render()`. Now you can include object keys without having to right `{this.state}` every time.

```
render() {
  const { login, avatar_url, html_url } = this.state;

  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt='avatar url'
        className='round-img'
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <a href={html_url} className='btn btn-dark btn-sm my-1'>
          More
        </a>
      </div>
    </div>
  );
}
```

---

## Create a Users list component

1. Create a file in the "users" folder named "Users.js". Import it into "App.js". Remove the `import UserItem from "./components/users/UserItem"`. Replace `<UserItem />` with `<Users/>`.

2. In "Users.js", create a new component structure.

3. Hard code in a temporary state object with an array of three users that we will use for now.

4. Inside the parent `<div>`, `map()` over the array of users that you made by using `{this.state.users.map(user => ( <div key=user.id>{user.login}</div> ))}`. _Make sure you give each list item a unique key, otherwise you will get an error._ Here it is all typed out.

```
import React, { Component } from "react";

export class Users extends Component {
  state = {
    users: [
      {
        id: "1",
        login: "mojombo",
        avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
        html_url: "https://github.com/mojombo"
      },
      {
        id: "2",
        login: "defunkt",
        avatar_url: "https://avatars0.githubusercontent.com/u/2?v=4",
        html_url: "https://github.com/defunkt"
      },
      {
        id: "3",
        login: "pjhyett",
        avatar_url: "https://avatars0.githubusercontent.com/u/3?v=4",
        html_url: "https://github.com/pjhyett"
      }
    ]
  };

  render() {
    return (
      <div>
        {this.state.users.map(user => (
          <div key={user.id}>{user.login}</div>
        ))}
      </div>
    );
  }
}

export default Users;
```

_We are now seeing a list of the name of each user in our browser. Let's now take this state and pass it down to our `<UserItem />` so we can use it._

5. Instead of a `<div>`, replace it with `<UserItem key={user.id} user={user} />`.

6. In "UserItem.js", delete the state that we hard-coded so that it doesn't override the state from "Users.js". In our destructured object exression, change `this.state` to `this.props.user`, since we are receiving props from "Users.js".

```
class UserItem extends Component {
  render() {
    const { login, avatar_url, html_url } = this.props.user;

    return (
      <div className='card text-center'>
        <img
          src={avatar_url}
          alt='avatar url'
          className='round-img'
          style={{ width: "60px" }}
        />
        <h3>{login}</h3>
        <div>
          <a href={html_url} className='btn btn-dark btn-sm my-1'>
            More
          </a>
        </div>
      </div>
    );
  }
}
```

_Some quick component styling._

7. In "Users.js", add `style={userStyle}` to the parent `<div>`.

8. Below the `class Users` we can add a variable with an object that contains styles for our users container.

```
const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem1'
}
```

9. Finally, "App.js" make a new container `<div>` and put `<Users />` inside of it.

---

## Convert a Class Component to Functional Component

Functional components are used when the component has no state or data to manipulate. It needs less code and is cleaner. React Hooks can be used with functional components also, and is the modern way of writting components in React, but that will be explored further on in this document.

1. In "UserItem.js", delete `class UserItem extends Component` and replace it with an arrow function `const UserItem = () => {}`.

2. Delete the `render() {}`.

3. Delete `{ Comopnent }` from the React import statement, also.

4. You no longer need to use `this.` since it is no longer a class. However, props will now need to be passed in as an argument in the function, `const UserItem = (props) => {}`

5. In "Navbar.js", delete the class, make it functional expression, and pass in the props. `const Navbar = (props) => {}`.

6. Cut out our `defaultProps` and `propTypes`. Paste them below the function you just made. Replace the `static` keyword since they are no longer in a class with `Navbar.`

7. Delete `{ Component }` in the imports at the top. Delete `this.` from your props.

```
import React from "react";
import PropTypes from "prop-types";

const Navbar = props => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={props.icon} /> {props.title}
      </h1>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
```

8. Let's clean up the code even more. In "UserItem.js", cut out `const { login, avatar_url, html_url } = props.user;` and destructure it in the argument of the function.

```
const UserItem = ({ user: { login, avatar_url, html_url } }) => {}
```

9. You can do the same in "Navbar.js". `{props.icon}` and `{props.title}` can be destructured to become `({ icon, title })` as arguments in the function.

10. Go ahead an add a propType for the `user` "UserItem.js".

```
UserItem.propTypes = {
  user: PropTypes.object.isRequired
};
```
