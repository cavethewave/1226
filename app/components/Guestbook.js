"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./Guestbook.module.css";

export default function Guestbook() {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('guestbook')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) return;

        try {
            const { error } = await supabase
                .from('guestbook')
                .insert([
                    { name, content }
                ]);

            if (error) throw error;

            setName("");
            setContent("");
            fetchMessages(); // Refresh list
        } catch (error) {
            console.error('Error adding message:', error);
            alert('메시지 저장에 실패했습니다.');
        }
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
                {loading ? (
                    <p className={styles.emptyState}>로딩 중...</p>
                ) : messages.length === 0 ? (
                    <p className={styles.emptyState}>첫 번째 메시지의 주인공이 되어보세요!</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className={styles.messageCard}>
                            <div className={styles.messageMeta}>
                                <span className={styles.author}>{msg.name}</span>
                                <span className={styles.date}>{new Date(msg.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className={styles.messageContent}>{msg.content}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
