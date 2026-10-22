import { useEffect, useReducer, useRef, useState } from 'react'
import { PaperPlaneRightIcon } from '@phosphor-icons/react'
import LocationAutocomplete from './LocationAutocomplete'
import NavButtons from './NavButtons'
import { validateStep } from './validation'
import { submitApplication } from '../../api/applicationApi'
import ApplicationConfirmation from './Confirmation'
import { WORK_LOCATIONS } from './locations'
import type { FormErrors } from './validation'
import styles from './Form.module.css'
type FormState = typeof INITIAL_STATE
type FormAction =
  | { type: 'SET_COMPANY_NAME'; payload: string }
  | { type: 'SET_WEBSITE'; payload: string }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'SET_WORKPLACE_MODEL'; payload: string }
  | { type: 'TOGGLE_PERIOD'; payload: number }
  | { type: 'SET_CONTACT_PERSON'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONE'; payload: string }
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'RESET' }
type Transition = {
  target: number
  direction: 'forward' | 'backward'
  phase: 'leaving' | 'entering'
}
const INITIAL_STATE = {
  companyName: '',
  website: '',
  location: '',
  workplaceModel: '',
  period: [] as number[],
  contactPerson: '',
  email: '',
  phone: '',
  message: ''
}
const WORKPLACE_MODELS = ['On-site', 'Hybrid', 'Remote']
const PERIODS = [
  {
    id: 1,
    dates: [['2027-01-04', '2027-03-12']]
  },
  {
    id: 2,
    dates: [
      ['2027-04-26', '2027-06-11'],
      ['2027-08-09', '2027-10-01']
    ]
  }
]
const STEPS = 3
export default function InterestForm() {
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSending, setIsSending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [faxNumber, setFaxNumber] = useState('')
  const [stepHeight, setStepHeight] = useState<number>()
  const [transition, setTransition] = useState<Transition | null>(null)
  const stepRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = stepRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      setStepHeight(entry.borderBoxSize[0].blockSize)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const formReducer = (state: FormState, action: FormAction) => {
    switch (action.type) {
      case 'SET_COMPANY_NAME':
        return { ...state, companyName: action.payload }
      case 'SET_WEBSITE':
        return { ...state, website: action.payload }
      case 'SET_LOCATION':
        return { ...state, location: action.payload }
      case 'SET_WORKPLACE_MODEL':
        return { ...state, workplaceModel: action.payload }
      case 'TOGGLE_PERIOD':
        return {
          ...state,
          period: state.period.includes(action.payload)
            ? state.period.filter((id) => id !== action.payload)
            : [...state.period, action.payload]
        }
      case 'SET_CONTACT_PERSON':
        return { ...state, contactPerson: action.payload }
      case 'SET_EMAIL':
        return { ...state, email: action.payload }
      case 'SET_PHONE':
        return { ...state, phone: action.payload }
      case 'SET_MESSAGE':
        return { ...state, message: action.payload }
      case 'RESET':
        return INITIAL_STATE
      default:
        return state
    }
  }
  const [formState, dispatch] = useReducer(formReducer, INITIAL_STATE)
  function handleChange(
    type: Exclude<FormAction['type'], 'TOGGLE_PERIOD' | 'RESET'>,
    value: string
  ) {
    dispatch({ type, payload: value })
    const fields: Record<string, keyof FormErrors> = {
      SET_COMPANY_NAME: 'companyName',
    SET_WEBSITE: 'website',
      SET_LOCATION: 'location',
      SET_WORKPLACE_MODEL: 'workplaceModel',
      SET_CONTACT_PERSON: 'contactPerson',
      SET_EMAIL: 'email',
      SET_PHONE: 'phone',
      SET_MESSAGE: 'message'
    }
    const field = fields[type]
    if (field) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }
  function validateField(field: keyof FormErrors, fieldStep: number) {
    const validationErrors = validateStep(fieldStep, formState)

    setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }))
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const validationErrors = validateStep(step, formState)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return
    if (step < STEPS) {
      changeStep(step + 1)
      return
    }
    if (isSending) return
    setIsSending(true)
    setSubmitError('')
    try {
      await submitApplication(formState, faxNumber)
      setTransition({
        target: STEPS + 1,
        direction: 'forward',
        phase: 'leaving'
      })
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Ansökan kunde inte skickas. Försök igen.'
      )
    } finally {
      setIsSending(false)
    }
  }
  function handleStepAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget || !transition) return
    if (transition.phase === 'leaving') {
      if (transition.target > STEPS) {
        setSubmitted(true)
      } else {
        setStep(transition.target)
      }
      setTransition({ ...transition, phase: 'entering' })
      return
    }
    setTransition(null)
  }
  function changeStep(nextStep: number) {
    if (transition || nextStep === step) return
    setTransition({
      target: nextStep,
      direction: nextStep > step ? 'forward' : 'backward',
      phase: 'leaving'
    })
  }
  const animationClass = !transition
    ? ''
    : transition.target > STEPS
      ? transition.phase === 'leaving'
        ? styles.fadeOut
        : styles.fadeIn
      : styles[`${transition.phase}-${transition.direction}`]
  return (
    <div className={styles.stepContainer} style={{ height: stepHeight }}>
      <div ref={stepRef}>
        {submitted ? (
          <div
            className={animationClass}
            onAnimationEnd={handleStepAnimationEnd}
          >
            <ApplicationConfirmation />
          </div>
        ) : (
          <>
            <h1>Ansökan</h1>
            <p>Ansök om att ta emot mig som LIA-studerande under 2027.</p>
            {step === 1 && (
              <div
                className={`${styles.step} ${animationClass}`}
                onAnimationEnd={handleStepAnimationEnd}
              >
                <h2>Arbetsplats</h2>
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className={styles['form-group']}>
                    <label htmlFor="companyName">Företagsnamn*</label>
                    <input
                      type="text"
                      id="companyName"
                      maxLength={200}
                      onBlur={() => validateField('companyName', 1)}
                      onChange={(e) =>
                        handleChange('SET_COMPANY_NAME', e.target.value)
                      }
                      value={formState.companyName}
                      aria-invalid={!!errors.companyName}
                      aria-describedby={
                        errors.companyName ? 'companyName-error' : undefined
                      }
                      required
                    />
                    {errors.companyName && (
                      <p
                        id="companyName-error"
                        className={styles['field-error']}
                      >
                        {errors.companyName}
                      </p>
                    )}
                  </div>
                  <div className={styles['form-group']}>
                    <label htmlFor="website">Webbplats</label>
                    <input
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      id="website"
                      maxLength={2048}
                      aria-invalid={!!errors.website}
                      aria-describedby={errors.website ? 'website-error' : undefined}
                      onBlur={() => validateField('website', 1)}
                      value={formState.website}
                      onChange={(e) => handleChange('SET_WEBSITE', e.target.value)}
                    />
                    {errors.website && (
                      <p id="website-error" className={styles['field-error']}>
                        {errors.website}
                      </p>
                  )}
                  </div>
                  <div className={styles['form-group']}>
                    <label htmlFor="location">Stad*</label>
                    <LocationAutocomplete
                      value={formState.location}
                      onChange={(value) => handleChange('SET_LOCATION', value)}
                      onBlur={() => {
                        const validationErrors = validateStep(1, formState)

                        setErrors((prev) => ({
                          ...prev,
                          location: validationErrors.location
                        }))
                      }}
                      locations={WORK_LOCATIONS}
                      error={errors.location}
                      maxLength={100}
                    />
                    {errors.location && (
                      <p id="location-error" className={styles['field-error']}>
                        {errors.location}
                      </p>
                    )}
                  </div>
                  <fieldset className={styles['form-group']}>
                    <legend>Arbetsform</legend>
                    <div className={styles['radio-group']}>
                      {WORKPLACE_MODELS.map((model) => (
                        <div key={model}>
                          <input
                            type="radio"
                            id={model}
                            name="workplaceModel"
                            value={model}
                            onChange={(e) =>
                              handleChange(
                                'SET_WORKPLACE_MODEL',
                                e.target.value
                              )
                            }
                            checked={formState.workplaceModel === model}
                          />
                          <label htmlFor={model}>{model}</label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset
                    className={styles['form-group']}
                    aria-invalid={!!errors.period}
                    aria-describedby={
                      errors.period ? 'period-error' : undefined
                    }
                  >
                    <legend>LIA-period*</legend>
                    <div className={styles['periods-container']}>
                      {PERIODS.map((period) => (
                        <div
                          key={period.id}
                          className={styles['checkbox-group']}
                        >
                          <input
                            type="checkbox"
                            id={`period-${period.id}`}
                            name="period"
                            value={period.id}
                            checked={formState.period.includes(period.id)}
                            onChange={() => {
                              dispatch({
                                type: 'TOGGLE_PERIOD',
                                payload: period.id
                              })
                              setErrors((prev) => ({
                                ...prev,
                                period: undefined
                              }))
                            }}
                            required
                          />
                          <label htmlFor={`period-${period.id}`}>
                            Period {period.id}:{' '}
                            {period.dates
                              .map(
                                ([start, end]) =>
                                  `${textDate(start)}–${textDate(end)}`
                              )
                              .join(' och ')}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.period && (
                      <p
                        id="period-error"
                        className={styles['field-error']}
                        role="alert"
                      >
                        {errors.period}
                      </p>
                    )}
                  </fieldset>
                  <NavButtons next />
                </form>
              </div>
            )}
            {step === 2 && (
              <div
                className={`${styles.step} ${animationClass}`}
                onAnimationEnd={handleStepAnimationEnd}
              >
                <h2>Kontaktperson</h2>
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className={styles['form-group']}>
                    <label htmlFor="contactPerson">Namn*</label>
                    <input
                      type="text"
                      id="contactPerson"
                      maxLength={150}
                      onBlur={() => validateField('contactPerson', 2)}
                      value={formState.contactPerson}
                      aria-invalid={!!errors.contactPerson}
                      aria-describedby={
                        errors.contactPerson ? 'contactPerson-error' : undefined
                      }
                      onChange={(e) =>
                        handleChange('SET_CONTACT_PERSON', e.target.value)
                      }
                      required
                    />
                    {errors.contactPerson && (
                      <p
                        id="contactPerson-error"
                        className={styles['field-error']}
                      >
                        {errors.contactPerson}
                      </p>
                    )}
                  </div>
                  <div className={styles['form-group']}>
                    <label htmlFor="email">E-post*</label>
                    <input
                      type="email"
                      id="email"
                      maxLength={254}
                      onBlur={() => validateField('email', 2)}
                      value={formState.email}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? 'email-error' : undefined
                      }
                      onChange={(e) =>
                        handleChange('SET_EMAIL', e.target.value)
                      }
                      required
                    />
                    {errors.email && (
                      <p id="email-error" className={styles['field-error']}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className={styles['form-group']}>
                    <label htmlFor="phone">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      maxLength={50}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      onBlur={() => validateField('phone', 2)}
                      value={formState.phone}
                      onChange={(e) => handleChange('SET_PHONE', e.target.value)}
                    />
                    {errors.phone && (
                      <p id="phone-error" className={styles['field-error']}>
                        {errors.phone}
                      </p>
                  )}
                  </div>
                  <NavButtons onBack={() => changeStep(step - 1)} next />
                </form>
              </div>
            )}
            {step === 3 && (
              <div
                className={`${styles.step} ${animationClass}`}
                onAnimationEnd={handleStepAnimationEnd}
              >
                <h2>Meddelande</h2>
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className={styles['form-group']}>
                    <label htmlFor="message">Meddelande</label>
                    <textarea
                      id="message"
                      maxLength={5000}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      onBlur={() => validateField('message', 3)}
                      value={formState.message}
                      onChange={(e) => handleChange('SET_MESSAGE', e.target.value)}
                    ></textarea>
                    {errors.message && (
                      <p id="message-error" className={styles['field-error']}>
                        {errors.message}
                      </p>
                  )}
                  </div>
                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="faxNumber">Faxnummer</label>
                    <input
                      id="faxNumber"
                      name="faxNumber"
                      type="text"
                      value={faxNumber}
                      onChange={(e) => setFaxNumber(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  {submitError && (
                    <p className={styles['field-error']} role="alert">
                      {submitError}
                    </p>
                  )}
                  <NavButtons onBack={() => changeStep(step - 1)}>
                    <button
                      type="submit"
                      data-sending={isSending}
                      disabled={isSending}
                    >
                      <span>Skicka</span>
                      <span className={styles['plane-wrapper']}>
                        <PaperPlaneRightIcon />
                      </span>
                    </button>
                  </NavButtons>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function textDate(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number)

  return new Date(year, month - 1, day)
    .toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'short'
    })
    .replace(/\./g, '')
}
