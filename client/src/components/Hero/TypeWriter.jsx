import { useState, useEffect } from 'react'
import './Typewriter.css'

function Typewriter({ words, typingSpeed = 150, deletingSpeed = 75, pauseDuration = 2000 }) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    let timeout

    if (!isDeleting) {
      // Still typing
      if (displayed.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length + 1))
        }, typingSpeed)
      } else {
        // Finished typing — pause then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      }
    } else {
      // Still deleting
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length - 1))
        }, deletingSpeed)
      } else {
        // Finished deleting — move to next word
        setIsDeleting(false)
        setWordIndex(prev => (prev + 1) % words.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <p className="typewriter">
      I work with&nbsp;
      <span className="typewriter__word">{displayed}</span>
      <span className="typewriter__cursor" />
    </p>
  )
}

export default Typewriter