import React from "react";
import ReactDOM from "react-dom/client";
// them chakra ui vao de su dung
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ChatProvider>
      {/* su dung chakra ui: thu vien cac coponent build san */}
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </Router>
);
