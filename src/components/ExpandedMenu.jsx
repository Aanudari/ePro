import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';

function ExpandedMenu() {
    const { expandedMenu, setExpandedMenu } = useStateContext();
    return (
        <div className={`w-5/12 h-full fixed transition duration-300 glass2 ${expandedMenu ? `case-1` : `case-2`}`}>
            <div className='h-14'>
            </div>
            <div className='flex p-10 justify-between'>
                {/* <button onClick={() => {
                    setExpandedMenu(!expandedMenu)
                }} className='p-2'>X</button>
                <span>1</span> */}
            </div>
        </div>
    );
}

export default ExpandedMenu;