import { X } from 'lucide-react'
import { useEffect } from 'react'

// generic modal shell: dims the background, closes on overlay click or escape,
// and provides a consistent header with a title and close button
function Modal({ title, onClose, children, widthClassName = 'max-w-lg' }) {
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg
          shadow-xl w-full ${widthClassName} max-h-[90vh] overflow-y-auto`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800">
          <h2 className="font-semibold text-base">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
