import * as React from "react";
import "./styles.css";
import { useNLP } from "./usenlp";

export default function App() {
  const { respon, message, setMessage } = useNLP();

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        Respon: <b>{respon.answer || ""}</b>
      </div>
      <div>scope: {respon.score}</div>
      <pre>{JSON.stringify(respon, null, 2)}</pre>
    </div>
  );
}
