import React, { useEffect, useState } from "react";
import RenderHomePage from "./Components/Home/Render File/RenderHomePage";
import RenderContactUsPage from "./Components/Contact Us/Render File/RenderContactUs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RenderMarketPage from "./Components/Market/Render File/RenderMarketPage";
import MarketCoins from "./Components/Market/Code/MarketCoins";
import Coin from "./Components/Market/Code/Coin";
import axios from "axios";
import LoginForm from "./Components/Authentication/Code/Login";
import SignupForm from "./Components/Authentication/Code/SignUp";
import RenderDashboard from "./Components/Dashboard/Render File/RenderDashboard";
import CoinSell from "./Components/Market/Code/CoinSell"
const App: React.FC = () => {
  const [coins, setCoins] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false?x_cg_demo_api_key=CG-iwPtJRdKKJzS8SThBdi96jqE";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const isLoggedIn = window.localStorage.getItem("token");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RenderHomePage />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/ContactUs" element={<RenderContactUsPage />} />
          <Route path="/Markets" element={<RenderMarketPage />} />
          <Route path="/coins" element={<MarketCoins coins={coins} />} />
          <Route path="/dashboard" element={<RenderDashboard />} />
          <Route path="/coin" element={<Coin />}>
            <Route path=":coinId" element={<Coin />} />
          </Route>
          <Route
            path="/userDetails"
            element={isLoggedIn !== null ? <RenderDashboard /> : <LoginForm />}
          />
          <Route
            path="/dashboard/sell/:coinId"
            element={
              <>
                <CoinSell />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
