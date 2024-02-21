import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoute = () => {
  const { userInfo } = useSelector((state)=>state.auth) //first we get the userInfo from the state
  return (
    userInfo? <Outlet/> : <Navigate to='/login' replace />
  )
}

export default PrivateRoute