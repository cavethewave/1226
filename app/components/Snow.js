"use client";

import { useEffect, useState } from "react";
import styles from "./Snow.module.css";

export default function Snow() {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        // Generate snowflakes only on client side to avoid hydration mismatch
        const count = 50;
        const flakes = Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100 + "vw",
            animationDuration: Math.random() * 3 + 2 + "s", // 2-5s
            animationDelay: Math.random() * 5 + "s",
            size: Math.random() * 5 + 5 + "px", // 5-10px
            opacity: Math.random() * 0.5 + 0.3,
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className={styles.snowContainer} aria-hidden="true">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className={styles.snowflake}
                    style={{
                        left: flake.left,
                        width: flake.size,
                        height: flake.size,
                        animationDuration: flake.animationDuration,
                        animationDelay: flake.animationDelay,
                        opacity: flake.opacity,
                    }}
                />
            ))}
        </div>
    );
}
