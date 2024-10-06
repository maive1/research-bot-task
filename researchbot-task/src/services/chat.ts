const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SendMessageRequest {
  chatId: string;
  message: string;
}

export const startChatSession = async () => {
  const response = await fetch(`${API_BASE_URL}/start-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to start chat session");
  }
  const res = await response.json();
  return res;
};

export const sendMessage = async ({ chatId, message }: SendMessageRequest) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/sendmessage/${chatId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to send message");
  }
  const res = await response.json();
  return res;
};
