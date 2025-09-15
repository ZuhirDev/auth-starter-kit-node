import React from 'react';
import { Input } from '@/components/ui/input';

const FormInput = ({name, type, placeholder, register, disabled, error, hidden, value, defaultValue, className }) => {
  return (
    <div>
        <Input 
        {...register(name)}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        hidden={hidden}
        value={value}
        defaultValue={defaultValue}
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${className} ${
            error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-primary'
        }`}  
        />

        {error && (
            <p className="text-sm text-red-500 mt-1">{error?.message}</p>
        )}
    </div>
  )
}

export default FormInput;
