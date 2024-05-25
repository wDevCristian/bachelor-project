import React from "react";

import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";

import Launch from "@mui/icons-material/Launch";

import "./FAQTableIdentityCard.scss";

export default function FAQTableIdentityCard() {
  return (
    <Table
      sx={{
        margin: "2em 0 1.25em 0",
        fontSize: {
          xs: "xs",
          sm: "md",
        },
      }}
      variant="outlined"
      borderAxis="bothBetween"
      color="neutral"
    >
      <thead>
        <tr>
          <th colSpan={2} style={{ textAlign: "center" }}>
            <Typography fontSize={"lg"}>Acte necesare</Typography>
          </th>
        </tr>
        <tr>
          <th style={{ borderLeft: "none" }}>Acte</th>
          <th style={{ border: "" }}>Notă</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {" "}
            Cerere pentru eliberarea actului de identitate cetățenilor români cu
            domiciliu în străinătate
          </td>
          <td>
            <List
              size="sm"
              marker="disc"
              sx={{
                fontSize: { xs: "xs", sm: "md" },
                lineHeight: { xs: "sm", sm: "md" },
              }}
            >
              <ListItem>
                <Typography>
                  cererea poate fi obținută de la{" "}
                  <Link
                    href="https://www.google.com/search?client=opera-gx&hs=oM8&tbs=lf:1,lf_ui:2&tbm=lcl&sxsrf=ALiCzsayNsNNQ1fPlbeESfcFXVnoJjhwIw:1662990061009&q=centru+de+eviden%C8%9B%C4%83+a+persoanelor&rflfq=1&num=10&rldimm=241331726869695129#rlfi=hd:;si:241331726869695129;mv:[[45.75650272267618,21.240902586037727],[45.75040161932396,21.225249214226814],null,[45.7534522543735,21.23307590013227],17]"
                    underline="hover"
                    target="_blank"
                    rel="noopener"
                  >
                    <b>DIRECȚIA DE EVIDENȚĂ A PERSOANELOR TIMIȘOARA</b>
                  </Link>
                </Typography>
              </ListItem>
              <ListItem>
                dacă ești cazat la cămin este nevoie de semnătura
                administratorului.
              </ListItem>
              <ListItem>cererea se imprimă pe o foaie, față-verso.</ListItem>
            </List>
          </td>
        </tr>
        <tr>
          <td>Pașaportul românesc</td>
          <td>document original și copie</td>
        </tr>
        <tr>
          <td>Certificatul de naștere românesc</td>
          <td>document original și copie</td>
        </tr>
        <tr>
          <td>Certificatul de căsătorie</td>
          <td>prezentare după caz original și copie</td>
        </tr>
        <tr>
          <td>Două fotografii</td>
          <td>fotografii de mărimea 3x4 cm având o bandă albă de 7 mm.</td>
        </tr>
        <tr>
          <td>Documentul cu care se face dovada adresei de domiciliu</td>
          <td>contract de cazare sau chirie prezentat în original și copie</td>
        </tr>
        <tr>
          <td>
            Dovada achitării taxei reprezentând contravaloarea cărții de
            identitate
          </td>
          <td>taxa e de 1 leu și achită la locație</td>
        </tr>
      </tbody>
    </Table>
  );
}
