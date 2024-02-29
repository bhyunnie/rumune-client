import { useEffect, useState } from "react";
import CustomEditor from "../../components/editor/CustomEditor";
import "./Write.css";

const Write = () => {
  // TODO : step1이 끝나고 step2 필요
  // const [data, setData] = useState();
  const [step, setStep] = useState(0);

  useEffect(() => {
    nextStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [step]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div id="write">
      <div className="header-container">
        <div>RUMUNE</div>
      </div>
      {step === 1 ? (
        <div className="post-info-container">
          <button onClick={nextStep}>다음단계</button>
        </div>
      ) : (
        <div className="editor-container">
          <CustomEditor></CustomEditor>
          <button onClick={prevStep}>이전단계</button>
        </div>
      )}
    </div>
  );
};

export default Write;
