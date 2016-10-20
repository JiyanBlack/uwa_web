import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <nav className="teal lighten-1 z-depth-1">
        <div className="nav-wrapper container ">
          <a href="#!" className="brand-logo left"><i className="material-icons">cloud</i>Alchemy UWA</a>
          <ul className="right">
            <li>
              <a href="sass.html">
                <i className="material-icons left">search</i>Anaylze URL</a>
            </li>
            <li>
              <a href="badges.html">
                <i className="material-icons left">view_module</i>Text</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}