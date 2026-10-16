import { Outlet } from "react-router-dom"
import Footer from "../parts/Footer"

import styles from "./BaseLayout.module.css"

export default function BaseLayout() {
  return (
    <>
      <div className={styles.content}>
        <Outlet />
      </div>

      <Footer />
    </>
  )
}
