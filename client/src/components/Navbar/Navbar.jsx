import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About',       href: '#about'       },
  { label: 'Skills',      href: '#skills'       },
  { label: 'Experience',  href: '#experience'   },
  { label: 'Projects',    href: '#projects'     },
  { label: 'Contact',     href: '#contact'      },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)

  // Close menu and add shadow when user scrolls
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)

      if (menuOpen) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup — remove the listener when Navbar unmounts
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      {/* Brand */}
      <a href="#hero" className="navbar__brand">
        Mostafa Tarek
      </a>

      {/* Desktop links */}
      <ul className="navbar__links">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger button — mobile only */}
      <button
        className="navbar__hamburger"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={`hamburger-icon ${menuOpen ? 'hamburger-icon--open' : ''}`} />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul className="navbar__mobile-menu">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}

    </nav>
  )
}

export default Navbar