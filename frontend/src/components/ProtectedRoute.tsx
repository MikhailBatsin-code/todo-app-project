import React from "react";
import { Navigate } from "react-router-dom";
import { checkUser } from "../utils/checkUser";

interface ProtectedRouteProps {
    children: React.ReactNode
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    if(!checkUser()) {
        return <Navigate to="/auth/sign-up" replace/>
    }

    return <>{ children }</>
}