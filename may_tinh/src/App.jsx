import React, { useState } from 'react';

const buttons = [
  { label: 'C', value: 'clear', color: 'clear' },
  { label: '÷', value: '/', color: 'operator' },
  { label: '×', value: '*', color: 'operator' },
  { label: '-', value: '-', color: 'operator' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '+', value: '+', color: 'operator' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '=', value: '=', color: 'equal' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '0', value: '0' },
  { label: '.', value: '.', wide: true },
];

const operators = '+-*/';

function Display({ value }) {
  return <div className="screen" aria-live="polite">{value}</div>;
}

function Button({ label, value, color = '', wide = false, onClick }) {
  return (
    <button
      className={`button ${color}`}
      style={wide ? { gridColumn: 'span 4' } : undefined}
      onClick={() => onClick(value)}
      type="button"
    >
      {label}
    </button>
  );
}

function calculate(expression) {
  try {
    const result = Function(`"use strict"; return (${expression})`)();
    return Number.isFinite(result) ? String(result) : 'Error';
  } catch {
    return 'Error';
  }
}

function Calculator() {
  const [expression, setExpression] = useState('0');

  function handleInput(value) {
    if (value === 'clear') {
      setExpression('0');
      return;
    }

    if (value === '=') {
      setExpression(calculate(expression));
      return;
    }

    if (expression === 'Error') {
      setExpression(/[0-9.]/.test(value) ? value : `0${value}`);
      return;
    }

    if (/^[0-9]$/.test(value)) {
      setExpression(expression === '0' ? value : expression + value);
      return;
    }

    if (value === '.') {
      const currentNumber = expression.split(/[+\-*/]/).pop();
      if (!currentNumber.includes('.')) {
        setExpression(expression + value);
      }
      return;
    }

    if (operators.includes(value)) {
      if (expression === '0' && value !== '-') {
        return;
      }

      const lastCharacter = expression.slice(-1);
      setExpression(
        operators.includes(lastCharacter)
          ? expression.slice(0, -1) + value
          : expression + value,
      );
    }
  }

  return (
    <main className="calculator" aria-label="Virtual Calculator">
      <Display value={expression} />
      <div className="buttons">
        {buttons.map((button) => (
          <Button key={button.value} {...button} onClick={handleInput} />
        ))}
      </div>
    </main>
  );
}

export default function App() {
  return <Calculator />;
}
