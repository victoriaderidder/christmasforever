import React, { useState, useEffect } from "react";

interface Recipient {
  id: number;
  name: string;
  subject: string;
}

interface EmailResult {
  success: boolean;
  recipient: string;
  messageId?: string;
  error?: string;
}

const EmailSender: React.FC = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<EmailResult[]>([]);
  const API_URL = "http://localhost:3001/api";

  useEffect(() => {
    fetch(`${API_URL}/recipients`)
      .then((res) => res.json())
      .then((data) => setRecipients(data))
      .catch((err) => console.error("Failed to load recipients:", err));
  }, []);

  const sendEmail = async (recipientId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/send-email/${recipientId}`, {
        method: "POST",
      });
      const result = await response.json();
      setResults((prev) => [...prev, result]);
    } catch (error) {
      setResults((prev) => [
        ...prev,
        { success: false, recipient: `ID ${recipientId}`, error: String(error) },
      ]);
    }
    setLoading(false);
  };

  const sendAllEmails = async () => {
    setLoading(true);
    setResults([]);
    try {
      const response = await fetch(`${API_URL}/send-all-emails`, {
        method: "POST",
      });
      const results = await response.json();
      setResults(results);
    } catch (error) {
      setResults([
        { success: false, recipient: "All", error: String(error) },
      ]);
    }
    setLoading(false);
  };

  const containerStyle: React.CSSProperties = {
    padding: "24px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 24px",
    margin: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: loading ? "not-allowed" : "pointer",
    fontSize: "14px",
    fontWeight: 600,
    opacity: loading ? 0.6 : 1,
  };

  const sendAllButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#2196F3",
  };

  const recipientCardStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: "#f9f9f9",
  };

  const resultStyle = (success: boolean): React.CSSProperties => ({
    padding: "12px",
    margin: "8px 0",
    borderRadius: "4px",
    backgroundColor: success ? "#d4edda" : "#f8d7da",
    color: success ? "#155724" : "#721c24",
    border: `1px solid ${success ? "#c3e6cb" : "#f5c6cb"}`,
  });

  return (
    <div style={containerStyle}>
      <h2>Email Sender</h2>

      <div style={{ marginBottom: "24px" }}>
        <button
          style={sendAllButtonStyle}
          onClick={sendAllEmails}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send All Emails"}
        </button>
      </div>

      <h3>Recipients</h3>
      {recipients.map((recipient) => (
        <div key={recipient.id} style={recipientCardStyle}>
          <div style={{ marginBottom: "8px" }}>
            <strong>{recipient.name}</strong>
          </div>
          <div style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
            Subject: {recipient.subject}
          </div>
          <button
            style={buttonStyle}
            onClick={() => sendEmail(recipient.id)}
            disabled={loading}
          >
            Send Email
          </button>
        </div>
      ))}

      {results.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <h3>Results</h3>
          {results.map((result, idx) => (
            <div key={idx} style={resultStyle(result.success)}>
              <strong>{result.recipient}:</strong>{" "}
              {result.success
                ? `Email sent successfully (ID: ${result.messageId})`
                : `Failed: ${result.error}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailSender;
