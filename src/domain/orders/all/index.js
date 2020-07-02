import React from "react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
  TableDataCell,
} from "../../../components/table"
import { Text, Box, Link } from "rebass"
import styled from "@emotion/styled"
import Badge from "../../../components/badge"

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  // This pseudo element will make the entire table row clickable
  // This is required to prevent ReactDOM warnings for the table
  &:before {
    margin-top: -13px;
    content: "";
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 52px;
  }
`

const OrderNumCell = styled(Text)`
  color: #006fbb;

  &:hover {
    text-decoration: underline;
  }
`

const AllProducts = ({}) => {
  return (
    <>
      <Text mb={4}>Orders</Text>
      <Table>
        <TableHead>
          <TableRow
            p={0}
            sx={{
              background: "white",
            }}
          >
            <TableHeaderCell>Order</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Payment</TableHeaderCell>
            <TableHeaderCell>Fulfillment</TableHeaderCell>
            <TableHeaderCell>Items</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(40)
            .fill()
            .map((el, i) => (
              <TableRow key={i}>
                <TableDataCell>
                  <StyledLink href={`/a/orders/42`}>
                    <OrderNumCell>#123456789</OrderNumCell>
                  </StyledLink>
                </TableDataCell>
                <TableDataCell>{new Date().toDateString()}</TableDataCell>
                <TableDataCell>oliver@mrbltech.com</TableDataCell>
                <TableDataCell>
                  <Box>
                    <Badge color="#4f566b" bg="#e3e8ee">
                      Awaiting
                    </Badge>
                  </Box>
                </TableDataCell>
                <TableDataCell>
                  <Box>
                    <Badge color="#4f566b" bg="#e3e8ee">
                      Not fulfilled
                    </Badge>
                  </Box>
                </TableDataCell>
                <TableDataCell>5</TableDataCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default AllProducts