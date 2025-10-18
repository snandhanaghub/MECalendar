import React, { useState, useRef, useEffect } from 'react';

/**
 * CustomSelect
 * Props:
 * - options: [{ value, label }]
 * - value: current value
 * - onChange: fn(event) with event.target = { name, value }
 * - name: field name
 * - placeholder: string
 */
const CustomSelect = ({ options = [], value = '', onChange, name, placeholder = 'Select', className = '' }) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!triggerRef.current) return;
      if (triggerRef.current.contains(e.target)) return;
      if (listRef.current && listRef.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    if (open) {
      const idx = options.findIndex(o => String(o.value) === String(value));
      setHighlighted(idx >= 0 ? idx : 0);
      setTimeout(() => {
        const el = listRef.current?.querySelector('[data-highlight="true"]');
        if (el) el.scrollIntoView({ block: 'nearest' });
      }, 0);
    }
  }, [open, options, value]);

  const toggle = () => setOpen(s => !s);

  const selectValue = (val) => {
    if (onChange) onChange({ target: { name, value: val } });
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setHighlighted(h => (h == null ? 0 : Math.min(h + 1, options.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setHighlighted(h => (h == null ? options.length - 1 : Math.max(h - 1, 0)));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      if (highlighted != null) selectValue(options[highlighted].value);
    } else if (e.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const selected = options.find(o => String(o.value) === String(value));

  return (
    <div className={`custom-select-wrapper ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        className={`custom-select-trigger ${open ? 'open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        <span className="custom-select-value">{selected ? selected.label : placeholder}</span>
        <span className="custom-select-caret">▾</span>
      </button>

      {open && (
        <ul ref={listRef} role="listbox" tabIndex={-1} className="custom-select-list">
          {options.map((opt, i) => {
            const isSelected = String(opt.value) === String(value);
            const isHighlighted = highlighted === i;
            return (
              <li
                key={opt.value + '-' + i}
                role="option"
                aria-selected={isSelected}
                className={`custom-select-item ${isHighlighted ? 'highlight' : ''} ${isSelected ? 'selected' : ''}`}
                data-highlight={isHighlighted ? 'true' : 'false'}
                onMouseEnter={() => setHighlighted(i)}
                onClick={() => selectValue(opt.value)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
