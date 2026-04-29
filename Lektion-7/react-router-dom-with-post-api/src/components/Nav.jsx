import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
    return (
        <nav className="main-nav">
            <ul>
                {/* a-taggs makes the page reload. */}
                {/* <li><a href="/">Home</a></li>
                <li><a href="/posts">Posts</a></li> */}

                {/* Use Links to navigate smoother, without reloading the page */}
                <Link to="/"><li>Home</li></Link>
                <Link to="/posts"><li>Posts</li></Link>
                <Link to="/contact"><li>Contact</li></Link>
            </ul>
        </nav>
    )
}

export default Nav
