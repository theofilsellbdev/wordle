import { useRouter } from 'next/router';
import React from 'react'
import { IoMenu } from 'react-icons/io5';

function about() {
  const router = useRouter();
  const pushRoute = href => {router.push(href)}

  return (
    // <html>
    <div>
        {/* <head>
            <title>About</title>
            <link rel="stylesheet" href="styles.css">
        </head> */}
        {/* <body> */}
        <div className="body">
            <div className="Navbar">
                <a onClick={() => pushRoute('/menu')}><IoMenu /></a>
                <h1>Wordle 2.0</h1>
                <a onClick={() => pushRoute('/about')}><div>About</div></a>
            </div>
            <h1>About Wordle 2.0</h1>
            <h3>This page is really just to use up the tags in the rubric</h3>
            <ul>
                <li>This list</li>
                <li>Is completely</li>
                <li>Useless and</li>
                <li>Just here to</li>
                <li>Use the LI & OL tags</li>
            </ul>
            <img width="200px" src='OIP.jpg'></img>
            <form>
                <input type="text" placeholder="This form does nothing!!!" />
                <input type="submit" />
            </form>
        </div>
        {/* <script> function doSomethingForTheSakeOfHavingJavascriptInAScriptTag() {alert("This is ")} </script> */}
    </div>
    // </body>
    // </html>
  )
}

export default about