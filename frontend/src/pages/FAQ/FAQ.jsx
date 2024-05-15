import React from "react";

import FAQTablePermision from "../../components/FAQTable/FAQTablePermision";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FAQTableIdentityCard from "../../components/FAQTable/FAQTableIdentityCard";

import Typography from "@mui/joy/Typography";
import Accordion, { accordionClasses } from "@mui/joy/Accordion";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import Link from "@mui/joy/Link";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import Launch from "@mui/icons-material/Launch";

import "./FAQ.scss";

export default function FAQ() {
  return (
    <>
      <section className="faq container">
        <div className="faq-content">
          <Typography level="h2">FAQ</Typography>
          <AccordionGroup
            sx={{
              marginTop: "2em",
              [`& .${accordionClasses.root}`]: {
                width: "90%",
                margin: "1em auto 0 auto",
                transition: "0.2s ease",
                '& button:not([aria-expanded="true"])': {
                  transition: "0.2s ease",
                  paddingBottom: "0.625rem",
                },
                "& button:hover": {
                  background: "transparent",
                },
              },
              [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
                bgcolor: "background.level1",
                borderRadius: "md",
                borderBottom: "1px solid",
                borderColor: "background.level2",
              },
              '& [aria-expanded="true"]': {
                boxShadow: (theme) =>
                  `inset 0 -1px 0 ${theme.vars.palette.divider}`,
              },
            }}
          >
            <Accordion>
              <AccordionSummary>
                <HelpOutlineIcon></HelpOutlineIcon>
                Cu ce transport ajung în Timișoara?
              </AccordionSummary>
              <AccordionDetails>
                Chișinău - Timișoara:
                <Link
                  href="https://lavial.ro/tours/chisinau-timisoara-transport/"
                  underline="hover"
                  target="_blank"
                  rel="noopener"
                  startDecorator={<DirectionsBusIcon />}
                >
                  Lavial
                </Link>
                <Link
                  href="https://transportromania.ro/"
                  underline="hover"
                  target="_blank"
                  rel="noopener"
                  startDecorator={<DirectionsBusIcon />}
                >
                  Niko
                </Link>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <HelpOutlineIcon />
                Care e procesul de obținere a vizei de reședință?
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Procesul de obținere a vizei este descris{" "}
                  <Link
                    href="https://drive.google.com/file/d/1dXIp2tJ3flb6ZnTnFCtWD97iZn0PD8aI/"
                    underline="hover"
                    target="_blank"
                    rel="noopener"
                    startDecorator={<Launch fontSize="sm" />}
                  >
                    aici
                  </Link>
                  .
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <HelpOutlineIcon />
                Care e procesul de obținere a permisului de ședere?
              </AccordionSummary>
              <AccordionDetails>
                <List marker="decimal">
                  <ListItem>
                    <b>PERMIS DE ȘEDERE</b> își fac doar persoanele care au
                    obținut <b>VIZA DE REȘEDINȚĂ</b>.
                  </ListItem>
                  <ListItem>
                    Dosarul pentru obținerea permisului de ședere se depune cu
                    cel puțin 30 de zile înainte de expirarea dreptului de
                    ședere acordat de viză, adică cel mult după 2 luni de ședere
                    în România.
                  </ListItem>
                  <ListItem>
                    Cei admiși la <b>BUGET</b> atât <b>CU BURSĂ</b>, cât și{" "}
                    <b>FĂRĂ BURSĂ</b> sunt scutiți de plata taxei pentru
                    perfectarea permisului de ședere și nu trebuie să facă
                    dovada mijloacelor de întreținere.
                  </ListItem>
                  <ListItem>
                    Pentru cei admiși la <b>CONTRACT</b>, există două situații
                    de achitare a <b>TAXELOR</b>:
                  </ListItem>
                  <List marker="disc">
                    <ListItem>
                      Dacă se achită <b>CONTRACTUL ÎN LEI ROMÂNEȘTI</b>, e
                      necesar de achitat contravaloarea în lei românești a taxei
                      consulare de 120 de EURO, la cursul zilei al BNR.
                    </ListItem>
                    <List marker="circle">
                      <ListItem>
                        Cei care își plătesc studiile în <b>LEI ROMÂNEȘTI</b>,{" "}
                        <u>nu trebuie</u> să facă dovada mijloacelor de
                        întreținere
                      </ListItem>
                    </List>
                    <ListItem>
                      Dacă se achită <b>CONTRACTUL ÎN VALUTĂ</b>, e necesar de
                      achitat contravaloarea în lei românești a taxei consulare
                      de 120 de EURO, la cursul zilei al BNR, și 259 de LEI
                      ROMÂNEȘTI, reprezentând contravaloarea permisului de
                      ședere.
                    </ListItem>
                    <List marker="circle">
                      <ListItem>
                        Cei care își plătesc studiile în <b>VALUTĂ</b>,{" "}
                        <u>trebuie</u> să facă dovada mijloacelor de întreținere
                      </ListItem>
                    </List>
                  </List>
                  <ListItem>
                    Posesorii permisului de ședere pot fi încadrați în câmpul
                    muncii pe teritoriul României fără aviz de angajare, numai
                    cu contract individual de muncă cu timp parțial cu durata
                    muncii de maximum 4 ore pe zi.
                  </ListItem>
                  <ListItem>
                    Cererea de acordare a dreptului de ședere se soluționează în
                    termen de 30 de zile de la data depunerii acesteia. În cazul
                    în care sunt necesare verificări suplimentare, termenul de
                    soluționare a cererii poate fi prelungit cu cel mult 15
                    zile.
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Dosarul pentru obținerea permisului de ședere se depune la
                      <b> INSPECTORATUL GENERAL PENTRU IMIGRĂRI</b> în orașul
                      reședință al județului în care se află persoana. În
                      continuare se poate de accesat link-ul pentru a afla
                      informație privind adresa și orarul de funcționare al
                      diferitor servicii oferite de Inspectorat, pentru județul
                      respectiv{" "}
                      <Link
                        href="https://portaligi.mai.gov.ro/portaligi/"
                        underline="hover"
                        target="_blank"
                        rel="noopener"
                        startDecorator={<Launch fontSize="sm" />}
                      >
                        {" "}
                        portaligi.mai.gov.ro/portaligi
                      </Link>
                      .
                    </Typography>
                  </ListItem>
                </List>
                <FAQTablePermision />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <HelpOutlineIcon />
                Care e procesul de obținere a buletinului provizoriu? (pentru
                cei cu cetățenie română).
              </AccordionSummary>
              <AccordionDetails>
                <FAQTableIdentityCard />
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </div>
      </section>
    </>
  );
}
