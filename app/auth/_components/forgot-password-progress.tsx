type ForgotPasswordProgressProps = {
  currentStep: 1 | 2 | 3;
};

const STEP_LABELS = ["Email", "Verify code", "New password"] as const;

export default function ForgotPasswordProgress({
  currentStep,
}: ForgotPasswordProgressProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500">
          Account recovery
        </span>
        <span className="text-[11px] font-semibold text-indigo-300">
          Step {currentStep} of 3
        </span>
      </div>

      <div
        className="grid grid-cols-3 gap-1.5"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={3}
        aria-valuenow={currentStep}
        aria-valuetext={`Step ${currentStep} of 3`}
      >
        {STEP_LABELS.map((label, index) => {
          const step = index + 1;
          const isComplete = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <span
              key={label}
              aria-hidden="true"
              className={`h-1.5 rounded-full transition-colors duration-300 ${
                isComplete
                  ? "bg-indigo-500"
                  : isCurrent
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-400"
                    : "bg-slate-800"
              }`}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
        {STEP_LABELS.map((label, index) => {
          const step = index + 1;

          return (
            <span
              key={label}
              className={`transition-colors duration-300 ${
                step === currentStep
                  ? "font-semibold text-slate-200"
                  : step < currentStep
                    ? "text-indigo-400"
                    : "text-slate-600"
              }`}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
