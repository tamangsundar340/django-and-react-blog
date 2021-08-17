import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import Layout from './hocs/Layout'
import MainComponent from './Component/MainComponent';
import Blog from './Pages/Blog';
import BlogDetail from './Pages/BlogDetail';
import Youtube from './Pages/Youtube';
import Contact from './Pages/Contact';
import Category from './Pages/Category';
import VideoList from './Pages/VideoList'
import SingleVideo from './Component/SingleVideo'

ReactDOM.render(
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={MainComponent} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/blog/:id" component={BlogDetail} />
        <Route exact path="/category/:id" component={Category} />
        <Route exact path="/youtube" component={Youtube} />
        <Route exact path="/videolist/:id" component={VideoList} />
        <Route exact path="/video/:id" component={SingleVideo} />
        <Route exact path="/contact" component={Contact} />
      </Switch>
    </Layout>
  </Router>,
  document.getElementById('root')
);
