import React from "react";

export function DateInput({ register, name, label, error, lang = "en", className = "" }) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        type="date"
        id={name}
        lang={lang}
        {...register(name)}
        className={`w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50 text-foreground px-3 py-2 text-sm border border-input ${className}`}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
}
