import React from 'react'
import { Link } from 'react-router-dom'
import AuthOptions from '../auth/AuthOptions'

export default function Header() {
    return (
        <div>
            <Link to="/">
                <h1>Home page</h1>
            </Link>
            <AuthOptions />
        </div>
    )
}
