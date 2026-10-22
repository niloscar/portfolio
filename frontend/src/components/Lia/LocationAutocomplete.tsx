
import { useId, useState } from 'react'

import styles from './LocationAutocomplete.module.css'

type LocationAutocompleteProps = {
  value: string
  onChange: (value: string) => void
  locations: string[]
  error?: string
}

export default function LocationAutocomplete({ value, onChange, locations, error }: LocationAutocompleteProps) {
  const id = useId()

  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const filteredLocations = value.trim()
    ? locations
        .filter((location) =>
          location
            .toLocaleLowerCase('sv-SE')
            .startsWith(value.trim().toLocaleLowerCase('sv-SE'))
        )
        .slice(0, 6)
    : []

  const suggestionsVisible =
    showSuggestions && filteredLocations.length > 0

  function selectLocation(location: string) {
    onChange(location)
    setShowSuggestions(false)
    setActiveIndex(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setShowSuggestions(false)
      setActiveIndex(-1)
      return
    }

    if (e.key === 'ArrowDown' && suggestionsVisible) {
      e.preventDefault()
      setActiveIndex((prev) =>
        Math.min(prev + 1, filteredLocations.length - 1)
      )
      return
    }

    if (e.key === 'ArrowUp' && suggestionsVisible) {
      e.preventDefault()
      setActiveIndex((prev) => Math.max(prev - 1, 0))
      return
    }

    if (
      e.key === 'Enter' &&
      suggestionsVisible &&
      activeIndex >= 0
    ) {
      e.preventDefault()
      selectLocation(filteredLocations[activeIndex])
    }
  }

  return (
    <div
      className={styles.autocomplete}
      data-open={suggestionsVisible}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setShowSuggestions(false)
          setActiveIndex(-1)
        }
      }}
    >
      <input
        type="text"
        id="location"
        name="location"
        value={value}
        autoComplete="address-level2"
        role="combobox"
        aria-invalid={!!error}
        aria-describedby={error ? 'location-error' : undefined}
        aria-autocomplete="list"
        aria-expanded={suggestionsVisible}
        aria-controls={suggestionsVisible ? `${id}-suggestions` : undefined}
        aria-activedescendant={
          suggestionsVisible && activeIndex >= 0
            ? `${id}-option-${activeIndex}`
            : undefined
        }
        onFocus={() => setShowSuggestions(true)}
        onChange={(e) => {
          onChange(e.target.value)
          setShowSuggestions(true)
          setActiveIndex(-1)
        }}
        onKeyDown={handleKeyDown}
        required
      />

      {suggestionsVisible && (
        <ul
          id={`${id}-suggestions`}
          role="listbox"
          className={styles.suggestions}
        >
          {filteredLocations.map((location, index) => (
            <li
              key={location}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={
                index === activeIndex ? styles.active : undefined
              }
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectLocation(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
