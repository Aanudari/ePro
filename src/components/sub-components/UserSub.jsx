import React from 'react';

function UserSub(props) {
    return (
        <div className='p-1 bg-blue-100 rounded cursor-pointer'>{props.data.firstName}</div>
    );
}

export default UserSub;