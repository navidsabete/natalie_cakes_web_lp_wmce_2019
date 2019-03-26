import React, { Component } from 'react';
import logo from './Logo.png';
import loupe from './loupe.jpg';
import plus from './plus.png';
import './App.css';

class App extends Component {
  render() {
    return (

        <div className="App">
          <header className="App-header">
            <div>
              <img src={logo} className="App-logo" alt="logo"/>
            </div>
          </header>
          <Tableau/>
          </div>

    );
  }
}

class Tableau extends Component{
  render() {
    return(
        <div>
          <div>
              <input id="search" type="text" placeholder="Search.." name="search"/>

          </div>
          <div className="pos">
          <table className="Table">
            <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Difficulté</th>
              <th>Nb. pers.</th>
              <th></th>
              <th><button ><img src={plus}/></button></th>
            </tr>
            </thead>
            <tfoot>
            <tr>
              <td colspan="6">
                <div class="links"><a href="#">&laquo;</a> <a class="active" href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div>
              </td>
            </tr>
            </tfoot>
            <Recette/>
          </table>
          </div>
        </div>
    );
  }
}

class Recette extends Component{
render() {
  return(
      <tbody>
      <tr>
        <td> </td><td> </td><td> </td><td> </td><td><a href="#">Modifier</a></td><td><a href="#">Supprimer</a></td>
      </tr>
      </tbody>
  );
}
}

export default App;