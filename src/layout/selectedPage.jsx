import React from "react";
import UserProvider from "../hooks/useUsers";

const SelectedPage = () => {
    return (
        <>
            <UserProvider>
                <h1>SelectedPage</h1>
            </UserProvider>
        </>
    );
};

export default SelectedPage;
