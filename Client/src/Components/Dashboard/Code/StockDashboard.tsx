import "../Style/StockDashboard.css";
import { Link } from "react-router-dom";
function StockDashboard(props: {
  current_cost: number;
  total_amount: number;
  imagesmall: string | undefined;
  stockId: string;
  quantity: any;
}) {
  return (
    <>
      <div>
        {props.current_cost >= props.total_amount && (
          <div className="show-amount flex items-center p-4  rounded my-3">
            <div className="show-amount-img flex flex-shrink-0 items-center justify-center h-16 w-16 rounded">
              <img src={props.imagesmall} alt="stock-image" />
            </div>
            <div className="flex-grow justify-between flex flex-row ml-4">
              <span className="text-amount text-sm">Buy price</span>
              <span className="text-gray-900 text-md">
                Rs {Math.round(props.total_amount)}
              </span>
              <span className="text-amount text-sm">Current price</span>
              <span className="text-gray-900 text-md">
                Rs {Math.round(props.current_cost)}
              </span>
              <div className="flex items-center justify-between">
                {/* <img src={props.imagesmall}></img>{" "} */}
                <span className="text-amount">{props.stockId}</span>
                <span className="text-green-500 text-sm font-semibold ml-2">
                  +
                  {(
                    ((props.current_cost - props.total_amount) /
                      props.total_amount) *
                    100
                  ).toFixed(2)}
                  %
                </span>
                <span>
                  <Link
                    to={"/dashboard/sell/".concat(props.stockId)}
                    state={{
                      stockId: props.stockId,
                      total_amount: props.total_amount,
                      current_cost: props.current_cost,
                      quantity: props.quantity,
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-7"
                  >
                    Sell
                  </Link>
                </span>
              </div>
            </div>
          </div>
        )}
        {props.current_cost < props.total_amount && (
          <div className="show-amount flex items-center p-4 rounded my-3">
            <div className="show-amount-img flex flex-shrink-0 items-center justify-center h-16 w-16 rounded">
              <img src={props.imagesmall} alt="stock-image" />
            </div>
            <div className="flex-grow justify-between flex flex-row ml-4">
              <span className="text-amount text-sm">Buy price</span>
              <span className="text-gray-900 text-md">
                Rs {Math.round(props.total_amount)}
              </span>
              <span className="text-amount text-sm">Current price</span>
              <span className="text-gray-900 text-md">
                Rs {Math.round(props.current_cost)}
              </span>
              <div className="flex items-center justify-between">
                {/* <img src={props.imagesmall}></img>{" "} */}
                <span className="text-amount">{props.stockId}</span>
                <span className="text-red-500 text-sm font-semibold ml-2">
                  {(
                    ((props.current_cost - props.total_amount) /
                      props.total_amount) *
                    100
                  ).toFixed(2)}
                  %
                </span>
                <span>
                  <Link
                    to={"/dashboard/sell/".concat(props.stockId)}
                    state={{
                      stockId: props.stockId,
                      total_amount: props.total_amount,
                      current_cost: props.current_cost,
                      quantity: props.quantity,
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-7"
                  >
                    Sell
                  </Link>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StockDashboard;
