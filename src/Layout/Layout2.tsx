import React, { FC, ReactNode } from "react"
import Footer from "../components/Footer/Footer"
import Nav from "../components/NavBar/Nav"
import NewsLetter from "../components/NewsLetter/NewsLetter"

type layoutProps = {
  children: ReactNode
}

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
