import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { MemorialData } from '../types/memorial'
import toast, { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css'
import './MemorialForm.css'
import CandleButton from './CandleButton'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

const MemorialForm = () => {
  const [formData, setFormData] = useState<MemorialData>({
    name: '',
    birthDate: '',
    deathDate: '',
    bio: '',
    photo: null,
  })

  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [candleCount, setCandleCount] = useState(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData({ ...formData, photo: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Explicit Validation Check as requested
    if (!formData.name.trim() || !formData.birthDate || !formData.deathDate || !formData.bio.trim() || !formData.photo) {
      toast.error('Please fill out all required fields and upload a photo.', {
        position: 'top-center'
      })
      return
    }

    setIsSubmitted(true)
    toast.success('Memorial successfully created! 🕊️', {
      position: 'top-center',
      duration: 3000
    })
  }

  const handleLightCandle = () => {
    setCandleCount(prev => prev + 1)
    toast.success('A candle has been lit. 🕯️', {
      position: 'top-center',
      icon: '🕯️'
    })
  }

  const handleReset = () => {
    setFormData({
      name: '',
      birthDate: '',
      deathDate: '',
      bio: '',
      photo: null,
    })
    setPreview(null)
    setCandleCount(0)
    setIsSubmitted(false)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
  }

  if (isSubmitted) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center mt-5 w-100 mb-5 px-3">
        <Toaster />
        <div className="w-100" style={{ maxWidth: '448px' }}>
          <div className="card shadow-lg border-0 text-center d-flex flex-column align-items-center p-0 overflow-hidden" style={{ backgroundColor: '#ffffff', borderRadius: '1rem' }}>

            {/* Photo Header */}
            <div className="position-relative w-100 d-flex align-items-center justify-content-center bg-light" style={{ height: '16rem' }}>
              {preview ? (
                <img src={preview} alt="Memorial" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-secondary opacity-50"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              )}
              <div className="position-absolute bottom-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(255,255,255,1), transparent)' }}></div>
            </div>

            <div className="position-relative px-4 pb-4 w-100 text-center" style={{ marginTop: '-3rem', zIndex: 10 }}>
              <h1 className="fw-bold m-0" style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#1f2937', letterSpacing: '-0.02em' }}>
                {formData.name}
              </h1>

              {(formData.birthDate || formData.deathDate) && (
                <p className="fw-bold mt-2 mb-0 text-muted text-uppercase" style={{ letterSpacing: '0.1em', fontSize: '0.85rem' }}>
                  {formatDate(formData.birthDate) || "—"} {" · "} {formatDate(formData.deathDate) || "—"}
                </p>
              )}

              {formData.bio && (
                <div className="mt-4 text-center w-100">
                  <p className="fs-5 text-secondary" style={{ fontStyle: 'italic', lineHeight: '1.6' }}>"{formData.bio}"</p>
                </div>
              )}

              <div className="mt-5 pt-4 border-top w-100">
                <div className="d-flex justify-content-center flex-wrap align-items-center mb-3" style={{ gap: '8px', minHeight: '40px' }}>
                  {Array.from({ length: Math.min(candleCount, 7) }).map((_, i) => (
                    <span key={i} style={{ fontSize: '1.8rem', animationDelay: `${i * 200}ms` }} className="candle-pulse">🕯️</span>
                  ))}
                  {candleCount > 7 && (
                    <span className="text-muted ms-2" style={{ fontSize: '0.9rem', fontWeight: 600 }}>+{candleCount - 7}</span>
                  )}
                </div>

                <div className="d-flex justify-content-center w-100">
                  <button
                    onClick={handleLightCandle}
                    className="btn btn-lg d-inline-flex align-items-center justify-content-center px-4 py-2 border-0 w-100 transition-all"
                    style={{ backgroundColor: "#975a16", color: "#fff", borderRadius: "50px", fontSize: '1.1rem', fontWeight: 600, gap: '8px', maxWidth: '250px' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg> Light a Candle
                    {candleCount > 0 && (
                      <span className="badge ms-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: "50px", fontSize: '0.9rem', width: '24px', height: '24px', padding: 0 }}>
                        {candleCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-2 w-100">
                <button onClick={handleReset} className="btn btn-link text-decoration-none text-muted d-inline-flex align-items-center justify-content-center w-100 transition-all" style={{ fontSize: '0.9rem', gap: '6px' }} onMouseOver={(e) => e.currentTarget.style.color = '#1f2937'} onMouseOut={(e) => e.currentTarget.style.color = '#6c757d'}>
                  ← Create another memorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5 w-100 mb-5 px-3">
      <Toaster />
      <div className="text-center mb-4">
        <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>🕯️</span>
        <h1 className="fw-bold m-0" style={{ fontSize: '2.2rem', fontFamily: 'serif', color: '#1f2937' }}>Create a Memorial</h1>
        <p className="text-muted mt-2 mb-0" style={{ fontSize: '1rem' }}>Honor and remember a loved one</p>
      </div>

      <div className="w-100" style={{ maxWidth: '448px' }}>
        <div className="card shadow-lg border-0 px-4 py-4" style={{ backgroundColor: '#ffffff', borderRadius: '1rem' }}>

          <div className="text-center mb-4">
            <div className="d-flex flex-column align-items-center">
              <button
                type="button"
                onClick={() => document.getElementById('photo')?.click()}
                className="rounded-circle overflow-hidden d-flex flex-column align-items-center justify-content-center mb-2 bg-light"
                style={{
                  width: '112px',
                  height: '112px',
                  border: preview ? 'none' : '2px dashed #dee2e6',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  padding: 0
                }}
              >
                {preview ? (
                  <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="text-center d-flex flex-column align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span className="text-muted mt-1" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Photo</span>
                  </div>
                )}
              </button>
              <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} className="d-none" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4 text-start">
              <label htmlFor="name" className="form-label fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter their name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control px-3 py-2"
                style={{ borderRadius: '0.5rem', borderColor: '#e5e7eb', boxShadow: 'none' }}
              />
            </div>

            {/* Dates */}
            <div className="row mb-4">
              <div className="col-6 text-start">
                <label htmlFor="birthDate" className="form-label fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
                  Date of Birth <span className="text-danger">*</span>
                </label>
                <DatePicker
                  id="birthDate"
                  selected={formData.birthDate ? new Date(formData.birthDate) : null}
                  onChange={(date: Date | null) =>
                    setFormData({ ...formData, birthDate: date ? date.toISOString().split('T')[0] : '' })
                  }
                  className="form-control px-3 py-2 w-100"
                  placeholderText="Select date"
                  maxDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  required
                />
              </div>

              <div className="col-6 text-start">
                <label htmlFor="deathDate" className="form-label fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
                  Date of Passing <span className="text-danger">*</span>
                </label>
                <DatePicker
                  id="deathDate"
                  selected={formData.deathDate ? new Date(formData.deathDate) : null}
                  onChange={(date: Date | null) =>
                    setFormData({ ...formData, deathDate: date ? date.toISOString().split('T')[0] : '' })
                  }
                  className="form-control px-3 py-2 w-100"
                  placeholderText="Select date"
                  maxDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  required
                />
              </div>
            </div>

            {/* Biography */}
            <div className="mb-4 text-start">
              <label htmlFor="bio" className="form-label fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
                Short Biography <span className="text-danger">*</span>
              </label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Share a few words about their life..."
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="form-control"
                style={{ borderRadius: '0.5rem', borderColor: '#e5e7eb', boxShadow: 'none', padding: '12px' }}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <CandleButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MemorialForm
