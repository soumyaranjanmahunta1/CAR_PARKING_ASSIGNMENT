import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Home() {
  const [availability, setAvailability] = useState([]);
  const URL = "http://localhost:8000";
  useEffect(() => {
    axios
      .get(`${URL}/bookslot`)
      .then((response) => {
        setAvailability(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [availability]);

  const deleteData = async(id) => {
   await axios
      .delete(`${URL}/delete/${id}`)
      .then((response) => {
      
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <Box sx={{ marginTop: "60px", padding: "25px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#2874F0" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "700" }}>
                Place
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "700" }}
                align="right"
              >
                Slots
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "700" }}
                align="right"
              >
                VehicleType
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "700" }}
                align="right"
              >
                Price
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "700" }}
                align="right"
              >
                Duration
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "700" }}
                align="right"
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availability.map((el) => {
              return (
                <TableRow
                  key={el._id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {el.place}
                  </TableCell>
                  <TableCell align="right">{el.slots}</TableCell>
                  <TableCell align="right">{el.vehicleType}</TableCell>
                  <TableCell align="right">{el.price}</TableCell>
                  <TableCell align="right">{el.duration}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon
                      onClick={() => deleteData(el._id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
