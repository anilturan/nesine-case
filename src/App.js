import "./App.css";
import { useEffect, useState } from "react";
import { useBasket } from "./context/BasketContext";

function App() {
  const [tableData, setTableData] = useState(null);
  const { basket, addBasketItem, total } = useBasket();

  useEffect(() => {
    fetch("https://nesine-case-study.onrender.com/bets")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleBasket = (key, item, index, text) => {
    const itemId = key + index;
    addBasketItem(itemId, item, text);
  };

  return (
    <div>
      <table className="table" style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th>{tableData?.length}</th>
            <th>MBS</th>
            <th>x</th>
            <th>Üst</th>
          </tr>
        </thead>
        {tableData?.map((item, index) => {
          return (
            <tbody style={{ border: "1px solid black" }}>
              <tr style={{ border: "1px solid black" }} key={index}>
                <td style={{ border: "1px solid black" }}>
                  {item.D} {item.DAY} {item.LN}
                </td>
                <td className="row"></td>

                <td className="row">{item.OCG[1].OC[1].N}</td>
                <td className="row">{item.OCG[5].OC[26].N}</td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <td className="row">
                  {item.C} {item.T} {item.N}
                </td>
                <td className="row">{item.OCG[1].OC[0].MBS}</td>
                <td
                  className="row"
                  onClick={() =>
                    handleBasket(
                      item.OCG[1].OC[1].N,
                      item.OCG[1].OC[1].O,
                      index,
                      `${item.OCG[1].OC[0].MBS} Kod: ${item.C} Maç: ${item.N} Oran: ${item.OCG[1].OC[1].O}`
                    )
                  }
                  style={{
                    backgroundColor:
                      basket?.findIndex((item) => item.id === "X" + index) !==
                      -1
                        ? "yellow"
                        : "white",
                  }}
                >
                  {item.OCG[1].OC[1].O}
                </td>
                <td
                  className="row"
                  onClick={() =>
                    handleBasket(
                      item.OCG[5].OC[26].N,
                      item.OCG[5].OC[26].O,
                      index,
                      `${item.OCG[1].OC[0].MBS} Kod: ${item.C} Maç: ${item.N} Oran: ${item.OCG[5].OC[26].O}`
                    )
                  }
                  style={{
                    backgroundColor:
                      basket?.findIndex((item) => item.id === "Üst" + index) !==
                      -1
                        ? "yellow"
                        : "white",
                  }}
                >
                  {" "}
                  {item.OCG[5].OC[26].O}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div className="cart">
        {basket?.map((item) => {
          return (
            <div>
              <span>{item.desc}</span>
              <hr></hr>
            </div>
          );
        })}
        <div style={{}}>
          <span>Toplam Tutar: </span>
          <span>{total.toFixed(2)} TL</span>
        </div>
      </div>
    </div>
  );
}

export default App;
