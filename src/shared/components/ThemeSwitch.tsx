// src/shared/components/ThemeSwitch.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../app/store/slice/themeSlice';
import { RootState } from '../../app/store/store';

const ThemeSwitch: React.FC = () => {
    const dispatch = useDispatch();
    const themeMode = useSelector((state: RootState) => state.theme.mode);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    const isDark = themeMode === 'dark';

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={isDark}
                onChange={handleToggle}
            />
            <div
                className="
          w-11 h-6
          bg-gray-200 dark:bg-gray-700
          rounded-full
          peer
          peer-checked:bg-blue-600
          transition-colors
          duration-300
        "
            ></div>
            <span
                className="
          absolute left-1 top-1
          w-4 h-4
          bg-white
          border border-gray-300
          rounded-full
          transition-transform
          duration-300
          peer-checked:translate-x-5
        "
            ></span>
        </label>
    );
};

export default ThemeSwitch;
