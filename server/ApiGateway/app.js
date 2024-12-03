import express from "express";
import httpProxy from "http-proxy";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const Port = process.env.Port;
const UserService = process.env.UserService;
const MediaService = process.env.MediaService;
const BlogService = process.env.BlogService;
const proxy = httpProxy.createProxyServer();

const whitelist = [UserService, MediaService, BlogService];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use("/users/*", (req, res) => {
  console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
  proxy.web(
    req,
    res,
    {
      target: UserService,
      changeOrigin: true,
    },
    (error) => {
      console.error("Proxy error:", error);
      res.status(500).send("Error forwarding request to users");
    }
  );
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(Port, () => {
  console.log(`http://localhost:${Port}`);
});
