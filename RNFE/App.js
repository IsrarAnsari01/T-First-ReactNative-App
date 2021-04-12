/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import Home from './screen/Home'
import Books from './screen/Books'
import { Root } from 'native-base'
import { NativeRouter, Route } from 'react-router-native'
import BookForm from './components/books/BookForm'
import FullBook from './components/books/FullBook'
import TotalReders from './components/readers/TotalReders'
import NewUser from './components/readers/newUser'
import CompleteUserInfo from './components/readers/CompleteUserInfo'
const App: () => React$Node = () => {
  return (
    <Root>
      <NativeRouter>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/books'>
          <Books />
        </Route>
        <Route path="/newBook">
          <BookForm />
        </Route>
        <Route path='/fullBook/:id'>
          <FullBook />
        </Route>
        <Route path='/totalUser'>
          <TotalReders />
        </Route>
        <Route path='/addnewUser'>
          <NewUser />
        </Route>
        <Route path='/fullUserInfo/:id'>
          <CompleteUserInfo />
        </Route>
      </NativeRouter>
    </Root>
  );
};


export default App;
