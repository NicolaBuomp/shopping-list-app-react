import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../app/store/slice/themeSlice';
import { RootState } from '../../app/store/store';
import { Switch } from '@headlessui/react';

const ThemeSwitch: React.FC = () => {
    const dispatch = useDispatch();
    const themeMode = useSelector((state: RootState) => state.theme.mode);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    const isDark = themeMode === 'dark';

    return (
        <Switch.Group>
            <div className="flex items-center space-x-2">
                <Switch.Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                </Switch.Label>
                <Switch
                    checked={isDark}
                    onChange={handleToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        isDark ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                            isDark ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    );
};

export default ThemeSwitch;
