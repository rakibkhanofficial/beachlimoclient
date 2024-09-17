import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { VisuallyHidden, SwitchProps, useSwitch } from "@nextui-org/react";
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";

export const DarkModeSwitch = (props: SwitchProps) => {
  const { setTheme, theme, resolvedTheme } = useNextTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const { Component, slots, getBaseProps, getInputProps, getWrapperProps } =
    useSwitch({
      ...props,
      isSelected: isDarkMode,
    });

  useEffect(() => {
    // Update the dark mode state based on the current theme
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const handleThemeChange = (isSelected: boolean) => {
    const newTheme = isSelected ? "dark" : "light";
    setTheme(newTheme);
    setIsDarkMode(isSelected);
  };

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <label>{isDarkMode ? "Dark" : "Light"}</label>
        <input
          {...getInputProps()}
          checked={isDarkMode}
          onChange={(e) => handleThemeChange(e.target.checked)}
        />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: [
            "w-8 h-8",
            "flex items-center justify-center",
            "rounded-lg bg-default-100 hover:bg-default-200",
          ],
        })}
      >
        {isDarkMode ? <MoonIcon /> : <SunIcon />}
      </div>
    </Component>
  );
};
