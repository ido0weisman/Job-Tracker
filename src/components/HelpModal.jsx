import Modal from './Modal'

// quick onboarding blurb explaining the add -> edit -> generate prompt workflow
function HelpModal({ onClose }) {
  return (
    <Modal title="How it works" onClose={onClose} widthClassName="max-w-2xl">
      <div className="flex flex-col gap-5 text-base leading-relaxed">
        <div>
          <p className="font-semibold mb-1">1. Add a job</p>
          <p className="text-slate-600 dark:text-slate-300">
            Just the company name, role name, and application date are required to get
            started - everything else can wait.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-1">2. Fill it in</p>
          <p className="text-slate-600 dark:text-slate-300">
            Click the pencil icon on a card to edit it: add background info, extra
            fields, or move it between stages. Clicking the card itself (not the
            pencil) opens a clean, read-only view instead.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-1">3. Track your next step</p>
          <p className="text-slate-600 dark:text-slate-300">
            While a job is Applied, in Technical Test, or Interview, you can set a
            Next Step Date (like an upcoming interview). The card will show a
            countdown to it automatically, turning orange when it's close and red if
            it's overdue.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-1">4. Generate a prompt</p>
          <p className="text-slate-600 dark:text-slate-300">
            Inside the edit view, hit "Generate Prompt" to turn what you've already
            filled in into a ready-to-copy prompt you can paste into an AI chat to
            research and fill in the rest.
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default HelpModal
