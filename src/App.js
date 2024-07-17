import "./App.css";
import { useState, useEffect } from "react";
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";

const Passengers = () => {
  const [passengerList, setPassengerList] = useState([]);
  const [passengerCount, setPassengerCount] = useState(0);
  const [controller, setController] = useState({ page: 0, rowsPerPage: 10 });

  useEffect(() => {
    const getData = async () => {
      const url = `https://api.instantwebtools.net/v1/passenger?page=${controller.page}&size=${controller.rowsPerPage}`;
      try {
        const res = await fetch(url);
        if (res.statusText === "OK") {
          const data = await res.json();
          setPassengerList(data.data);
          setPassengerCount(data.totalPassengers);
        }
      } catch (err) {
        console.log("Error while fetching: ", err);
      }
    };
    getData();
  }, [controller]);

  const handlePageChange = (event, newpage) => {
    setController({ ...controller, page: newpage });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Trips</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengerList.map((passenger) => (
            <TableRow>
              <TableCell>{passenger.name}</TableCell>
              <TableCell>{passenger.trips}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        onPageChange={handlePageChange}
        page={controller.page}
        count={passengerCount}
        rowsPerPage={controller.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

function App() {
  return <Passengers />;
}

export default App;
