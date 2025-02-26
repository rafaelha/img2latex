"use client";

import React from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import Latex from "react-latex-next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useIsMobile } from "./utils/useIsMobile";

export default function LandingPage() {
  const isMobile = useIsMobile();

  const features = [
    {
      title: "Instant Conversion",
      description:
        "Upload an image of a LaTeX equation and get the code instantly",
      icon: "⚡",
    },
    {
      title: "High Accuracy",
      description:
        "Powered by advanced AI to ensure precise LaTeX code generation",
      icon: "🎯",
    },
    {
      title: "Easy to Use",
      description:
        "Simple drag & drop or paste interface for quick conversions",
      icon: "🖱️",
    },
    {
      title: "Completely Free",
      description:
        "No subscriptions, no limits - convert as many equations as you need",
      icon: "🆓",
    },
  ];

  const examples = [
    {
      equation:
        "$$\\frac{\\partial^2 f}{\\partial x^2} = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n!} \\int_{0}^{\\infty} e^{-t} t^n dt \\cdot \\nabla^2 f$$",
      description: "Complex partial differential equation",
    },
    {
      equation:
        "$$\\begin{array}{|c|c|c|} \\hline x & x^2 & \\sqrt{x} \\\\ \\hline 1 & 1 & 1 \\\\ \\hline 2 & 4 & 1.414 \\\\ \\hline 3 & 9 & 1.732 \\\\ \\hline 4 & 16 & 2 \\\\ \\hline \\end{array}$$",
      description: "Mathematical table with values",
    },
    {
      equation:
        "$$\\begin{align} E[X] &= \\sum_{i} x_i p_i \\\\ Var[X] &= E[(X - E[X])^2] \\\\ &= \\sum_{i} (x_i - E[X])^2 p_i \\\\ &= E[X^2] - E[X]^2 \\end{align}$$",
      description: "Multiline expectation and variance formulas",
    },
  ];

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    fontWeight: 700,
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  Image to{" "}
                  <span
                    className="latex-logo"
                    style={{ display: "inline-block" }}
                  >
                    <Latex>{"$\\LaTeX$"}</Latex>
                  </span>{" "}
                  Converter
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    fontWeight: 400,
                    mb: 4,
                    opacity: 0.9,
                  }}
                >
                  Transform equation images into editable LaTeX code in seconds
                </Typography>
                <Link href="/convert" passHref>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "white",
                      color: "#764ba2",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    Try It Now
                  </Button>
                </Link>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "500px",
                    height: { xs: "300px", md: "400px" },
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px",
                      boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "28px",
                        marginBottom: "30px",
                        width: "100%",
                        textAlign: "center",
                        color: "#000000",
                      }}
                    >
                      <Latex>
                        {"$$\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)$$"}
                      </Latex>
                    </div>
                    <div
                      style={{
                        background: "#f5f5f5",
                        padding: "15px",
                        borderRadius: "8px",
                        width: "100%",
                        maxWidth: "400px",
                        fontFamily: "monospace",
                        fontSize: "14px",
                        color: "#333",
                        overflowX: "auto",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <code>{"\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)"}</code>
                    </div>
                  </div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 700,
            mb: 6,
            color: "var(--primary-text)",
          }}
        >
          How It Works
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: "12px",
                  border: "1px solid #eaeaea",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    fontSize: "3rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  📷
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  1. Upload Image
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Drag & drop your equation image or paste directly from
                  clipboard
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: "12px",
                  border: "1px solid #eaeaea",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    fontSize: "3rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  🤖
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  2. AI Processing
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our advanced AI analyzes the image and extracts the
                  mathematical notation
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: "12px",
                  border: "1px solid #eaeaea",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    fontSize: "3rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  📋
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  3. Get LaTeX Code
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Copy the generated LaTeX code and use it in your documents
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: "#f9f9f9", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 6,
              color: "#000000",
            }}
          >
            Features
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: "12px",
                      border: "1px solid #eaeaea",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        fontSize: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50px",
                        height: "50px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(118, 75, 162, 0.1)",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Examples Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 700,
            mb: 2,
            color: "var(--primary-text)",
          }}
        >
          Example Equations
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{
            mb: 6,
            maxWidth: "700px",
            mx: "auto",
            color: "var(--primary-text)",
          }}
        >
          Our tool can handle a wide range of mathematical expressions, from
          simple equations to complex formulas
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {examples.map((example, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: "12px",
                    border: "1px solid #eaeaea",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      mb: 3,
                      minHeight: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#000000",
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      <Latex>{example.equation}</Latex>
                    </div>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {example.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 3,
              }}
            >
              Ready to Convert Your Equations?
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, opacity: 0.9, maxWidth: "700px", mx: "auto" }}
            >
              Start using our free Image to LaTeX converter now and save hours
              of manual typing
            </Typography>
            <Link href="/convert" passHref>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "white",
                  color: "#764ba2",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                Try It Now
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Box>

      <Analytics />
      <SpeedInsights />
    </Box>
  );
}
