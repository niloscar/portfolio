import { Outlet } from "react-router-dom"
import Footer from "../parts/Footer"

export default function BaseLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}
