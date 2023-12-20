import React, { useState } from 'react';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const updateData = (data) => setFormData({ ...formData, ...data });

  switch(step) {
    case 1:
      return <StepOne nextStep={nextStep} updateData={updateData} />;
    case 2:
      return <StepTwo nextStep={nextStep} prevStep={prevStep} updateData={updateData} />;
    case 3:
      return <StepThree prevStep={prevStep} formData={formData} />;
    default:
      return null;
  }
}

export default MultiStepForm;
