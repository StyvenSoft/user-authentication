import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';

export default function Home() {
    const { userData } = useContext(UserContext);

    return (
        <div>
            {userData.user ? (
                <h2>Welcome {userData.user.displayName}</h2>
            ) : (
                    <div>
                        <h3>You are not logged in</h3>
                    </div>
                )}
        </div>
    )
}
