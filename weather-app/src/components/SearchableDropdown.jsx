import { useState, useEffect, useRef } from "react";
import { Form, Dropdown } from "react-bootstrap";

function SearchableDropdown({
  searchTerm,
  setSearchTerm,
  cityResults,
  handleSelectCity,
  setSelectedCity,
  setError,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef(null); // for click outside

  
  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setSelectedCity(null);
    setError('');
    setShowDropdown(true); // Always show when typing
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || cityResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % cityResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + cityResults.length) % cityResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleSelectCity(cityResults[highlightedIndex]);
        setShowDropdown(false);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef}>
      <h2>Select a City</h2>
      <Dropdown show={showDropdown && cityResults.length > 0}>
        <Form.Control
          type="text"
          placeholder="Start typing a city..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="mb-2"
          autoComplete="off"
        />
        <Dropdown.Menu style={{ width: '100%' }} className="shadow">
          {cityResults.map((city, idx) => (
            <Dropdown.Item
              key={city.id}
              onClick={() => {
                handleSelectCity(city);
                setShowDropdown(false);
              }}
              onMouseEnter={() => setHighlightedIndex(idx)}
              active={idx === highlightedIndex}
            >
              {city.name}, {city.countryCode}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default SearchableDropdown;
