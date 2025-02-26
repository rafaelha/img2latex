"use client";

import React from "react";
import { Box, Typography, Container, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function About() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Header Section */}
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
              About
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                fontWeight: 400,
                mb: 4,
                opacity: 0.9,
                maxWidth: "700px",
                mx: "auto",
              }}
            >
              The Image to LaTeX Converter
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: "12px",
              border: "1px solid #eaeaea",
              textAlign: "center",
              mb: 6,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                fontWeight: 600,
                color: "#764ba2",
              }}
            >
              Made with ❤️ by Rafael Haenel
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: "text.secondary",
              }}
            >
              Vancouver, BC
            </Typography>

            <Divider sx={{ width: "60px", mx: "auto", mb: 4 }} />

            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color: "text.secondary",
              }}
            >
              Transforming equations into code, one image at a time.
            </Typography>
          </Paper>
        </motion.div>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/" passHref>
              <Typography
                component="span"
                sx={{
                  display: "inline-block",
                  color: "#764ba2",
                  fontWeight: 500,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                ← Back to Home
              </Typography>
            </Link>
          </motion.div>
        </Box>
      </Container>

      <Analytics />
      <SpeedInsights />
    </Box>
  );
}
