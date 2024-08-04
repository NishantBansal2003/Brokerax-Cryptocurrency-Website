import React from "react";

import "../Style/CoinItem.css";

const CoinItem = (props: {
  coins: {
    current_price:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined;
    market_cap_rank:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined;
    image: string | undefined;
    symbol: string;
    price_change_percentage_24h: number;
    total_volume: {
      toLocaleString: () =>
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | null
        | undefined;
    };
    market_cap: {
      toLocaleString: () =>
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | null
        | undefined;
    };
  };
}) => {
  return (
    <div className="coin-row">
      <p>{props.coins.market_cap_rank}</p>
      <div className="img-symbol">
        <img src={props.coins.image} alt="" />
        <p>{props.coins.symbol.toUpperCase()}</p>
      </div>
      <p>₹{props.coins.current_price}</p>
      {props.coins.price_change_percentage_24h < 0 ? (
        <p className="text-red-500">
          {props.coins.price_change_percentage_24h.toFixed(2)}%
        </p>
      ) : (
        <p className="text-green-500">
          {props.coins.price_change_percentage_24h.toFixed(2)}%
        </p>
      )}
      <p className="hide-mobile hidden md:block">
        ₹{props.coins.total_volume.toLocaleString()}
      </p>
      <p className="hide-mobile hidden md:block">₹{props.coins.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinItem;
