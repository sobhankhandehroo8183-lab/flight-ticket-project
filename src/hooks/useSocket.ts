"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { WS_URL } from "@/utils/constants";

export const useSocket = (eventName?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);

  const connect = useCallback(() => {
    if (!socketRef.current) {
      socketRef.current = io(WS_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on("connect", () => {
        console.log("WebSocket connected");
        setIsConnected(true);
      });

      socketRef.current.on("disconnect", () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
      });

      if (eventName) {
        socketRef.current.on(eventName, (data) => {
          setLastMessage(data);
        });
      }
    }
  }, [eventName]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const sendMessage = useCallback(
    (event: string, data: any) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit(event, data);
      } else {
        console.warn("Socket not connected");
      }
    },
    [isConnected]
  );

  const subscribe = useCallback(
    (event: string, callback: (data: any) => void) => {
      if (socketRef.current) {
        socketRef.current.on(event, callback);
      }
    },
    []
  );

  const unsubscribe = useCallback(
    (event: string) => {
      if (socketRef.current) {
        socketRef.current.off(event);
      }
    },
    []
  );

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    sendMessage,
    subscribe,
    unsubscribe,
    lastMessage,
    connect,
    disconnect,
  };
}; 
