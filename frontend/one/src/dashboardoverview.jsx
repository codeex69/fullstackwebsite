import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart, Legend
} from "recharts";

const data = [
  { value: 30 }, { value: 50 }, { value: 40 },
  { value: 60 }, { value: 45 }, { value: 70}
];
const monthlyData = {
  2024: [
    { month: "Jan", value: 55 }, { month: "Feb", value: 80 },
    { month: "Mar", value: 35 }, { month: "Apr", value: 65 },
    { month: "May", value: 95 }, { month: "Jun", value: 50 },
    { month: "Jul", value: 70 }, { month: "Aug", value: 88 },
  ],
  2023: [
    { month: "Jan", value: 45 }, { month: "Feb", value: 65 },
    { month: "Mar", value: 30 }, { month: "Apr", value: 55 },
    { month: "May", value: 80 }, { month: "Jun", value: 42 },
    { month: "Jul", value: 60 }, { month: "Aug", value: 72 },
  ],
  2022: [
    { month: "Jan", value: 30 }, { month: "Feb", value: 50 },
    { month: "Mar", value: 22 }, { month: "Apr", value: 40 },
    { month: "May", value: 60 }, { month: "Jun", value: 35 },
    { month: "Jul", value: 48 }, { month: "Aug", value: 55 },
  ],
};

const growthData = {
  Week: [
    { t: "Mon", v: 18 }, { t: "Tue", v: 32 }, { t: "Wed", v: 28 },
    { t: "Thu", v: 45 }, { t: "Fri", v: 40 }, { t: "Sat", v: 55 },
    { t: "Sun", v: 60 }, { t: "Mon", v: 58 }, { t: "Tue", v: 72 },
    { t: "Wed", v: 68 }, { t: "Thu", v: 75 },
  ],
  Month: [
    { t: "W1", v: 20 }, { t: "W2", v: 35 }, { t: "W3", v: 50 },
    { t: "W4", v: 65 }, { t: "W5", v: 80 },
  ],
  Year: [
    { t: "Jan", v: 10 }, { t: "Feb", v: 20 }, { t: "Mar", v: 35 },
    { t: "Apr", v: 45 }, { t: "May", v: 60 }, { t: "Jun", v: 55 },
    { t: "Jul", v: 70 }, { t: "Aug", v: 85 }, { t: "Sep", v: 78 },
    { t: "Oct", v: 90 }, { t: "Nov", v: 95 }, { t: "Dec", v: 100 },
  ],
};

const deviceData = {
  "This Month": Array.from({ length: 10 }, (_, i) => ({
    t: i + 1, desktop: 20 + i * 4, mobile: 35 + i * 5,
  })),
  "Last Month": Array.from({ length: 10 }, (_, i) => ({
    t: i + 1, desktop: 15 + i * 3.5, mobile: 28 + i * 4.5,
  })),
  YTD: Array.from({ length: 10 }, (_, i) => ({
    t: i + 1, desktop: 10 + i * 5, mobile: 25 + i * 6,
  })),
};

