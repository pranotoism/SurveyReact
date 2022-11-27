import React from "react";
import Head from "next/head";
import type { NextPage } from "next";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

import { AreaChart } from "../src/Components/Chart";

const drawerWidth = 280;

const Home: NextPage = (props: { window: any }) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Typography
        variant="h6"
        noWrap
        component="div"
        padding="45px 69px 52px 68px"
        sx={{ fontSize: "29px", fontWeight: "bold", lineHeight: "39.56px" }}
      >
        SalesDash
      </Typography>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ pl: "48px", height: 56 }}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Log Out"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ pl: "48px" }}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Head>
        <title>Survey Questions</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            display: { xs: "block", sm: "none" },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#F3F4FF",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#F3F4FF",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            px: "68px",
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Grid container spacing={6}>
            <Grid item xs={12} lg={9}>
              <Box padding="45px 0 52px 0">
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "29px",
                    fontWeight: "bold",
                    lineHeight: "39.56px",
                  }}
                >
                  Dashboard
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    lineHeight: "25px",
                    color: "#7A7A7A",
                  }}
                >
                  Today's date: Sun, 10 April 2022
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {[
                  {
                    title: "Profit",
                    value: "11.500.000",
                    compare: "0.3% compared",
                  },
                  {
                    title: "Sales",
                    value: "11.500.000",
                    compare: "0.5% compared",
                  },
                  {
                    title: "Transaction",
                    value: "11.500.000",
                    compare: "same as",
                  },
                ].map((profit, index) => (
                  <Grid item key={profit.title + index} xs={12} md={4}>
                    <Card sx={{ boxShadow: "0px 0px 26px #F0F1FF" }}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {profit.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`Rp ${profit.value}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${profit.compare} to 7 days ago`}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Grid container mt={0.2} spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box>
                    <Card sx={{ boxShadow: "0px 0px 26px #F0F1FF" }}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Sales Chart
                        </Typography>
                        <AreaChart
                          testID="line-chart-expense-fuel-trend"
                          minValue={0}
                          maxValue={8000000}
                          tickAmount={4}
                          height={275}
                          chartData={[
                            {
                              name: "Fuel",
                              color: "#545DFF",
                              data: [
                                2000000,
                                3000000,
                                1500000,
                                2500000,
                                3000000,
                                3500000,
                                2000000,
                                2500000,
                              ],
                            },
                          ]}
                        />
                      </CardContent>
                    </Card>
                    <Card sx={{ mt: 3, boxShadow: "0px 0px 26px #F0F1FF" }}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Top 5 Products
                        </Typography>
                        <Grid container spacing={2}>
                          {[
                            {
                              title: "Maxim",
                              value: "150.000",
                              transaction: "120",
                            },
                            {
                              title: "Telkomsel",
                              value: "25.000",
                              transaction: "120",
                            },
                            {
                              title: "Three",
                              value: "50.000",
                              transaction: "120",
                            },
                            {
                              title: "OVO",
                              value: "150.000",
                              transaction: "120",
                            },
                            {
                              title: "PLN Postpaid",
                              value: "150.000",
                              transaction: "120",
                            },
                          ].map((profit, index) => (
                            <Grid
                              item
                              key={profit.title + index}
                              xs={12}
                              lg={2.4}
                              mt={3}
                            >
                              <Card
                                sx={{
                                  border: "3px solid #989EFF",
                                  borderRadius: 3,
                                }}
                              >
                                <CardContent
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <svg
                                    width="54"
                                    height="54"
                                    viewBox="0 0 54 54"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  >
                                    <rect
                                      width="54"
                                      height="54"
                                      fill="url(#pattern0)"
                                    />
                                    <defs>
                                      <pattern
                                        id="pattern0"
                                        patternContentUnits="objectBoundingBox"
                                        width="1"
                                        height="1"
                                      >
                                        <use
                                          xlinkHref="#image0_1_923"
                                          transform="scale(0.00333333)"
                                        />
                                      </pattern>
                                      <image
                                        id="image0_1_923"
                                        width="300"
                                        height="300"
                                        xlinkHref="data:image/png;base64,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"
                                      />
                                    </defs>
                                  </svg>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                  >
                                    {profit.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {profit.value}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {`${profit.transaction} transactions`}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ boxShadow: "0px 0px 26px #F0F1FF" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Top 5 Agents
                      </Typography>
                      <Box>
                        {[
                          {
                            title: "Anton Antoman",
                            profit: "150.000",
                            sales: "150.000",
                            transactions: "120",
                          },
                          {
                            title: "Anton Antoman",
                            profit: "150.000",
                            sales: "150.000",
                            transactions: "120",
                          },
                          {
                            title: "Anton Antoman",
                            profit: "150.000",
                            sales: "150.000",
                            transactions: "120",
                          },
                          {
                            title: "Anton Antoman",
                            profit: "150.000",
                            sales: "150.000",
                            transactions: "120",
                          },
                          {
                            title: "Anton Antoman",
                            profit: "150.000",
                            sales: "150.000",
                            transactions: "120",
                          },
                        ].map((agent, index) => (
                          <Box display="flex" alignItems="center" mt={3}>
                            Foto Agent
                            <Box ml={3}>
                              <p>{agent.title}</p>
                              <Box display="flex">
                                <Box mr={1}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Profit
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Sales
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Transaction
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {agent.profit}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {agent.sales}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >{`${agent.transactions} transactions`}</Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Box sx={{ backgroundColor: "#F3F4FF", height: "100vh" }}>
                user with dropdown and balance card with top up button
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
