import models from './data/models.json'

function App() {
  const earliestPriceAsOf = models.reduce<string | null>(
    (earliest, model) => (!earliest || model.priceAsOf < earliest ? model.priceAsOf : earliest),
    null,
  )

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
      <div className="w-full max-w-2xl">
        <header className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Cost planning for AI projects
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">AI ROI Simulator</h1>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            P1 AI Cost Estimator (coming next)
          </p>
        </header>

        <section
          aria-labelledby="deploy-check-title"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              ✓
            </span>
            <div>
              <h2 id="deploy-check-title" className="font-semibold">Deploy check</h2>
              <p className="text-sm text-slate-500">Project data loaded successfully</p>
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">App version</dt>
              <dd className="mt-1 text-lg font-semibold">v0.0.1</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Models loaded</dt>
              <dd className="mt-1 text-lg font-semibold">{models.length}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Earliest price date</dt>
              <dd className="mt-1 text-lg font-semibold">{earliestPriceAsOf ?? 'No date available'}</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  )
}

export default App
