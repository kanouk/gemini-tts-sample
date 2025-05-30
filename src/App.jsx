import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
      document.documentElement.style.backgroundColor = '#242424'
      document.documentElement.style.color = 'rgba(255, 255, 255, 0.87)'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
      document.documentElement.style.backgroundColor = '#ffffff'
      document.documentElement.style.color = '#213547'
    }
  }, [isDark])

  return (
    <>
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="テーマ切り替え"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Vite + React</h1>
        <p className="text-lg">
          現在のテーマ: {isDark ? 'ダーク' : 'ライト'}モード
        </p>
      </div>
    </>
  )
}

export default App