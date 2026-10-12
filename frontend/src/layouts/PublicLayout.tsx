import { Outlet } from "react-router-dom"
import Footer from "../parts/Footer"


export default function PublicLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}
