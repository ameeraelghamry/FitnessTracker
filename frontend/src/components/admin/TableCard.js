import {
  Card,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

const rows = [
  { name: "Esther Eden", amount: "$701", status: "Completed" },
  { name: "Ajmal Abdul Rahman", amount: "$357", status: "Pending" },
];

const TableCard = ({ title }) => {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Typography fontWeight={600} mb={2}>
        {title}
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Chip
                  label={row.status}
                  color={row.status === "Completed" ? "success" : "warning"}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TableCard;
