import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function DashboardOverview() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Funding Raised ($K)",
        data: [0, 100, 250, 400, 600, 750],
        borderColor: "#1f4d3a",
        tension: 0.4,
      },
    ],
  };

  return (
    <Card sx={{ borderRadius: 3, height: 400 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Fundraising Progress
        </Typography>

        <div style={{ height: 250 }}>
          <Line
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
