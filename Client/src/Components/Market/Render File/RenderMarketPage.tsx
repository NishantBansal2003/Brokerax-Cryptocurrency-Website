import React, { useEffect, useState } from "react";
import MarketGraph from "../Code/MarketGraph";
import MarketCoins from "../Code/MarketCoins";
import Header from "../../Header/Code/header";
import Footer from "../../Footer/Code/Footer";
import axios from "axios";
import Loading from "../../Loading/Loading";
const RenderMarketPage: React.FC = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [loadCoin, setLoadCoin] = useState(0);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false?x_cg_demo_api_key=CG-iwPtJRdKKJzS8SThBdi96jqE";

  useEffect(() => {
    axios
      .get(url)
      .then((response: { data: any }) => {
        setCoins(response.data);
        console.log("Markets");
        console.log(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.log("Wait Loding Coins...");
        console.log(error);
        setLoadCoin(loadCoin + 1);
      });
  }, [loadCoin]);
  if (isLoading) return <Loading />;
  return (
    <div>
      <Header />
      <MarketGraph />
      <MarketCoins coins={coins} />
      <Footer />
    </div>
  );
};

export default RenderMarketPage;
