import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import { useLocation } from "react-router-dom";
import { buildApiUrl } from "../../config/api";

const API_BASE_URL = buildApiUrl("/chat");
const SMART_DOUBT_API_URL = buildApiUrl("/doubt/resolve");
const ASSISTANT_SECTION_LABELS = [
  "Explanation",
  "Real-life example",
  "Example",
  "Key points",
  "Key point",
  "Summary",
  "Steps",
  "Answer",
  "Conclusion",
];

const dotAnimation = {
  "@keyframes blink": {
    "0%": { opacity: 0.25, transform: "translateY(0px)" },
    "50%": { opacity: 1, transform: "translateY(-3px)" },
    "100%": { opacity: 0.25, transform: "translateY(0px)" },
  },
};

const TypingIndicator = () => (
  <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2.5 }}>
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-end", maxWidth: "80%" }}>
      <Avatar
        sx={{
          width: 38,
          height: 38,
          bgcolor: "#0f766e",
          color: "white",
          boxShadow: `0 10px 30px ${alpha("#14b8a6", 0.25)}`,
        }}
      >
        <SmartToyRoundedIcon fontSize="small" />
      </Avatar>

      <Paper
        elevation={0}
        sx={{
          px: 2.25,
          py: 1.5,
          borderRadius: "20px 20px 20px 6px",
          bgcolor: alpha("#0f172a", 0.92),
          border: `1px solid ${alpha("#67e8f9", 0.14)}`,
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          ...dotAnimation,
        }}
      >
        {[0, 1, 2].map((dot) => (
          <Box
            key={dot}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "999px",
              bgcolor: "#67e8f9",
              animation: "blink 1.2s ease-in-out infinite",
              animationDelay: `${dot * 0.18}s`,
            }}
          />
        ))}
        <Typography variant="caption" sx={{ ml: 0.5, color: "rgba(226,232,240,0.86)" }}>
          Thinking...
        </Typography>
      </Paper>
    </Box>
  </Box>
);

