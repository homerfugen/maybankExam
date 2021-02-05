import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './pages/main';

const App: React.FC = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={MainPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
