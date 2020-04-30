import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

import "./App.css";
import checkoutPage from "./pages/checkout/checkout.component";

// const Fruits = () => <h1>Fruits</h1>;

//  constructor() {
//   super();
//   this.state = {
//    currentUser: null,
//   };
//  }

class App extends React.Component {
 unsubscribeFromAuth = null;

 componentDidMount() {
  const { setCurrentUser } = this.props;
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
   //know more about this. It is an open subcription, there is need to unsubcribe
   //  this.setState({ currentUser: user });
   //  await
   if (userAuth) {
    const userRef = await createUserProfileDocument(userAuth);

    userRef.onSnapshot((snapShot) => {
     //  this.setState(
     //  this.props.setCurrentUser(
     setCurrentUser(
      {
       id: snapShot.id,
       ...snapShot.data(),
      },
      () => console.log(this.state)
     );
    });
   } else {
    setCurrentUser(userAuth);
   }
  });
 }

 componentWillUnmount() {
  this.unsubscribeFromAuth();
 }

 render() {
  return (
   <div>
    {/* <Header currentUser={this.state.currentUser} /> */}
    <Header />
    <Switch>
     <Route exact path="/" component={HomePage} />
     <Route path="/shop" component={ShopPage} />
     <Route exact path="/checkout" component={checkoutPage} />
     <Route
      exact
      path="/signin"
      render={() =>
       this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
      }
     />
    </Switch>
   </div>
  );
 }
}

// const mapStateToProps = ({ user }) => ({
//  currentUser: user.currentUser,
// });

const mapStateToProps = createStructuredSelector({
 currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
 setCurrentUser: (user) => dispatch(setCurrentUser(user)), //What dispatch is, it is a way to know that reducer whenever u r passing me, it's gonna be action object I'm gonna pass to the reducer
});

export default connect(mapStateToProps, mapDispatchToProps)(App); //null is passed because app.js doesn't need currentUser

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