function TabGroup({ options, active, setActive }) {
  return (
    <div className="flex gap-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setActive(opt)}
          className={`px-3 py-1 rounded-md text-xs font-mono border-0 cursor-pointer transition-all duration-200 ${
            active === opt
              ? "bg-emerald-950 text-teal-400 outline outline-1 outline-teal-500/30"
              : "bg-transparent text-slate-500 hover:text-slate-400"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

const CustomBar = (props) => {
  const { x, y, width, height, index:barIndex } = props;
  const id = `barGrad${barIndex}`;
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect
        x={x + 2} y={y} width={width - 4} height={height}
        rx={4} fill={"url(#"+id+" )"} opacity={0.9}
      />
    </g>
  );
};

function GeoBar({ region, value, gradId, colors }) {
  const maxH = 200;
  const h = (value / 100) * maxH;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="36" height={maxH}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        <rect x={2} y={maxH - h} width={32} height={h} rx={6} fill={`url(#${gradId})`} opacity={0.9} />
      </svg>
      <span className="text-slate-500 text-xs font-mono">{region}</span>
    </div>
  );
}

const tooltipStyle = {
  contentStyle: {
    background: "#1e293b", border: "none",
    borderRadius: 8, color: "#e2e8f0", fontSize: 11,
  },
};

export default function dashboardoverview(){
  const [monthYear, setMonthYear] = useState("2024");
  const [growthTab, setGrowthTab] = useState("Week");
  const [geoTab, setGeoTab] = useState("Global");
  const [deviceTab, setDeviceTab] = useState("This Month");

    return(
      <>
      <div className="bg-slate-900 min-h-screen ">
      <div className="text-teal-500 text-3xl font-bold ml-200">Dashboard overview
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4  p-4  mt-15">
  <div className="bg-gray-800 rounded-lg p-4 w-50 h-40 ml-10">
    <h3 className="text-gray-400 text-sm">Total Revenue</h3>
    <p className="text-white text-2xl font-bold">$42,847</p>
    <ResponsiveContainer width="100%" height={40} className={"mt-10"}>
    <LineChart data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke="#00ff88"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
  </div>

  <div className="bg-gray-800 rounded-lg p-4 w-50 ">
    <h3 className="text-gray-400 text-sm">Active Users</h3>
    <p className="text-white text-2xl font-bold">18.5K</p>
    <ResponsiveContainer width="100%" height={40} className={"mt-10"}>
    <LineChart data={[
  { value: 70 }, { value: 50 }, { value: 40 },
  { value: 60 }, { value: 45 }, { value: 30}
]}>
      <Line
        type="monotone"
        dataKey="value"
        stroke="#ef4444"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
  </div>


  <div className="bg-gray-800 rounded-lg p-4 w-50">
    <h3 className="text-gray-400 text-sm">Conversion Rate</h3>
    <p className="text-white text-2xl font-bold">94.3%</p>
    <ResponsiveContainer width="100%" height={40} className={"mt-10"}>
    <LineChart data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke="#00ff88"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
  </div>

  <div className="bg-gray-800 rounded-lg p-4 w-50 ml-4">
    <h3 className="text-gray-400 text-sm">Performance Score</h3>
    <p className="text-white text-2xl font-bold">7,392</p>
    <ResponsiveContainer width="100%" height={40} className={"mt-10"}>
    <LineChart data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke="#00ff88"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
  </div>
</div>
<h1 className="text-teal-500 text-3xl mt-100 ml-200 font-bold">Advanced Analytics</h1>
<div className="grid grid-cols-5 p-4 mt-15 ">
<div className="bg-gray-800 rounded-lg w-60 p-5">
  <p className=" text-2xl font-bold text-center text-teal-500">2.4m</p>
<p className="text-gray-400 text-center">page views</p>
</div>

<div className="bg-gray-800 rounded-lg w-60 p-5">
  <p className=" text-2xl font-bold text-center text-teal-500">156k</p>
<p className="text-gray-400 text-center">unique visitor</p>
</div>
<div className="bg-gray-800 rounded-lg w-60 p-5">
  <p className=" text-2xl font-bold text-center text-teal-500">68%</p>
<p className="text-gray-400 text-center ">return rate</p>
</div>
<div className="bg-gray-800 rounded-lg w-60 p-5">
  <p className=" text-2xl font-bold text-center text-teal-500">4.2min</p>
<p className="text-gray-400  text-center">avg session</p>
</div>
<div className="bg-gray-800 rounded-lg w-60 p-5">
  <p className=" text-2xl font-bold text-center text-teal-500">3.2k</p>
<p className="text-gray-400 text-center ">daily active</p>
</div>

</div>
  <div className="grid grid-cols-2 gap-4">

      {/* Monthly Trends */}
      <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-200 text-sm font-semibold font-mono flex items-center gap-2">
            ☑ Monthly Trends
          </span>
          <TabGroup options={["2024", "2023", "2022"]} active={monthYear} setActive={setMonthYear} />
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData[monthYear]} barSize={28}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 11 }} />
            <YAxis hide />
            <Tooltip {...tooltipStyle} cursor={{ fill: "#ffffff08" }} />
            <Bar dataKey="value" shape={<CustomBar />} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Analytics */}
      <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-200 text-sm font-semibold font-mono flex items-center gap-2">
            📊 Growth Analytics
          </span>
          <TabGroup options={["Week", "Month", "Year"]} active={growthTab} setActive={setGrowthTab} />
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={growthData[growthTab]}>
            <defs>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 11 }} />
            <YAxis hide />
            <Tooltip {...tooltipStyle} cursor={{ stroke: "#2dd4bf33" }} />
            <Area
              type="monotone" dataKey="v" stroke="#2dd4bf" strokeWidth={2}
              fill="url(#growthFill)"
              dot={{ r: 3, fill: "#2dd4bf", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#2dd4bf" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-200 text-sm font-semibold font-mono flex items-center gap-2">
            🌐 Geographic Distribution
          </span>
          <TabGroup options={["Global", "US", "EU"]} active={geoTab} setActive={setGeoTab} />
        </div>
        <div className="flex justify-around items-end py-3">
          <GeoBar region="USA"   value={85} gradId="geo1" colors={["#f87171", "#fb923c"]} />
          <GeoBar region="EU"    value={60} gradId="geo2" colors={["#2dd4bf", "#34d399"]} />
          <GeoBar region="Asia"  value={42} gradId="geo3" colors={["#a3e635", "#2dd4bf"]} />
          <GeoBar region="Other" value={22} gradId="geo4" colors={["#e879f9", "#f472b6"]} />
        </div>
      </div>

      {/* Device Analytics */}
      <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-200 text-sm font-semibold font-mono flex items-center gap-2">
            📱 Device Analytics
          </span>
          <TabGroup options={["This Month", "Last Month", "YTD"]} active={deviceTab} setActive={setDeviceTab} />
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={deviceData[deviceTab]}>
            <XAxis hide />
            <YAxis hide />
            <Tooltip {...tooltipStyle} cursor={{ stroke: "#ffffff11" }} />
            <Legend
              verticalAlign="top" align="left" iconType="circle" iconSize={8}
              wrapperStyle={{ fontSize: 11, color: "#94a3b8", paddingBottom: 8 }}
            />
            <Line
              type="monotone" dataKey="desktop" stroke="#2dd4bf" strokeWidth={2}
              dot={{ r: 3, fill: "#2dd4bf", strokeWidth: 0 }}
              activeDot={{ r: 5 }} name="Desktop"
            />
            <Line
              type="monotone" dataKey="mobile" stroke="#f87171" strokeWidth={2}
              dot={{ r: 3, fill: "#f87171", strokeWidth: 0 }}
              activeDot={{ r: 5 }} name="Mobile"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
</div>
</div>

      </>  
    );
}