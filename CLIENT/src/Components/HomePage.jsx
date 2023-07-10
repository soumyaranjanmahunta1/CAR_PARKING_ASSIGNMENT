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

export default function HomePage() {
  const [availability, setAvailability] = useState([]);
  const URL = "https://parkingwebsite.onrender.com";
  useEffect(() => {
    axios
      .get(`${URL}/parkingPlace`)
      .then((response) => {
        setAvailability(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [availability]);
  return (
    <Box sx={{ marginTop: "10px", padding: "25px", backgroundImage: "" }}>
      
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="simple table"
        >
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
                Duration(HR)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ background: `url()` }}>
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
                    {el.parkingPlace}
                  </TableCell>
                  <TableCell align="right">{el.slots}</TableCell>
                  <TableCell align="right">{el.vehicleType}</TableCell>
                  <TableCell align="right">{el.price}</TableCell>
                  <TableCell align="right">{el.duration}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{textAlign:"center",marginTop:"-10px"}}>
        <img
          src="https://parkit.se/wp-content/uploads/park-it-paid-parking.gif"
          alt=""
          style={{width:"50%"}}
        />
      </Box>
    </Box>
  );
}
