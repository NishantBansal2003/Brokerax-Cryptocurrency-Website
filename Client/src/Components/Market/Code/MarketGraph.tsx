import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import "../Style/MarketGraph.css"
const Graph: React.FC = () => {
    return (
        <div className="w-[100%] h-[55vh]">
            <AdvancedRealTimeChart
                symbol="BTCUSD"
                theme="dark"
                autosize
                locale="en"
                range="12M"
            />
        </div>
    );
};
export default Graph;
