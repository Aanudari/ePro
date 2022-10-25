import React, { useState } from 'react';
import { useStateContext } from '../../../contexts/ContextProvider';
import UINavigation from '../../../components/UINavigation';
import UserLayout from '../../../layout/UserLayout';

function LevelOneUI() {
    const { showModal, setShowModal } = useStateContext();
    const [showComment, setshowComment] = useState(false);
    const d = new Date();
    return (
        <UserLayout></UserLayout>
    );
}

export default LevelOneUI;
