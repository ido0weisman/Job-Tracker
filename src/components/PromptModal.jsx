import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import Modal from './Modal'

// shows the generated research prompt as plain text, ready to copy into
// an AI chat. read-only - this modal has no editing, just a copy action.
function PromptModal({ prompt, onClose }) {
  const [didCopy, setDidCopy] = useState(false)

  async function copyToClipboard() {
    await navigator.clipboard.writeText(prompt)
    setDidCopy(true)
    setTimeout(() => setDidCopy(false), 1500)
  }

  return (
    <Modal title="Generated Prompt" onClose={onClose}>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Copy this into your AI chat of choice to fill in the rest of the job's details.
        </p>

        <textarea
          readOnly
          rows={12}
          dir="auto"
          value={prompt}
          className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900
            px-3 py-2 text-sm font-mono"
        />

        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center justify-center gap-1.5 self-end text-sm font-medium rounded-md px-3 py-1.5
            bg-slate-100 dark:bg-slate-700 hover:brightness-95 transition-all"
        >
          {didCopy ? <Check size={14} /> : <Copy size={14} />}
          {didCopy ? 'Copied' : 'Copy'}
        </button>
      </div>
    </Modal>
  )
}

export default PromptModal
