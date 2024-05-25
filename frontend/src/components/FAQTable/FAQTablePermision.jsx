import React, { useEffect } from "react";

import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Alert from "@mui/joy/Alert";

import Launch from "@mui/icons-material/Launch";

import "./FAQTablePermision.scss";

export default function FAQTablePermision() {
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     console.log("resizing");
  //   });
  // }, []);

  return (
    <Table
      sx={{
        margin: "2em 0 1.25em 0",
        fontSize: {
          xs: "xs",
          sm: "sm",
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
          <td>Cerere</td>
          <td>
            <Typography>
              cererea poate fi descărcată de{" "}
              <Link
                href="https://igi.mai.gov.ro/wp-content/uploads/2022/11/Cerere_prel_sedere_temp_studii.pdf"
                underline="hover"
                target="_blank"
                rel="noopener"
                startDecorator={<Launch fontSize="sm" />}
              >
                aici
              </Link>
              .
            </Typography>
          </td>
        </tr>
        <tr>
          <td>Document de trecere a frontierei</td>
          <td>
            document original și copie (ex.: pașaport, titlu de călătorie, etc.)
          </td>
        </tr>
        <tr>
          <td>Scrisoare de acceptare la studii</td>
          <td>
            <List
              sx={{ fontSize: { xs: "xs", sm: "sm" }, lineHeight: "md" }}
              marker="disc"
            >
              <ListItem>
                La UVT o obțineți de la info-centru. Pentru a solicita
                adeverința scrieți la adresa{" "}
                <Link href="mailto:info@e-uvt.ro">info@e-uvt.ro</Link>
              </ListItem>
              <ListItem>
                La UPT o obțineți de la rectorat, Departamentul de Relații
                Internaționale (sala 112), solicitarea poate fi scrisă la adresa{" "}
                <Link href="mailto:romanidepretutindeni@upt.ro">
                  {window.innerWidth > 767
                    ? "romanidepretutindeni@upt.ro"
                    : "romani...@upt.ro"}
                </Link>
              </ListItem>
            </List>
            <Alert variant="soft" color="neutral" size="sm">
              <Typography>
                {" "}
                * e necesară doar la prima prelungire a dreptului de ședere
              </Typography>
            </Alert>
          </td>
        </tr>
        <tr>
          <td>Adeverința de studiu</td>
          <td>
            Adeverință eliberată de instituția de învățământ prin care se face
            dovadă că sunteți înscriși la studii
          </td>
        </tr>
        <tr>
          <td>Dovadă a deținerii legale a spațiului de locuit</td>
          <td>
            În cazul cazării în cămin contractul de cazare trebuie semnat la
            administrator.
          </td>
        </tr>
        <tr>
          <td>Adeverință medicală</td>
          <td>Se obține de la policlinica studențeasca.</td>
        </tr>
        <tr>
          <td>Taxe</td>
          <td>
            Numai în cazul persoanelor admise la <b>contract</b>.
          </td>
        </tr>
        <tr>
          <td>Dovadă a mijloacelor de întreținere</td>
          <td>
            Mijloacele de întreținere în cuantum de cel puțin salariul de bază
            minim brut pe țară garantat în plată pentru o perioadă de cel puțin
            6 luni (numai în cazul celor admiși la <b>contract</b>, acesta fiind
            achitat în <b>valută</b>);
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
