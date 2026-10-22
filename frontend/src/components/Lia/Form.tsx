import { useReducer, useState } from 'react'
import { PaperPlaneRightIcon } from '@phosphor-icons/react'
import LocationAutocomplete from './LocationAutocomplete'
import NavButtons from './NavButtons'
import { validateStep } from './validation'
import { submitApplication } from '../../api/applicationApi'
import ApplicationConfirmation from './Confirmation'

import type { FormErrors } from './validation'

import styles from './Form.module.css'

const INITIAL_STATE = {
  companyName: '',
  location: '',
  workplaceModel: '',
  period: [] as number[],
  contactPerson: '',
  email: '',
  phone: '',
  message: ''
}

const WORKPLACE_MODELS = ['On-site', 'Hybrid', 'Remote']

const WORK_LOCATIONS = [
  'Stockholm',
  'Göteborg',
  'Malmö',
  'Uppsala',
  'Västerås',
  'Örebro',
  'Linköping',
  'Helsingborg',
  'Jönköping',
  'Lund',
  'Norrköping',
  'Umeå',
  'Gävle',
  'Borås',
  'Södertälje',
  'Eskilstuna',
  'Halmstad',
  'Växjö',
  'Karlstad',
  'Sundsvall',
  'Annan'
]

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

  const formReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SET_COMPANY_NAME':
        return { ...state, companyName: action.payload }

      case 'SET_LOCATION':
        return { ...state, location: action.payload }

      case 'SET_TECH_STACK':
        return { ...state, techStack: action.payload }

      case 'SET_WORKPLACE_MODEL':
        return { ...state, workplaceModel: action.payload }

      case 'TOGGLE_PERIOD':
        return {
          ...state,
          period: state.period.includes(action.payload)
            ? state.period.filter((id: number) => id !== action.payload)
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

  function handleChange(type: string, value: string) {
    dispatch({ type, payload: value })

    const fields: Record<string, keyof FormErrors> = {
      SET_COMPANY_NAME: 'companyName',
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

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const validationErrors = validateStep(step, formState)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    if (step < STEPS) {
      setStep((prev) => prev + 1)
      return
    }

    if (isSending) return

    setIsSending(true)
    setSubmitError('')

    try {
      await submitApplication(formState, faxNumber)
      setSubmitted(true)
    } catch {
      setSubmitError('Ansökan kunde inte skickas. Försök igen.')
    } finally {
      setIsSending(false)
    }
  }

  if (submitted) {
    return <ApplicationConfirmation />
  }

  return (
    <>
      <h1>Ansökan</h1>
      <p>Ansök om att bli min LIA-arbetsplats under 2027.</p>

      {step === 1 && (
        <>
          <h2>Arbetsplats</h2>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles['form-group']}>
              <label htmlFor="companyName">Företagsnamn</label>

              <input
                type="text"
                id="companyName"
                onChange={(e) =>
                  handleChange('SET_COMPANY_NAME', e.target.value)
                }
                value={formState.companyName}
                aria-invalid={!!errors.companyName}
                aria-describedby={
                  errors.companyName ? 'companyName-error' : undefined
                }
              />

              {errors.companyName && (
                <p id="companyName-error" className={styles['field-error']}>
                  {errors.companyName}
                </p>
              )}
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="location">Stad</label>

              <LocationAutocomplete
                value={formState.location}
                onChange={(value) => handleChange('SET_LOCATION', value)}
                locations={WORK_LOCATIONS}
                error={errors.location}
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
                        handleChange('SET_WORKPLACE_MODEL', e.target.value)
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
              aria-describedby={errors.period ? 'period-error' : undefined}
            >
              <legend>LIA-period</legend>

              <div className={styles['periods-container']}>
                {PERIODS.map((period) => (
                  <div key={period.id} className={styles['checkbox-group']}>
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

                        setErrors((prev) => ({ ...prev, period: undefined }))
                      }}
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
        </>
      )}

      {step === 2 && (
        <>
          <h2>Kontaktperson</h2>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles['form-group']}>
              <label htmlFor="contactPerson">Kontaktperson</label>

              <input
                type="text"
                id="contactPerson"
                value={formState.contactPerson}
                aria-invalid={!!errors.contactPerson}
                aria-describedby={
                  errors.contactPerson ? 'contactPerson-error' : undefined
                }
                onChange={(e) =>
                  handleChange('SET_CONTACT_PERSON', e.target.value)
                }
              />

              {errors.contactPerson && (
                <p id="contactPerson-error" className={styles['field-error']}>
                  {errors.contactPerson}
                </p>
              )}
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="email">E-post</label>

              <input
                type="email"
                id="email"
                value={formState.email}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                onChange={(e) => handleChange('SET_EMAIL', e.target.value)}
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
                onChange={(e) =>
                  dispatch({ type: 'SET_PHONE', payload: e.target.value })
                }
              />
            </div>
            <NavButtons onBack={() => setStep(step - 1)} next />
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Meddelande</h2>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles['form-group']}>
              <label htmlFor="message">Meddelande</label>
              <textarea
                id="message"
                onChange={(e) =>
                  dispatch({ type: 'SET_MESSAGE', payload: e.target.value })
                }
              ></textarea>
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

            <NavButtons onBack={() => setStep(step - 1)}>
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
        </>
      )}
    </>
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
