
const LoginForm = React.createClass({
   submit(event) {
      event.preventDefault();
      $.post('/login', {
         password: this.state.password
      }, response => {
         this.props.setLoggedIn(response.loggedIn);
      });
   },
   passwordChanged(event) {
      this.setState({password: event.target.value});
   },
   render() {
      return (
         <form className="pure-form pure-form-stacked" onSubmit={this.submit}>
            <fieldset>
               <legend>Log in</legend>
               <input type="password" onChange={this.passwordChanged} placeholder="Password" />
               <button type="submit" className="pure-button pure-button-primary">Log in</button>
            </fieldset>
         </form>
      );
   }
});

const BaseView = React.createClass({
   getInitialState() {
      return {loggedIn: undefined};
   },
   componentDidMount() {
      $.get('/login', response => {
         this.setLoggedIn(response.loggedIn);
      });
   },
   setLoggedIn(loggedIn) {
      this.setState({loggedIn});
   },
   render() {
      if (this.state.loggedIn === undefined)
         return <p>Loading...</p>;

      if (this.state.loggedIn)
         return (<h1>loggedIn</h1>);

      return <LoginForm setLoggedIn={this.setLoggedIn.bind(this)} />;
   }
});

ReactDOM.render(
  <BaseView />,
  document.querySelector('.container')
);