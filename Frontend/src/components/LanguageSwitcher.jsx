import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { languageConfig } from "@/utils/i18n/languageConfig";

const LanguageSwitcher = () => {
  const { language, languages, changeLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    changeLanguage(langCode);
  };

  const currentLang = languageConfig[selectedLanguage];

  return (
    <div className="flex items-center">
      <Select onValueChange={handleLanguageChange}>
        <SelectTrigger
          className="w-auto gap-2 rounded-full px-3 py-2 text-sm font-medium bg-background hover:bg-muted border border-input shadow-sm"
          aria-label="Language switcher"
        >
          {currentLang ? (
            <div className="flex items-center gap-2">
              <img
                src={currentLang.icon}
                className="w-[1.2rem] h-[1.2rem] rounded-full"
                alt={currentLang.label}
              />
            </div>
          ) : (
            "Select language"
          )}
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a language</SelectLabel>
            {languages.map((lang) => {
              const langConfig = languageConfig[lang];
              return (
                <SelectItem key={lang} value={lang}>
                  <div className="flex items-center gap-2">
                    <img
                      src={langConfig.icon}
                      alt={lang}
                      className="w-5 h-5 rounded-full"
                    />
                    {langConfig.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
