import React, { useState, useEffect } from "react";
const initialContext = {
    user: localStorage.getItem("user")
};
const UserContext = React.createContext(initialContext);
export default UserContext;