const formatAssistantText = (text) => {
  const sectionPattern = ASSISTANT_SECTION_LABELS.map((label) => label.replace("-", "\\-")).join("|");

  return text
    .replace(/\r\n/g, "\n")
    .replace(/([a-z0-9.)])\s+(?=\d+\.\s+[A-Z])/g, "$1\n\n")
    .replace(new RegExp(`\\s+(?=(?:${sectionPattern}):)`, "gi"), "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const AssistantMessageContent = ({ text }) => {
  const blocks = formatAssistantText(text)
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
      {blocks.map((block, index) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

        if (!lines.length) return null;

        const firstLine = lines[0];
        const remainingLines = lines.slice(1);
        const numberedHeadingMatch = firstLine.match(/^(\d+\.\s.+?[?.!])\s*(.*)$/);
        const sectionLabelMatch = firstLine.match(
          new RegExp(`^((?:${ASSISTANT_SECTION_LABELS.join("|")}):)\\s*(.*)$`, "i")
        );

        if (numberedHeadingMatch) {
          const heading = numberedHeadingMatch[1];
          const trailingBody = numberedHeadingMatch[2];
          const bodyLines = [...(trailingBody ? [trailingBody] : []), ...remainingLines];

          return (
            <Box key={`${heading}-${index}`} sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              <Typography sx={{ fontWeight: 800, color: "#f8fafc", lineHeight: 1.5 }}>
                {heading}
              </Typography>
              {bodyLines.map((line, lineIndex) => (
                <Typography
                  key={`${heading}-body-${lineIndex}`}
                  sx={{ color: "rgba(226,232,240,0.92)", lineHeight: 1.8 }}
                >
                  {line}
                </Typography>
              ))}
            </Box>
          );
        }

        if (sectionLabelMatch) {
          const label = sectionLabelMatch[1];
          const trailingBody = sectionLabelMatch[2];
          const bodyLines = [...(trailingBody ? [trailingBody] : []), ...remainingLines];

          return (
            <Box key={`${label}-${index}`} sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              <Typography sx={{ fontWeight: 700, color: "#a5f3fc", lineHeight: 1.5 }}>
                {label}
              </Typography>
              {bodyLines.map((line, lineIndex) => (
                <Typography
                  key={`${label}-body-${lineIndex}`}
                  sx={{ color: "rgba(226,232,240,0.92)", lineHeight: 1.8 }}
                >
                  {line}
                </Typography>
              ))}
            </Box>
          );
        }

        return (
          <Box key={`paragraph-${index}`} sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            {lines.map((line, lineIndex) => {
              const isBullet = /^[-*•]\s+/.test(line);

              return (
                <Typography
                  key={`line-${index}-${lineIndex}`}
                  sx={{ color: "rgba(226,232,240,0.92)", lineHeight: 1.8, pl: isBullet ? 1 : 0 }}
                >
                  {isBullet ? `• ${line.replace(/^[-*•]\s+/, "")}` : line}
                </Typography>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

const ChatBot = () => {
  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState("");

  const chatEndRef = useRef(null);
  const handledSmartDoubtRef = useRef("");

  const loadTopics = async () => {
    setSidebarLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/topics`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }});
      const data = await res.json();

      if (Array.isArray(data)) {
        setTopics(data);
      } else if (Array.isArray(data?.topics)) {
        setTopics(data.topics);
      } else {
        setTopics([]);
      }
    } catch (err) {
      console.error(err);
      setTopics([]);
      setError("Unable to load chat topics right now.");
    } finally {
      setSidebarLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  const location = useLocation();

  useEffect(() => {
    const smartDoubtPayload = location.state?.smartDoubtPayload;

    if (!smartDoubtPayload) return;

    const requestKey = JSON.stringify(smartDoubtPayload);
    if (handledSmartDoubtRef.current === requestKey) return;

    handledSmartDoubtRef.current = requestKey;

    const resolveSmartDoubt = async () => {
      const topic = smartDoubtPayload.topic || "Doubt Session";

      setActiveTopic(topic);
      setMessages([]);
      setChatLoading(true);
      setError("");

      try {
        const res = await fetch(SMART_DOUBT_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`,
          },
          body: JSON.stringify({
            videoId: smartDoubtPayload.videoId,
            currentTime: smartDoubtPayload.currentTime,
            type: "chatbot",
          }),
        });

        const data = await res.json();
        const reply = data?.reply || "I couldn't generate a response for this doubt.";
        const resolvedTopic = data?.topic || topic;

        setActiveTopic(resolvedTopic);
        const question = `Explain this part of the video:\n${smartDoubtPayload.topic}`;

     setMessages([
         {
           role: "user",
           text: question,
         },
         {
           role: "assistant",
           text: reply,
         },
        ]);

        await loadTopics();
      } catch (err) {
        console.error(err);
        setError("Could not resolve your doubt right now.");
        setMessages([
          {
            role: "assistant",
            text: "I'm having trouble reaching the smart doubt service right now. Please try again in a moment.",
          },
        ]);
      } finally {
        setChatLoading(false);
      }
    };

    resolveSmartDoubt();
  }, [location.state]);

  const loadChat = async (topic) => {
    setActiveTopic(topic);
    setMessages([]);
    setChatLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/${topic}`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }});
      const data = await res.json();

      const formatted = Array.isArray(data)
        ? data.map((message) => ({
            role: message.role,
            text: message.content,
          }))
        : [];

      setMessages(formatted);
    } catch (err) {
      console.error(err);
      setError("Could not open that conversation.");
    } finally {
      setChatLoading(false);
    }
  };

  const newChat = () => {
    setActiveTopic(null);
    setMessages([]);
    setInput("");
    setError("");
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const trimmedInput = input.trim();
    const userMessage = { role: "user", text: trimmedInput };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
       headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    },
        body: JSON.stringify({
          topic: activeTopic,
          question: trimmedInput,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data?.reply || "I couldn't generate a response for that request.",
        },
      ]);

      await loadTopics();
    } catch (err) {
      console.error(err);
      setError("The reply could not be fetched. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I'm having trouble reaching the server right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <Box
      className="min-h-screen w-full bg-slate-950 p-3 sm:p-5"
      sx={{
        background:
          "radial-gradient(circle at top left, rgba(45,212,191,0.12), transparent 34%), radial-gradient(circle at bottom right, rgba(14,165,233,0.12), transparent 28%), linear-gradient(135deg, #020617 0%, #0f172a 55%, #111827 100%)",
      }}
    >
      <Box
        className="mx-auto flex h-[calc(100vh-24px)] max-w-7xl overflow-hidden rounded-[28px] border border-white/10 backdrop-blur-xl sm:h-[calc(100vh-40px)]"
        sx={{
          bgcolor: alpha("#020617", 0.78),
          boxShadow: `0 30px 80px ${alpha("#020617", 0.55)}`,
        }}
      >
        <Box
          className="hidden w-[320px] shrink-0 flex-col border-r border-white/10 lg:flex"
          sx={{
            background: `linear-gradient(180deg, ${alpha("#0f172a", 0.96)} 0%, ${alpha(
              "#111827",
              0.9
            )} 100%)`,
          }}
        >
          <Box className="p-6">
            <Box className="flex items-center gap-3">
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: alpha("#14b8a6", 0.18),
                  color: "#5eead4",
                }}
              >
                <ForumRoundedIcon />
              </Avatar>

              <Box>
                <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#f8fafc" }}>
                  Chat Studio
                </Typography>
                <Typography sx={{ fontSize: 13, color: "rgba(226,232,240,0.72)" }}>
                  Smarter conversations, cleaner workflow.
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              startIcon={<AddRoundedIcon />}
              variant="contained"
              onClick={newChat}
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                background: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
                boxShadow: `0 16px 30px ${alpha("#0ea5e9", 0.28)}`,
              }}
            >
              Start New Chat
            </Button>

            <Box className="mt-4 flex flex-wrap gap-2">
              <Chip
                icon={<AutoAwesomeRoundedIcon />}
                label="AI Powered"
                sx={{
                  bgcolor: alpha("#14b8a6", 0.12),
                  color: "#99f6e4",
                  borderRadius: 999,
                }}
              />
              <Chip
                label={`${topics.length} topics`}
                sx={{
                  bgcolor: alpha("#38bdf8", 0.12),
                  color: "#bae6fd",
                  borderRadius: 999,
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Box className="flex-1 overflow-y-auto px-4 py-5">
            <Typography sx={{ px: 1.5, fontSize: 12, fontWeight: 700, color: "rgba(226,232,240,0.58)", letterSpacing: 1.2 }}>
              RECENT TOPICS
            </Typography>

            <Box className="mt-3 flex flex-col gap-2">
              {sidebarLoading ? (
                <Typography sx={{ px: 1.5, color: "rgba(226,232,240,0.7)" }}>
                  Loading topics...
                </Typography>
              ) : topics.length ? (
                topics.map((topic, index) => (
                  <Paper
                    key={`${topic}-${index}`}
                    elevation={0}
                    onClick={() => loadChat(topic)}
                    sx={{
                      p: 1.6,
                      borderRadius: 3,
                      cursor: "pointer",
                      color: "#e2e8f0",
                      bgcolor:
                        activeTopic === topic ? alpha("#0ea5e9", 0.2) : alpha("#ffffff", 0.03),
                      border: `1px solid ${
                        activeTopic === topic
                          ? alpha("#67e8f9", 0.35)
                          : alpha("#ffffff", 0.06)
                      }`,
                      transition: "all 0.22s ease",
                      "&:hover": {
                        bgcolor: alpha("#0ea5e9", 0.14),
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, lineHeight: 1.4 }}>{topic}</Typography>
                  </Paper>
                ))
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: alpha("#ffffff", 0.03),
                    border: `1px dashed ${alpha("#ffffff", 0.12)}`,
                    color: "rgba(226,232,240,0.74)",
                  }}
                >
                  Your saved conversations will appear here.
                </Paper>
              )}
            </Box>
          </Box>
        </Box>

        <Box className="flex min-w-0 flex-1 flex-col">
          <Box
            className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6"
            sx={{ bgcolor: alpha("#020617", 0.5) }}
          >
            <Box>
              <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#f8fafc" }}>
                {activeTopic || "New Conversation"}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "rgba(226,232,240,0.7)" }}>
                Ask questions, revisit past topics, and keep the flow going.
              </Typography>
            </Box>

            <Button
              startIcon={<AddRoundedIcon />}
              variant="outlined"
              onClick={newChat}
              sx={{
                borderRadius: 999,
                textTransform: "none",
                px: 2,
                color: "#e2e8f0",
                borderColor: alpha("#ffffff", 0.16),
              }}
            >
              New Chat
            </Button>
          </Box>

          <Box
            className="flex-1 overflow-y-auto px-4 py-5 sm:px-6"
            sx={{
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.28) 100%)",
            }}
          >
            {error ? (
              <Paper
                elevation={0}
                sx={{
                  mb: 3,
                  px: 2,
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: alpha("#ef4444", 0.12),
                  color: "#fecaca",
                  border: `1px solid ${alpha("#ef4444", 0.24)}`,
                }}
              >
                {error}
              </Paper>
            ) : null}

            {!messages.length && !chatLoading ? (
              <Box className="flex h-full items-center justify-center">
                <Paper
                  elevation={0}
                  className="w-full max-w-2xl rounded-[28px] border border-white/10 px-6 py-8 text-center"
                  sx={{
                    bgcolor: alpha("#0f172a", 0.74),
                    boxShadow: `0 30px 70px ${alpha("#020617", 0.22)}`,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      mx: "auto",
                      mb: 2,
                      bgcolor: alpha("#0ea5e9", 0.15),
                      color: "#67e8f9",
                    }}
                  >
                    <SmartToyRoundedIcon fontSize="medium" />
                  </Avatar>

                  <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#f8fafc" }}>
                    Start a sharper AI conversation
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1.5,
                      maxWidth: 520,
                      mx: "auto",
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: "rgba(226,232,240,0.72)",
                    }}
                  >
                    Ask for guidance, summaries, or solutions. Your recent topics stay organized
                    on the left, and the assistant will show a live buffering animation while a
                    reply is loading.
                  </Typography>
                </Paper>
              </Box>
            ) : (
              <>
                {chatLoading ? (
                  <Typography sx={{ color: "rgba(226,232,240,0.75)" }}>
                    Loading conversation...
                  </Typography>
                ) : null}

                {messages.map((message, index) => {
                  const isUser = message.role === "user";

                  return (
                    <Box
                      key={`${message.role}-${index}`}
                      sx={{
                        display: "flex",
                        justifyContent: isUser ? "flex-end" : "flex-start",
                        mb: 2.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          alignItems: "flex-end",
                          flexDirection: isUser ? "row-reverse" : "row",
                          maxWidth: { xs: "100%", md: "82%" },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            bgcolor: isUser ? alpha("#2563eb", 0.2) : alpha("#14b8a6", 0.18),
                            color: isUser ? "#bfdbfe" : "#99f6e4",
                          }}
                        >
                          {isUser ? "U" : <SmartToyRoundedIcon fontSize="small" />}
                        </Avatar>

                        <Paper
                          elevation={0}
                          sx={{
                            px: 2.25,
                            py: 1.6,
                            borderRadius: isUser
                              ? "20px 20px 6px 20px"
                              : "20px 20px 20px 6px",
                            bgcolor: isUser ? "#0284c7" : alpha("#0f172a", 0.92),
                            color: "#f8fafc",
                            border: `1px solid ${
                              isUser ? alpha("#7dd3fc", 0.18) : alpha("#67e8f9", 0.12)
                            }`,
                            boxShadow: `0 18px 42px ${alpha("#020617", 0.22)}`,
                            whiteSpace: "pre-wrap",
                            lineHeight: 1.7,
                            wordBreak: "break-word",
                          }}
                        >
                          {isUser ? message.text : <AssistantMessageContent text={message.text} />}
                        </Paper>
                      </Box>
                    </Box>
                  );
                })}

                {isLoading ? <TypingIndicator /> : null}
              </>
            )}

            <div ref={chatEndRef} />
          </Box>

          <Box
            className="border-t border-white/10 p-4 sm:p-5"
            sx={{ bgcolor: alpha("#020617", 0.65) }}
          >
            <Box className="mx-auto flex max-w-4xl items-end gap-3">
              <TextField
                fullWidth
                multiline
                maxRows={5}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask your question here..."
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    alignItems: "flex-end",
                    bgcolor: alpha("#0f172a", 0.92),
                    color: "#f8fafc",
                    pr: 1,
                    "& fieldset": {
                      borderColor: alpha("#ffffff", 0.1),
                    },
                    "&:hover fieldset": {
                      borderColor: alpha("#67e8f9", 0.28),
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: alpha("#22d3ee", 0.62),
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(226,232,240,0.48)",
                    opacity: 1,
                  },
                }}
              />

              <IconButton
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3.5,
                  color: "white",
                  background:
                    !input.trim() || isLoading
                      ? alpha("#334155", 0.6)
                      : "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
                  boxShadow:
                    !input.trim() || isLoading
                      ? "none"
                      : `0 18px 32px ${alpha("#0ea5e9", 0.28)}`,
                }}
              >
                <SendRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBot;
