"use client";

import { useEffect, useRef, useState } from "react";
import ForgotPasswordEmail from "./forgot-password-email";
import ForgotPasswordProgress from "./forgot-password-progress";
import ForgotPasswordReset from "./forgot-password-reset";
import ForgotPasswordSuccess from "./forgot-password-success";
import ForgotPasswordVerify from "./forgot-password-verify";

type ForgotPasswordProps = {
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
};

type RecoveryState =
  | { stage: "email"; email: string }
  | { stage: "verify"; email: string }
  | { stage: "reset"; email: string; code: string }
  | { stage: "success"; email: string };

const STEP_BY_STAGE: Record<RecoveryState["stage"], 1 | 2 | 3> = {
  email: 1,
  verify: 2,
  reset: 3,
  success: 3,
};

export default function ForgotPassword({
  onSwitchToLogin,
  onSwitchToRegister,
}: ForgotPasswordProps) {
  const [state, setState] = useState<RecoveryState>({
    stage: "email",
    email: "",
  });
  const stepRef = useRef<HTMLDivElement>(null);
  const previousStage = useRef<RecoveryState["stage"]>(state.stage);
  const currentStep = STEP_BY_STAGE[state.stage];

  useEffect(() => {
    if (previousStage.current === state.stage) return;

    previousStage.current = state.stage;
    stepRef.current?.focus({ preventScroll: true });
  }, [state.stage]);

  return (
    <div className="auth-step-forgot space-y-6">
      <ForgotPasswordProgress currentStep={currentStep} />

      <div
        ref={stepRef}
        key={state.stage}
        role="group"
        tabIndex={-1}
        aria-label={`Password recovery step ${currentStep} of 3`}
        className="auth-step-enter outline-none"
      >
        {state.stage === "email" && (
          <ForgotPasswordEmail
            initialEmail={state.email}
            onSubmitted={(email) => setState({ stage: "verify", email })}
            onSwitchToLogin={onSwitchToLogin}
            onSwitchToRegister={onSwitchToRegister}
          />
        )}

        {state.stage === "verify" && (
          <ForgotPasswordVerify
            email={state.email}
            onVerified={(code) =>
              setState({ stage: "reset", email: state.email, code })
            }
            onBack={() =>
              setState({ stage: "email", email: state.email })
            }
            onSwitchToLogin={onSwitchToLogin}
          />
        )}

        {state.stage === "reset" && (
          <ForgotPasswordReset
            email={state.email}
            code={state.code}
            onReset={() =>
              setState({ stage: "success", email: state.email })
            }
            onStartOver={() =>
              setState({ stage: "email", email: state.email })
            }
            onSwitchToLogin={onSwitchToLogin}
          />
        )}

        {state.stage === "success" && (
          <ForgotPasswordSuccess
            email={state.email}
            onSwitchToLogin={onSwitchToLogin}
          />
        )}
      </div>
    </div>
  );
}
