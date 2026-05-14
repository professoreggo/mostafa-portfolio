import { useState, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

const INITIAL_FORM = { name: '', email: '', message: '' }

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function validate(fields) {
  if (!fields.name.trim())    return 'Name is required.'
  if (!fields.email.trim())   return 'Email is required.'
  if (!/\S+@\S+\.\S+/.test(fields.email)) return 'Enter a valid email.'
  if (!fields.message.trim()) return 'Message is required.'
  return null
}

function Contact({ email }) {
  const [form,   setForm]   = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle')
  const [error,  setError]  = useState(null)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    const validationError = validate(form)
    if (validationError) {
      setError(validationError)
      return
    }

    setStatus('loading')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          email:      form.email,
        },
        PUBLIC_KEY
      )
      setStatus('success')
      setForm(INITIAL_FORM)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }, [form])

  return (
    // JSX stays exactly the same as before
    <section className="contact" id="contact">
      <div className="contact__container">

        <h2 className="section__title">Contact</h2>
        <p className="contact__subtitle">
          Have a project in mind or just want to say hi? My inbox is open.
        </p>

        <div className="contact__wrapper">

          <div className="contact__info">
            <p className="contact__info-label">Reach me directly</p>
            <a href={`mailto:${email}`} className="contact__email">
              {email}
            </a>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>

            <div className="form__group">
              <label htmlFor="name" className="form__label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form__input"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form__group">
              <label htmlFor="email" className="form__label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form__input"
                placeholder="Your Email address"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form__group">
              <label htmlFor="message" className="form__label">Message</label>
              <textarea
                id="message"
                name="message"
                className="form__input form__textarea"
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="form__error">{error}</p>
            )}

            {status === 'success' && (
              <p className="form__success">Message sent! I'll get back to you soon.</p>
            )}

            <button
              type="submit"
              className="btn btn--primary form__btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

          </form>

        </div>
      </div>
    </section>
  )
}

export default Contact