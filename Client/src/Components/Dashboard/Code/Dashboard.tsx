import React, { useEffect, useState, useRef } from "react";
import "../Style/Dashboard.css";
import axios from "axios";
import NETS from "vanta/dist/vanta.net.min";
import StockDashboard from "./StockDashboard";
import { toast } from "react-toastify";
import BASE_URL from "../../../Services/Service";
const RenderingArrayOfObjects: React.FC = () => {
  const [currentcoins, setcurrentcoins] = useState<any>([]);
  const [listItems, setlistItems] = useState<any>([]);

  const getdata = () => {
    const token = localStorage.getItem("token");
    var userId = localStorage.getItem("userId");
    userId = userId?.replace(/['"]+/g, "") || null;
    fetch(`${BASE_URL}/api/user/portfolio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        res = res.data.stocks;

        for (let i = 0; i < res.length; i++) {
          const url = `https://api.coingecko.com/api/v3/coins/${res[i].stockId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false?x_cg_demo_api_key=CG-iwPtJRdKKJzS8SThBdi96jqE`;

          axios
            .get(url)
            .then((resa) => {
              res[i].imagesmall = resa.data.image.small;
              res[i].current_market_price =
                resa.data.market_data.current_price.inr;
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return res;
      })
      .then((res) => {
        setcurrentcoins(res);
      })
      .then(() => {
        return showdata(currentcoins);
      })
      .then((lists) => setlistItems(lists))
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  //   getdata();
  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentcoins]);
  // TODO:
  // ! there was (currentcoins) in above use Effect but due to
  //! Large request I removed if there is some malfunction bring it back
  const showdata = (datas: any[]) => {
    let listItems1 = datas.map(
      (element: {
        sto: React.Key | null | undefined;
        stockId: string;
        imagesmall: string | undefined;
        total_amount: number;
        quantity: number;
        current_market_price: number;
      }) => {
        return (
          <StockDashboard
            key={element.sto}
            stockId={element.stockId}
            imagesmall={element.imagesmall}
            total_amount={element.total_amount}
            quantity={element.quantity}
            current_cost={element.quantity * element.current_market_price}
          />
        );
      }
    );
    return listItems1;
  };

  return <div>{listItems}</div>;
};

const Dashboard: React.FC = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NETS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xfc5b3f,
          backgroundColor: 0x1,
          points: 11.0,
          maxDistance: 0,
          size: 15.0,
          spacing: 10.0,
        })
      );
    }
    return () => {
      vantaEffect?.destroy();
    };
  }, [vantaEffect]);

  const [balance, setbalance] = useState(0);
  const [temp, settemp] = useState(0);
  const getdata = () => {
    const token = localStorage.getItem("token");
    var userId = localStorage.getItem("userId");
    userId = userId?.replace(/['"]+/g, "") || null;
    fetch(`${BASE_URL}/api/user/portfolio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);

        setbalance(Math.round(res.data.credits));

        res = res.data.stocks;
        let dummy = 0;
        for (let i = 0; i < res.length; i++) {
          const url = `https://api.coingecko.com/api/v3/coins/${res[i].stockId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false?x_cg_demo_api_key=CG-iwPtJRdKKJzS8SThBdi96jqE`;

          axios
            .get(url)
            // eslint-disable-next-line no-loop-func
            .then((resa) => {
              res[i].imagesmall = resa.data.image.small;
              res[i].current_market_price =
                resa.data.market_data.current_price.inr;
              dummy +=
                res[i].quantity * resa.data.market_data.current_price.inr;
              console.log(dummy);
              settemp(Math.round(dummy));
            })
            .catch((error) => {
              console.log(error);
            });
        }
        console.log(dummy);
        return temp;
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  //   getdata();
  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
    }
    console.log(localStorage.getItem("token"));
  }, []);

  return (
    <div id="overall">
      <div className="sidebar">
        <div className="sidebar-brand">
          {/* <h2>
            <span id="kleenpulse">Brokerax</span>
          </h2> */}
          <h2 className="sidebar_logo_brokerax hidden xl:block" id="dashboard">
            BROKERAX
          </h2>
        </div>
        <div className="sidebar-menu ">
          <ul>
            <li>
              <a href="/dashboard" className="active">
                <span className="fas fa-cubes"></span>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="Markets">
                <span className="fas fa-users"></span>
                <span>Market</span>
              </a>
            </li>
            <li>
              <a href="/dashboard">
                <span className="fas fa-clipboard-list"></span>
                <span>Wallet</span>
              </a>
            </li>
            <li>
              <a href="/dashboard">
                <span className="fas fa-shopping-bag"></span>
                <span>Orders</span>
              </a>
            </li>
            <li>
              <a href="/Markets">
                <span className="fas fa-receipt"></span>
                <span>News Info</span>
              </a>
            </li>
            <li>
              <a href="/dashboard">
                <span className="fa fa-user-circle"></span>
                <span>Accounts</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-wrapper">
        <div className="main-content" ref={vantaRef}>
          <header>
            <h2 className="heading" id="dashboard">
              Dashboard
            </h2>
          </header>

          <main>
            <div className="cards">
              <div className="card-single ">
                <div>
                  <h1 id="customer">{}</h1>
                  <span>Happy Clients</span>
                </div>
                <div>
                  <span className="fas fa-users"></span>
                </div>
              </div>
              <div className="card-single flex-col ">
                <div className="flex justify-between h-[6rem]">
                  <div>
                    <h1>₹{temp}</h1>
                    <span>Current Price</span>
                  </div>
                  <div>
                    <span className="fas fa-clipboard"></span>
                    {Number(
                      ((temp / (1000000 - balance)) * 100 - 100).toFixed(2)
                    ) >= 0 ? (
                      <div className="mt-3 text-green-500">
                        % Profit
                        <p className="text-green-500">
                          {((temp / (1000000 - balance)) * 100 - 100).toFixed(
                            2
                          )}
                          %
                        </p>
                      </div>
                    ) : (
                      <div className="mt-3 text-red-500">
                        % Loss
                        <p className="text-red-500">
                          {((temp / (1000000 - balance)) * 100 - 100).toFixed(
                            2
                          )}
                          %
                        </p>
                      </div>
                    )}
                    {/* <div className="mt-3 ">
                      {((temp / (1000000 - balance)) * 100 - 100).toFixed(2) >=
                      0
                        ? "% Profits"
                        : "% Loss"}
                      <p>
                        {((temp / (1000000 - balance)) * 100 - 100).toFixed(2)}%
                      </p>
                    </div> */}
                  </div>
                </div>
                {/* <svg className="hidden lg:block">
                  <circle cx="38" cy="38" r="36" ></circle>
                </svg> */}

                {/*  */}

                <svg
                  className="hidden lg:block"
                  width="121"
                  height="121"
                  viewBox="-15.125 -15.125 151.25 151.25"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    r="50.5"
                    cx="60.5"
                    cy="60.5"
                    fill="transparent"
                    stroke="#707070"
                    strokeWidth="16px"
                    strokeDasharray="317.14px"
                    strokeDashoffset="0"
                  />
                  <circle
                    r="50.5"
                    cx="60.5"
                    cy="60.5"
                    stroke="#fc5b3f"
                    strokeWidth="16px"
                    strokeLinecap="round"
                    strokeDashoffset="127px"
                    fill="transparent"
                    strokeDasharray="317.14px"
                  />
                </svg>

                {/*  */}
              </div>
              <div className="card-single flex-col">
                <div className="flex justify-between h-[11rem]">
                  <div>
                    <h1>₹{1000000 - balance}</h1>
                    <span>Total investment</span>
                  </div>
                  <div>
                    <span className="fas fa-shopping-bag"></span>
                  </div>
                </div>
                <svg
                  className="hidden lg:block"
                  width="147"
                  height="147"
                  viewBox="-18.375 -18.375 183.75 183.75"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    r="63.5"
                    cx="73.5"
                    cy="73.5"
                    fill="transparent"
                    stroke="#707070"
                    strokeWidth="22"
                    strokeDasharray="398.78"
                    strokeDashoffset="0"
                  />
                  <circle
                    r="63.5"
                    cx="73.5"
                    cy="73.5"
                    stroke="#fc5b3f"
                    strokeWidth="22"
                    strokeLinecap="round"
                    strokeDashoffset="279"
                    fill="transparent"
                    strokeDasharray="398.78"
                  />
                </svg>
              </div>
              <div className="card-single flex-col">
                <div className="flex justify-between h-[11rem]">
                  <div>
                    <h1>₹{balance}</h1>
                    <span>Balance Remaining</span>
                  </div>
                  <div>
                    <span className="fab fa-google-wallet"></span>
                  </div>
                </div>
                {/*  */}
                <svg
                  className="hidden lg:block"
                  width="147"
                  height="147"
                  viewBox="-18.375 -18.375 183.75 183.75"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    r="63.5"
                    cx="73.5"
                    cy="73.5"
                    fill="transparent"
                    stroke="#707070"
                    strokeWidth="22"
                    strokeDasharray="398.78"
                    strokeDashoffset="0"
                  />
                  <circle
                    r="63.5"
                    cx="73.5"
                    cy="73.5"
                    stroke="#fc5b3f"
                    strokeWidth="22"
                    strokeLinecap="round"
                    strokeDashoffset="40"
                    fill="transparent"
                    strokeDasharray="398.78"
                  />
                </svg>
                {/*  */}
              </div>
            </div>
            <div className="recent-grid">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h2 className="recent_coins_heading">Recent Orders</h2>

                    <button>
                      See all <span className="fas fa-arrow-right"></span>
                    </button>
                  </div>
                  <RenderingArrayOfObjects />
                </div>
              </div>
            </div>
          </main>
          {/* <div className="footer">
            <div className="word">
              <p>
                Made with{" "}
                <span id="hrt">
                  <i className="far fa-heart"></i>
                </span>{" "}
                | PULSE 2022
              </p>
            </div>
          </div> */}
        </div>
      </div>
      <video
        className="video-1"
        src="https://res.cloudinary.com/liquidtime/video/upload/v1655385934/abstract_fihenv.mp4"
        loop
        muted
        autoPlay
      ></video>
      <video
        className="video-2"
        src="https://res.cloudinary.com/liquidtime/video/upload/v1655385877/dark_wave_irg2pp.mp4"
        loop
        muted
        autoPlay
      ></video>
      {/* </input> */}
    </div>
  );
};

export default Dashboard;
