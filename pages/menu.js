import Link from 'next/link'
import React from 'react'

function menu() {

  return (
    <div className="body">
    <h2>Menu</h2>
        <ul>
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/about'>About</Link></li>
        </ul>
    </div>
  )
}

export default menu