import React from "react";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css';


const Footer = () => {
  return ( <footer className="page-footer">
  <div className="container">
    <div className="row">
      <div className="col l6 s12">
        <h5 className="white-text">Footer Content</h5>
        <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
      </div>
      <div className="col l4 offset-l2 s12">
        <h5 className="white-text">Links</h5>
      </div>
    </div>
  </div>
  <div className="footer-copyright">
    <div className="container">
    © 2019 Copyright
    <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
    </div>
  </div>
</footer> );
}
 
export default Footer;