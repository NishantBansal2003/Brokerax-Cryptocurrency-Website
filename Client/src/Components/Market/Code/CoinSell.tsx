import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import "../Style/CoinSell.css";
import { useLocation } from "react-router-dom";
import LineChart from "./CoinLineChart";
import BASE_URL from "../../../Services/Service";
import Loading from "../../Loading/Loading";
interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image?: {
    small: string;
  };
  market_cap_rank?: number;
  market_data?: {
    current_price?: {
      inr: number;
    };
    price_change_percentage_1h_in_currency?: {
      inr: number;
    };
    price_change_percentage_24h_in_currency?: {
      inr: number;
    };
    price_change_percentage_7d_in_currency?: {
      inr: number;
    };
    price_change_percentage_14d_in_currency?: {
      inr: number;
    };
    price_change_percentage_30d_in_currency?: {
      inr: number;
    };
    price_change_percentage_1y_in_currency?: {
      inr: number;
    };
    low_24h?: {
      inr: number;
    };
    high_24h?: {
      inr: number;
    };
    market_cap?: {
      inr: number;
    };
    circulating_supply?: number;
  };
  description?: {
    en: string;
  };
}
const CoinSell:React.FC = () => {
  const params = useParams<{ coinId: string }>();
  const location = useLocation();
  console.log(location.state);
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [value, setValue] = useState<number | undefined>();
  const [avl, setAvl] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [message, showMessage] = useState(0);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (location.state && location.state.quantity) {
      setQuantity(location.state.quantity);
    }
  }, [location]);

  useEffect(() => {
    if (coin?.market_data && quantity) {
      var x =
        quantity *
        (coin.market_data.current_price && coin.market_data.current_price.inr
          ? coin.market_data.current_price.inr
          : 0);
      setAvl(x);
    }
  }, [coin, quantity]);

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false?x_cg_demo_api_key=CG-iwPtJRdKKJzS8SThBdi96jqE`;

  const fetchData = async () => {
    let attempts = 0;
    const maxAttempts = 5;
    const delay = (ms: number | undefined) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    while (attempts < maxAttempts) {
      try {
        const res = await axios.get(url);
        setCoin(res.data);
        setLoading(false);
        break; // Exit loop on success
      } catch (error: any) {
        if (error.response && error.response.status === 429) {
          window.addEventListener("error", (event) => {
            if (event.message.includes("Request failed with status code 429")) {
              // Prevent default error handling
              event.preventDefault();
              console.error("Too many requests, please try again later.");
            }
          });
          attempts += 1;
          const waitTime = Math.pow(2, attempts) * 1000; // Exponential backoff
          console.log(`Retrying in ${waitTime / 1000} seconds...`);
          await delay(waitTime);
        } else {
          console.log(error);
          break; // Exit loop on non-429 errors
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleBuy = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("Going To Sell", value);
    if (!value) {
      toast.error("Please Enter Amount");
      console.log("Please Enter Amount");
      return;
    }
    if (value > avl) {
      showMessage(1);
      return;
    }
    if (value < 10) {
      showMessage(2);
      return;
    }
    const userId = localStorage.getItem("userId");
    fetch(`${BASE_URL}/api/user/stock/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId: userId,
        stockId: coin?.id,
        quantity:
          value /
          (coin?.market_data &&
          coin.market_data.current_price &&
          coin.market_data.current_price.inr
            ? coin.market_data.current_price.inr
            : 1),
        current_price: value.toString(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.success) {
          toast.success("Stock Sold Successfully");
          console.log("success");
          console.log(response);
          setAvl(response.data.amount_left);
          setQuantity(
            quantity -
              (coin?.market_data &&
              coin.market_data.current_price &&
              coin.market_data.current_price.inr
                ? coin.market_data.current_price.inr
                : 1) *
                value
          );
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } else {
          toast.error("Please try again later");
        }
      });
  };

  useEffect(() => {
    if (value && value > avl) {
      showMessage(1);
    } else if (value && value < 10) {
      showMessage(2);
    } else {
      showMessage(0);
    }
  }, [value, avl]);
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="coin-container">
        <div className="graph">
          {/* <GAChart /> */}
          <figure>
            <LineChart />
          </figure>
        </div>
        <div className="content">
          <div className="coin_name flex flex-row justify-between">
            <h1>{coin?.name}</h1>
            <p>
              Available To Sell :{" "}
              {Math.round((avl + Number.EPSILON) * 100) / 100}
            </p>
          </div>
          {message === 1 ? (
            <p className="text-red-500">
              You Have Only {coin?.name}s of value{" "}
              {Math.round((avl + Number.EPSILON) * 100) / 100} to sell
            </p>
          ) : null}
          {message === 2 ? (
            <p className="text-red-500">
              You Can Only Sell Minimum Amount of 10Rs
            </p>
          ) : null}

          <div className="btn-store">
            <h2>Amount:</h2>
            <div className="buy-amount">
              <form>
                <input
                  type="number"
                  placeholder="Stock"
                  // value={value}
                  min="1"
                  max="2000"
                  step="50"
                  defaultValue="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(Number(e.target.value))
                  }
                />
                <input
                  className="btn-sell"
                  type="submit"
                  value="Sell"
                  style={{ border: "1px green" }}
                  onClick={handleBuy}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="rank">
            <span className="rank-btn">Rank # {coin?.market_cap_rank}</span>
          </div>
          <div className="info">
            <div className="coin-heading">
              {coin?.image ? <img src={coin.image.small} alt="" /> : null}
              <p>{coin?.name}</p>
              {coin?.symbol ? <p>{coin.symbol.toUpperCase()}/INR</p> : null}
            </div>
            <div className="coin-price">
              {coin?.market_data && coin.market_data.current_price ? (
                <h1>
                  Rs{" "}
                  {coin.market_data.current_price.inr
                    ?.toFixed(1)
                    .toLocaleString()}
                </h1>
              ) : null}
            </div>
          </div>
        </div>

        <div className="content">
          <table>
            <thead>
              <tr>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>14d</th>
                <th>30d</th>
                <th>1yr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {coin?.market_data &&
                  coin.market_data.price_change_percentage_1h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_1h_in_currency.inr?.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin?.market_data &&
                  coin.market_data.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_24h_in_currency.inr?.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin?.market_data &&
                  coin.market_data.price_change_percentage_7d_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_7d_in_currency.inr?.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin?.market_data &&
                  coin.market_data.price_change_percentage_14d_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_14d_in_currency.inr?.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin?.market_data &&
                  coin.market_data.price_change_percentage_30d_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_30d_in_currency.inr?.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin?.market_data &&
                  coin.market_data.price_change_percentage_1y_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_1y_in_currency.inr?.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="content">
          <div className="stats">
            <div className="left">
              <div className="row">
                <h4>24 Hour Low</h4>
                {coin?.market_data && coin.market_data.low_24h ? (
                  <p>Rs {coin.market_data.low_24h.inr.toLocaleString()}</p>
                ) : null}
              </div>
              <div className="row">
                <h4>24 Hour High</h4>
                {coin?.market_data && coin.market_data.high_24h ? (
                  <p>
                    Rs{" "}
                    {coin.market_data.high_24h.inr?.toFixed(1).toLocaleString()}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="right">
              <div className="row">
                <h4>Market Cap</h4>
                {coin?.market_data && coin.market_data.market_cap ? (
                  <p>Rs {coin.market_data.market_cap.inr.toLocaleString()}</p>
                ) : null}
              </div>
              <div className="row">
                <h4>Circulating Supply</h4>
                {coin?.market_data ? (
                  <p>{coin.market_data.circulating_supply}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="about">
            <h3>About</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  coin?.description ? coin.description.en : ""
                ),
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinSell;
