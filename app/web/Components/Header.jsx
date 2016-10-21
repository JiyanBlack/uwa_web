import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <nav className="teal lighten-1 z-depth-1">
        <div className="nav-wrapper container ">
          <a href="#!" className="brand-logo left"><i className="material-icons">cloud</i>Alchemy UWA</a>
          <ul className="right">
            <li>
              <a href="/uwa/" rel="noopener noreferrer" target='_blank'>
                <i className="material-icons left">library_add</i>Add Analysis</a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="http://www.ibm.com/watson/developercloud/doc/alchemylanguage/" target='_blank'>
                <i className="material-icons left">view_module</i>Docs</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}