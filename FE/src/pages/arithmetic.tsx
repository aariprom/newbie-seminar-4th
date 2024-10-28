import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/arithmetic.css";

interface IAPIResponse {
  id?: number;
  lhs: number;
  op: string;
  rhs: number;
  result: number;
  memo: string;
}

const SAPIBase = "http://localhost:8080";

const ArithPage: React.FC = () => {
  const [LAPIResponse, setLAPIResponse] = useState<IAPIResponse[]>([]);
  const [SSearchItem, setSSearchItem] = useState<string>("");
  const [lhs, setLhs] = useState<number>(0);
  const [rhs, setRhs] = useState<number>(0);
  const [operator, setOperator] = useState<string>("+");
  const [memo, setMemo] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [currentCalculation, setCurrentCalculation] = useState<IAPIResponse | null>(null);

  useEffect(() => {
    let BComponentExited = false;
    const asyncFun = async () => {
      try {
        const response = await axios.get<IAPIResponse[]>(
          `${SAPIBase}/arithmetic/show?search=${SSearchItem}`
        );
  
        if (!BComponentExited && Array.isArray(response.data)) {
          setLAPIResponse(response.data);
        } else if (!Array.isArray(response.data)) {
          console.error("Expected an array, but received:", response.data);
        }
      } catch (e) {
        window.alert(`Error while running API Call: ${e}`);
      }
    };
    asyncFun();
  
    return () => {
      BComponentExited = true;
    };
  }, [SSearchItem]);

  const doArith = async () => {
    try {
      const payload = { lhs, op: operator, rhs, memo };
      let endpoint;

      switch (operator) {
        case "+":
          endpoint = `${SAPIBase}/arithmetic/add`;
          break;
        case "-":
          endpoint = `${SAPIBase}/arithmetic/sub`;
          break;
        case "*":
          endpoint = `${SAPIBase}/arithmetic/mul`;
          break;
        case "/":
          endpoint = `${SAPIBase}/arithmetic/div`;
          break;
        default:
          throw new Error("Invalid operator");
      }

      // Perform the operation and get the response
      const { data } = await axios.post<IAPIResponse>(endpoint, payload);

      // Update the result state and currentCalculation
      setResult(data.result);
      setCurrentCalculation({
        lhs,
        op: operator,
        rhs,
        result: data.result,
        memo
      });

    } catch (e) {
      window.alert(`Error while performing arithmetic operation: ${e}`);
    }
  };

  const saveCalculation = async () => {
    if (!currentCalculation) {
      window.alert("No calculation to save. Please perform a calculation first.");
      return;
    }

    try {
      const response = await axios.post<{ id: number, isOK: boolean }>(`${SAPIBase}/arithmetic/save`, currentCalculation);
      if (response.data.isOK) {
        const savedCalculation = { ...currentCalculation, id: response.data.id };
        window.alert('Calculation saved successfully');
        setLAPIResponse(prev => [savedCalculation, ...prev]);
        setCurrentCalculation(null);
      } else {
        throw new Error('Failed to save calculation');
      }
    } catch (e) {
      console.error('Error saving calculation:', e);
      window.alert(`Error saving calculation: ${e}`);
    }
  };

  const updateHistory = async () => {
    try {
      const history = await axios.get<IAPIResponse[]>(
        `${SAPIBase}/arithmetic/show?search=${SSearchItem}`
      );
      setLAPIResponse(history.data);
    } catch (e) {
      console.error('Error updating history:', e);
      window.alert(`Error updating history: ${e}`);
    }
  };

  return (
    <div className="Arith">
      <h2>Arithmetic</h2>

      <div className="arith-form">
        <input
          type="number"
          placeholder="Left-hand side"
          value={lhs}
          onChange={(e) => setLhs(Number(e.target.value))}
        />
        <select value={operator} onChange={(e) => setOperator(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input
          type="number"
          placeholder="Right-hand side"
          value={rhs}
          onChange={(e) => setRhs(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <button onClick={doArith}>Calculate</button>
      </div>

      {/* Result Box */}
      <div className="result-box">
        <h3>Result:</h3>
        <p>{result !== null ? result : "No result yet"}</p>
        {currentCalculation && (
          <button onClick={saveCalculation}>Save Calculation</button>
        )}
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search history"
          value={SSearchItem}
          onChange={(e) => setSSearchItem(e.target.value)}
        />
      </div>

      <div className="history">
        <h3>Calculation History</h3>
        {LAPIResponse && LAPIResponse.length > 0 ? (
          <ul>
            {LAPIResponse.map((item) => (
              <li key={item.id}>
                {item.lhs} {item.op} {item.rhs} = {item.result}{" "}
                <strong>Memo:</strong> {item.memo}
              </li>
            ))}
          </ul>
        ) : (
          <p>No calculation history available.</p>
        )}
      </div>
    </div>
  );
};

export default ArithPage;