import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
export default function Fundraising() {
  return (
    <Box>
      {/* PAGE TITLE */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Fundraising Tracker
      </Typography>

      {/* METRIC CARDS */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="body2">Target Amount</Typography>
              <Typography variant="h4" fontWeight="bold">
                2.0M
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Seed Round
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="body2">Amount Raised</Typography>
              <Typography variant="h4" fontWeight="bold">
                0.8M
              </Typography>
              <Typography variant="body2" color="text.secondary">
                37.5% of target
              </Typography>
              <Chip label="+37.5%" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="body2">Active Investors</Typography>
              <Typography variant="h4" fontWeight="bold">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In pipeline
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FUNDING ROUNDS TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Funding Rounds
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Round</b>
                </TableCell>
                <TableCell>
                  <b>Amount</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Target Date</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>Pre-Seed</TableCell>
                <TableCell>$0.5M</TableCell>
                <TableCell>
                  <Chip label="Completed" color="success" size="small" />
                </TableCell>
                <TableCell>Jan 15, 2026</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Seed</TableCell>
                <TableCell>$2.0M</TableCell>
                <TableCell>
                  <Chip label="In Progress" color="warning" size="small" />
                </TableCell>
                <TableCell>Jun 30, 2026</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Series A</TableCell>
                <TableCell>$5.0M</TableCell>
                <TableCell>
                  <Chip label="Planned" size="small" />
                </TableCell>
                <TableCell>Mar 15, 2027</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
