import { perDayData } from "@/lib/Charts/chartHelpers";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SevPerDay({ records }) {
  const data = useMemo(()=>perDayData(records),[records]);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            label={{ value: "Time", position: "insideBottom", offset: -3 }}
          />

          <YAxis
            dataKey="severity"
            domain={[1, 5]}
            label={{ value: "Severity", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="severity"
            name="Severity over a day"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
