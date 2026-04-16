import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
{test:1, score:60},
{test:2, score:70},
{test:3, score:80},
{test:4, score:85},
];

export default function ProgressChart(){

return(

<LineChart width={600} height={300} data={data}>

<XAxis dataKey="test"/>
<YAxis/>
<Tooltip/>

<Line type="monotone" dataKey="score"/>

</LineChart>

);

}