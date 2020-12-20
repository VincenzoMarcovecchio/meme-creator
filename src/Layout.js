import React from 'react';
import { Link } from 'react-router-dom';

export default function componentName({ children }) {
  return (
    <>
      <nav>
        <div className="navigation-container">
          <Link to="/">home</Link>
          <Link to="/memes">memes</Link>
          <Link to="/games">play games</Link>
        </div>
      </nav>
      <main>{children}</main>
      <footer>
        <center>
          <small>
            <a
              href="https://twitter.com/_vinny_92"
              rel="noopener noreferrer"
              target="_blank"
            >
              {' '}
              This website is opensource
            </a>
          </small>
        </center>
      </footer>
    </>
  );
}
