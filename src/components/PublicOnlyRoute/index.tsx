import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoadingUser, selectIsUserLoggedIn } from "../../store/slices/userSlices";
import Loading from "../Loading";

type Props = {
  children: React.ReactElement
}

export default function PublicOnlyRoute ({ children }: Props) {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn)
  const isLoadingUser = useSelector(selectIsLoadingUser)
  if (isLoadingUser) {
    return <Loading />
  }
  if (isUserLoggedIn) {
    return <Navigate to='/novo-pedido' />
  }
  return children
}