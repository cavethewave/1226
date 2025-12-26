"use client";

import { useState } from "react";
import styles from "./Guestbook.module.css";

export default function Guestbook() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            name: "산타",
            content: "모두 메리 크리스마스! 🎅",
            date: "2024-12-25",
        },
    ]);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) return;

        const newMessage = {
            id: Date.now(),
            name,
            content,
            date: new Date().toISOString().split("T")[0],
        };

        setMessages([newMessage, ...messages]);
        setName("");
        setContent("");
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>🎄 크리스마스 방명록</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="이름을 입력하세요 (예: 루돌프)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={20}
                    required
                />
                <textarea
                    className={styles.textarea}
                    placeholder="따뜻한 크리스마스 메시지를 남겨주세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={200}
                    required
                />
                <button type="submit" className={styles.submitButton}>
                    메시지 남기기 🎁
                </button>
            </form>

            <div className={styles.messageList}>
                {messages.length === 0 ? (
                    <p className={styles.emptyState}>첫 번째 메시지의 주인공이 되어보세요!</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className={styles.messageCard}>
                            <div className={styles.messageMeta}>
                                <span className={styles.author}>{msg.name}</span>
                                <span className={styles.date}>{msg.date}</span>
                            </div>
                            <p className={styles.messageContent}>{msg.content}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
