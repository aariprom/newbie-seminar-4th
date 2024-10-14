import React from "react";
import axios from "axios";
import "./css/arith.css";

interface IAPIResponse { id: Number, lhs: Number, op: Number, rhs: Number, result: Number };

const SAPIBase = process.env.API_URL;

const ArithPage = (props: {}) => {
    const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
    const [ SSearchItem, setSSearchItem ] = React.useState<string>("");

    React.useEffect( () => {
      let BComponentExited = false;
      const asyncFun = async () => {
        const { data } = await axios.get<IAPIResponse[]>( SAPIBase + `arithmetic/arithmetics/show?search=${ SSearchItem }`);
        if (BComponentExited) return;
        setLAPIResponse(data);
      };
      asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
      return () => { BComponentExited = true; }
    }, [ SSearchItem ]);
    
    const doArith = {};

    return (
      <div className="Arith">
        <h2>Arithmetic</h2>
      </div>
    )
}