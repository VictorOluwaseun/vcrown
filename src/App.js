import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {
  auth,
  createUserProfileDocument
} from "./firebase/firebase.utils";

import "./App.css";

// const Fruits = () => <h1>Fruits</h1>;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //know more about this. It is an open subcription, there is need to unsubcribe
      //  this.setState({ currentUser: user });
      //  await
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            },
            () => console.log(this.state)
          );
        });
      } else {
        this.setState({
          currentUser: userAuth
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return ( <
      div >
      <
      Header currentUser = {
        this.state.currentUser
      }
      /> <
      Switch >
      <
      Route exact path = "/"
      component = {
        HomePage
      }
      /> <
      Route path = "/shop"
      component = {
        ShopPage
      }
      /> <
      Route path = "/signin"
      component = {
        SignInAndSignUpPage
      }
      /> < /
      Switch > <
      /div>
    );
  }
}

export default App;

// import React from "react";
// import { Route, Link } from "react-router-dom";

// import "./App.css";

// const HomePage = props => {
//   console.log(props);
//   return (
//     <div>
//       <h1>HOME PAGE</h1>
//     </div>
//   );
// };

// const TopicsList = props => {
//   console.log(props);

//   return (
//     <div>
//       <h1>TOPIC LIST PAGE</h1>
//       <Link to={`${props.match.url}/13`}>TO TOPIC 13</Link>
//       <Link to={`${props.match.url}/17`}>TO TOPIC 17</Link>
//       <Link to={`${props.match.url}/21`}>TO TOPIC 21</Link>
//     </div>
//   );
// };

// const TopicDetail = props => {
//   console.log(props);

//   return (
//     <div>
//       <h1>TOPIC DETAIL PAGE: {props.match.params.topicId}</h1>
//     </div>
//   );
// };

// function App() {
//   return (
//     <div>
//       <Route exact path="/" component={HomePage} />
//       <Route exact path="/topicslist" component={TopicsList} />
//       <Route exact path="/blog/asdqw/topics" component={TopicsList} />
//       <Route path="/blog/asdqw/topics/:topicId" component={TopicDetail} />
//       <Route exact path="/blog/topics" component={TopicsList} />
//       <Route path="/blog/topics/:topicId" component={TopicDetail} />
//     </div>
//   );
// }

// export default App;