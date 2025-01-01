"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Alice",
      avatar: "👩",
      content: "Watch out for the fake SOL staking site solana-stake.com",
      timestamp: "2m ago",
    },
    {
      id: 2,
      author: "Bob",
      avatar: "👨",
      content:
        "I encountered a Discord scam yesterday. They were impersonating Magic Eden support.",
      timestamp: "5m ago",
    },
    {
      id: 3,
      author: "Carol",
      avatar: "👩",
      content:
        "Thanks for the warning! I almost fell for a similar scam last week.",
      timestamp: "10m ago",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // States
  const [scamReport, setScamReport] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [securityScore, setSecurityScore] = useState(0);
  const [scamNews, setScamNews] = useState([]);
  const [activeTab, setActiveTab] = useState("report");
  const [newPassword, setNewPassword] = useState({ service: "", password: "" });
  const [latestScams, setLatestScams] = useState([
    {
      date: "2024-03-21",
      type: "Phishing",
      description: "Fake Solana Airdrop",
    },
    {
      date: "2024-03-20",
      type: "Social",
      description: "Fake NFT Discord Server",
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      author: "You",
      avatar: "😊",
      content: newMessage,
      timestamp: "Just now",
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  // Add password handling function
  const handleAddPassword = (e) => {
    e.preventDefault();
    if (newPassword.service && newPassword.password) {
      setPasswords([
        ...passwords,
        {
          service: newPassword.service,
          password: newPassword.password,
          maskedPassword: "********",
        },
      ]);
      setNewPassword({ service: "", password: "" });
    }
  };

  // Report scam function
  const handleReportScam = async (e) => {
    e.preventDefault();
    if (!publicKey) return;

    try {
      // Create message to sign
      const messageBytes = new TextEncoder().encode(scamReport);
      const messageSignature = await window.solana.signMessage(
        messageBytes,
        "utf8"
      );
      console.log("Message signed:", messageSignature);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Security check function
  const checkAccountHealth = () => {
    let score = 100;
    // Basic checks
    if (passwords.length < 3) score -= 20;
    if (!publicKey) score -= 30;
    setSecurityScore(score);
  };

  useEffect(() => {
    // Fetch latest scam news (mock data)
    setScamNews([
      { title: "New Phishing Scam Alert", date: "2024-03-21" },
      { title: "Crypto Wallet Security Update", date: "2024-03-20" },
    ]);

    checkAccountHealth();
  }, [publicKey, passwords]);

  return (
    <div className="min-h-screen bg-flow relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0">
        <div className="absolute right-0 top-0 w-72 h-72 animate-blob opacity-30"></div>
        <div className="absolute left-20 top-32 w-72 h-72 animate-blob opacity-20 animation-delay-2000"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 px-6 py-4 glass-card">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center">
            <span className="text-3xl font-bold gradient-text">ByeScam</span>
          </motion.div>
          <WalletMultiButton className="btn-primary" />
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-8 space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}>
          {["report", "passwords", "security", "guides"].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#ff3366] to-[#ff6b6b] text-white shadow-lg"
                  : "glass-card hover:bg-white/80"
              }`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6">
          {activeTab === "report" && (
            <motion.section
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="glass-card p-8 rounded-2xl hover-card">
              <h2 className="text-2xl font-bold gradient-text mb-6">
                Report Scam
              </h2>
              <form onSubmit={handleReportScam} className="mb-8">
                <textarea
                  value={scamReport}
                  onChange={(e) => setScamReport(e.target.value)}
                  className="input-primary w-full p-4 rounded-lg mb-4"
                  placeholder="Describe the scam incident..."
                  rows={4}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary px-8 py-3 rounded-lg">
                  Submit Report
                </motion.button>
              </form>

              <div className="mt-8">
                <h3 className="text-xl font-bold gradient-text mb-4">
                  Latest Reported Scams
                </h3>
                <div className="grid gap-4">
                  {latestScams.map((scam, index) => (
                    <div key={index} className="glass-card p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-red-500 font-medium">
                          {scam.type}
                        </span>
                        <span className="text-gray-500">{scam.date}</span>
                      </div>
                      <p>{scam.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === "passwords" && (
            <motion.section
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold gradient-text mb-6">
                Password Manager
              </h2>

              <form
                onSubmit={handleAddPassword}
                className="glass-card p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Service Name"
                    className="input-primary p-2 rounded-lg"
                    value={newPassword.service}
                    onChange={(e) =>
                      setNewPassword({
                        ...newPassword,
                        service: e.target.value,
                      })
                    }
                  />
                  <div className="relative">
                    <input
                      type={newPassword.showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="input-primary p-2 rounded-lg w-full"
                      value={newPassword.password}
                      onChange={(e) =>
                        setNewPassword({
                          ...newPassword,
                          password: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() =>
                        setNewPassword((prev) => ({
                          ...prev,
                          showPassword: !prev.showPassword,
                        }))
                      }>
                      {newPassword.showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary px-4 py-2 rounded-lg w-full">
                  Add Password
                </motion.button>
              </form>

              <div className="grid gap-4">
                {passwords.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-4 rounded-lg hover-card">
                    <p className="font-medium">{item.service}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">
                        {item.showPassword
                          ? item.password
                          : item.maskedPassword}
                      </p>
                      <button
                        onClick={() => {
                          const newPasswords = [...passwords];
                          newPasswords[index].showPassword =
                            !newPasswords[index].showPassword;
                          setPasswords(newPasswords);
                        }}
                        className="text-sm text-blue-500">
                        {item.showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
          {activeTab === "security" && (
            <motion.section
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold gradient-text mb-6">
                Security Dashboard
              </h2>
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-lg">
                  <h3 className="text-xl mb-2">Account Health Score</h3>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff3366] to-[#ff6b6b]"
                      style={{ width: `${securityScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === "guides" && (
            <motion.section
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold gradient-text mb-6">
                Security Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-lg hover-card">
                  <h3 className="text-xl font-bold gradient-text mb-4">
                    Social Media Scams
                  </h3>
                  <p className="text-red-500 font-medium mb-4">
                    Emergency: 1-800-123-4567
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span> Never share
                      your password
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span> Enable
                      two-factor authentication
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span> Verify
                      unusual requests
                    </li>
                  </ul>
                </div>
                {/* Crypto Security */}
                <div className="glass-card p-6 rounded-lg hover-card">
                  <h3 className="text-xl font-bold gradient-text mb-4">
                    Crypto Wallet Security
                  </h3>
                  <p className="text-red-500 font-medium mb-4">
                    Support: 1-800-CRYPTO
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span> Never share
                      your seed phrase
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span> Use hardware
                      wallets
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span> Verify smart
                      contracts
                    </li>
                  </ul>
                </div>

                {/* NFT Security */}
                <div className="glass-card p-6 rounded-lg hover-card">
                  <h3 className="text-xl font-bold gradient-text mb-4">
                    NFT Trading Safety
                  </h3>
                  <p className="text-red-500 font-medium mb-4">
                    NFT Hotline: 1-800-NFT-HELP
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span> Verify
                      collection authenticity
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span> Check royalty
                      information
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span> Use trusted
                      marketplaces
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>
          )}
        </motion.div>
      </main>

      {/* Add Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#ff3366] to-[#ff6b6b] p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSidebarOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </motion.button>

      {/* Add Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 h-full w-96 bg-white/95 backdrop-blur-md shadow-lg z-50 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold gradient-text">
                  Community Chat
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="glass-card p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">{message.avatar}</span>
                    <span className="font-medium">{message.author}</span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-700 ml-8">{message.content}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share your experience..."
                  className="flex-1 input-primary p-2 rounded-lg"
                />
                <button
                  type="submit"
                  className="btn-primary px-4 py-2 rounded-lg">
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
