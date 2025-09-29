const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 1500;
const URL = process.env.URL || "http://localhost:1500";

const db = require("./config/Dbconnection");
const client = require("./routes/client/ClientRoute");
const admin = require("./routes/admin/AdminRoute");

// Stripe import
const Stripe = require("stripe");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

app.use("/", client);
app.use("/", admin);

// 🔹 Stripe Checkout Route
app.post("/create-checkout-session", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { name, email, phone, zipcode, state } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const amount = 539900;

    // Save order in DB
    const query = `INSERT INTO orders (name, email, phone, zipcode, state, amount)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, email, phone, zipcode, state, amount], (err, result) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      console.log("Order saved with ID:", result.insertId);
    });

    // Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "LMS Course" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/course",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});




// ✅ MySQL connection aur Server start
db.connect((err) => {
  if (err) {
    console.log("Database connection failed", err);
  } else {
    console.log("Connected to MySQL Database");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on : ${URL}`);
    });
  }
});
