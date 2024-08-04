import React from "react";
import CoinItem from "./CoinItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "../Style/MarketCoins.css";

const MarketCoins: React.FC<{ coins: any[] }> = (props: { coins: any[] }) => {
  return (
    <div className="container4">
      <div>
        <Link to="/">
          <div className="coin-search">
            <h1>
              <FontAwesomeIcon icon={faCoins} className="purple" /> Top
              <span className="purple"> Coins</span>
            </h1>
          </div>
        </Link>
        <div className="heading_market">
          <p>Sr. No.</p>
          <p className="coin-name">Coin</p>
          <p>Price per Coin</p>
          <p>Change in last 24 Hours</p>
          <p className="hide-mobile hidden md:block">Volume Available</p>
          <p className="hide-mobile hidden md:block">Market Capital</p>
        </div>

        {props.coins.map((coins) => {
          return (
            <Link to={`/coin/${coins.id}`} key={coins.id}>
              <CoinItem coins={coins} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MarketCoins;
