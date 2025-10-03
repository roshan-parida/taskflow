const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
dotenv.config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const { errorHandler } = require("./middleware/errorHandler");
const { apiLimiter, authLimiter } = require("./middleware/rateLimit");

const app = express();

app.use(
	helmet({
		crossOriginResourcePolicy: { policy: "cross-origin" },
	})
);

app.use(compression());

// CORS configuration
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
app.use("/api/auth/", authLimiter);
app.use("/api/", apiLimiter);

// Health check
app.get("/health", (req, res) => {
	res.status(200).json({
		status: "OK",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

app.get("/", (req, res) => {
	res.json({ message: "TaskFlow API is running!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// 404 handler
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// MongoDB connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("MongoDB connected");
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err.message);
		process.exit(1);
	});

// Graceful shutdown
process.on("SIGTERM", () => {
	console.log("SIGTERM received");
	mongoose.connection.close(() => {
		console.log("MongoDB connection closed");
		process.exit(0);
	});
});
