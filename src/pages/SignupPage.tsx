import { useState } from "react";
import EmailStep from "../components/EmailStep";
import PasswordStep from "../components/PasswordStep";
import NicknameStep from "../components/NicknameStep";
import { SignupFormData } from "../types/signup";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [storedData, setStoredData] = useLocalStorage<Partial<SignupFormData>>("signup", {});

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xs flex items-center mb-6">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="text-white text-xl">
            ←
          </button>
        )}
        <h1 className="flex-1 text-center font-semibold text-xl">회원가입</h1>
      </div>

      {step === 1 && <EmailStep setStep={setStep} setStoredData={setStoredData} />}
      {step === 2 && <PasswordStep setStep={setStep} setStoredData={setStoredData} storedData={storedData} />}
      {step === 3 && <NicknameStep storedData={storedData} />}
    </div>
  );
};

export default SignupPage;
