import { AiOutlineSave } from 'react-icons/ai'; // Save icon
import { SiTicktick } from 'react-icons/si'; // Success tick icon
import { FiGithub } from 'react-icons/fi'; // GitHub icon

/**
 * Header component - The application header with title, GitHub link, and save button
 * @param {Object} props - Component props:
 *   @param {Function} onClickSave - Callback when save button is clicked
 *   @param {boolean} showSaveAnimation - Flag to toggle save success animation
 * @returns {JSX.Element} - Application header with interactive elements
 */
export default function Header({ onClickSave, showSaveAnimation }) {
  return (
    <header className="flex flex-row justify-between items-center px-6 py-3 bg-indigo-600 text-white shadow-md">
      {/* Left section: App title and GitHub link */}
      <div className="flex items-center gap-4">
        {/* Application title */}
        <h1 className="text-xl font-bold">Bitespeed Flow Builder</h1>
        
        {/* GitHub repository link */}
        <a 
          href="https://github.com/surajm7/bitespeed-flow-builder" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-indigo-200 transition-colors"
          aria-label="View on GitHub"
        >
          <FiGithub size={24} /> {/* GitHub icon */}
        </a>
      </div>

      {/* Save button with dynamic icon state */}
      <button
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 active:bg-indigo-800 active:translate-y-0 active:shadow-sm"
        onClick={onClickSave}
        aria-label="Save changes"
      >
        <span className="flex items-center">
          Save Changes
          {/* Conditional rendering based on save state */}
          {showSaveAnimation ? (
            // Success tick with pulsing animation when saved
            <SiTicktick size={20} className="ml-2 animate-pulse" />
          ) : (
            // Default save icon
            <AiOutlineSave size={20} className="ml-2" />
          )}
        </span>
      </button>
    </header>
  );
}