import { Outlet } from 'react-router-dom'
import chefHippo from '../assets/chefhippo.png'

function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__content">
          <div>
            <p className="eyebrow">Vegetarian Recipe Finder</p>
            <h1>Chef Hippo</h1>
          </div>
          <p className="intro-copy">The best partner for every vegetarian kitchen</p>
        </div>

        <div className="site-header__media">
          <img src={chefHippo} alt="Chef Hippo, the mascotte" />
        </div>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
