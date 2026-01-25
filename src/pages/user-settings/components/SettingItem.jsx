import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingItem = ({ 
  type = 'input',
  label,
  description,
  value,
  onChange,
  options = [],
  disabled = false,
  error = '',
  placeholder = '',
  min,
  max,
  unit = ''
}) => {
  const renderControl = () => {
    switch (type) {
      case 'select':
        return (
          <Select
            options={options}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full"
          />
        );

      case 'checkbox':
        return (
          <Checkbox
            checked={value}
            onChange={(e) => onChange(e?.target?.checked)}
            disabled={disabled}
          />
        );

      case 'number':
        return (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={value}
              onChange={(e) => onChange(e?.target?.value)}
              disabled={disabled}
              placeholder={placeholder}
              min={min}
              max={max}
              className="flex-1"
            />
            {unit && (
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {unit}
              </span>
            )}
          </div>
        );

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              value={value}
              onChange={(e) => onChange(e?.target?.value)}
              disabled={disabled}
              min={min}
              max={max}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{min}{unit}</span>
              <span className="font-mono text-foreground">{value}{unit}</span>
              <span>{max}{unit}</span>
            </div>
          </div>
        );

      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e?.target?.value)}
            disabled={disabled}
            placeholder={placeholder}
            error={error}
            className="w-full"
          />
        );
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg hover:bg-muted/30 transition-smooth">
        {renderControl()}
        <div className="flex-1 min-w-0">
          <label className="text-sm md:text-base font-medium text-foreground cursor-pointer">
            {label}
          </label>
          {description && (
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 md:space-y-3">
      <div>
        <label className="text-sm md:text-base font-medium text-foreground block">
          {label}
        </label>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">
            {description}
          </p>
        )}
      </div>
      {renderControl()}
      {error && (
        <p className="text-xs md:text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default SettingItem;