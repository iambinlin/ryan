import { useEffect, useState } from "react";
import type { FC } from "react";
import { setLang, setLocales, t } from "translator-client";
import {
    CpuChipIcon,
    SparklesIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import locales from "../../locales/complete.json";

type Lang = "zh" | "en";

setLocales(locales);

const getInitialLang = (): Lang => {
    if (typeof navigator === "undefined") {
        return "zh";
    }

    const language = navigator.languages?.[0] ?? navigator.language ?? "zh";
    return language.toLowerCase().startsWith("en") ? "en" : "zh";
};

const initialLang = getInitialLang();
setLang(initialLang);

const LoadingScreen: FC<{ ready: boolean }> = ({ ready }) => (
    <div className={`agent-loader ${ready ? "fade-out" : ""}`} aria-hidden={ready}>
        <div className="loader-mark">
            <span className="loader-ring" />
            <span className="loader-ring loader-ring-offset" />
            <span className="loader-core">AI</span>
        </div>
        <p>{t("正在打开工作台")}</p>
    </div>
);

const PortraitSketch: FC = () => (
    <svg className="portrait-sketch" viewBox="0 0 260 260" role="img" aria-label={t("手绘头像")}>
        <path className="portrait-paper" d="M37 28 C86 10, 192 14, 224 41 C248 78, 243 195, 218 224 C177 253, 75 248, 36 221 C9 178, 14 63, 37 28 Z" />
        <path className="portrait-hair" d="M72 103 C87 52, 169 47, 188 105 C172 92, 139 88, 112 96 C94 101, 82 106, 72 103 Z" />
        <path className="portrait-face" d="M75 109 C84 78, 178 77, 188 109 C197 164, 166 205, 130 205 C94 205, 66 164, 75 109 Z" />
        <path className="portrait-glasses" d="M82 128 C98 117, 116 117, 126 129 M135 129 C145 117, 166 118, 178 129 M126 129 C130 132, 133 132, 135 129" />
        <path className="portrait-smile" d="M107 165 C121 177, 142 177, 156 164" />
        <path className="portrait-collar" d="M75 224 C94 202, 166 202, 187 224" />
        <text x="130" y="238">Ryan</text>
    </svg>
);

const AgentSketch: FC = () => (
    <figure className="agent-sketch" aria-label={t("AI Agent 工作流图")}>
        <svg className="sketch-map" viewBox="0 0 720 520" role="img">
            <title>{t("AI Agent 工作流图")}</title>
            <path className="sketch-paper-edge" d="M63 39 C169 22, 518 27, 642 49 C675 56, 684 437, 651 461 C531 493, 164 492, 70 466 C38 458, 34 61, 63 39 Z" />
            <path className="sketch-path sketch-path-main" d="M126 152 C196 95, 286 112, 333 166 S471 231, 565 171" />
            <path className="sketch-path sketch-path-return" d="M576 292 C486 365, 353 354, 295 292 S179 236, 112 306" />
            <path className="sketch-path sketch-path-loop" d="M348 214 C424 202, 450 276, 387 316 C333 350, 270 313, 286 262 C294 232, 316 219, 348 214 Z" />

            <g className="sketch-node prompt-node" transform="translate(79 103)">
                <path d="M9 12 C40 -5, 126 -2, 151 14 C164 36, 158 85, 144 103 C110 118, 41 116, 12 101 C-5 77, -3 34, 9 12 Z" />
                <text x="75" y="53">Prompt</text>
            </g>

            <g className="sketch-node plan-node" transform="translate(271 117)">
                <path d="M12 8 C46 -6, 126 1, 144 18 C161 44, 148 91, 126 103 C87 114, 34 110, 11 93 C-4 68, -3 27, 12 8 Z" />
                <text x="74" y="53">Plan</text>
            </g>

            <g className="sketch-node tool-node" transform="translate(499 113)">
                <path d="M13 11 C51 -3, 127 0, 148 18 C164 45, 155 91, 131 104 C95 116, 35 112, 12 94 C-5 69, -4 30, 13 11 Z" />
                <text x="76" y="53">Tools</text>
            </g>

            <g className="sketch-node memory-node" transform="translate(88 284)">
                <path d="M8 16 C44 -2, 128 0, 152 20 C164 48, 153 91, 129 106 C87 118, 35 112, 11 95 C-5 68, -4 32, 8 16 Z" />
                <text x="78" y="55">Memory</text>
            </g>

            <g className="sketch-node review-node" transform="translate(292 294)">
                <path d="M11 10 C42 -5, 124 -1, 148 18 C165 44, 153 92, 129 105 C93 119, 36 112, 12 94 C-5 70, -3 28, 11 10 Z" />
                <text x="76" y="55">Review</text>
            </g>

            <g className="sketch-node ship-node" transform="translate(514 284)">
                <path d="M12 13 C43 -3, 124 -2, 148 17 C164 44, 153 92, 130 104 C93 117, 36 113, 12 95 C-4 68, -4 31, 12 13 Z" />
                <text x="76" y="55">Ship</text>
            </g>

            <path className="sketch-arrow" d="M607 218 C626 235, 632 262, 613 282" />
            <path className="sketch-arrow-head" d="M604 276 L614 285 L622 273" />
            <path className="sketch-arrow" d="M208 336 C232 382, 312 394, 359 356" />
            <path className="sketch-arrow-head" d="M350 356 L363 353 L358 367" />
            <text className="sketch-note sketch-note-top" x="421" y="80">{t("small loops, clear state")}</text>
            <path className="sketch-note-line" d="M447 89 C438 107, 427 119, 408 132" />
            <text className="sketch-note sketch-note-bottom" x="214" y="438">{t("human check")}</text>
            <path className="sketch-note-line" d="M293 417 C315 392, 326 373, 339 348" />
        </svg>
    </figure>
);

const HomePage: FC = () => {
    const [lang, setCurrentLang] = useState<Lang>(initialLang);
    const [isLoading, setIsLoading] = useState(true);

    const focusItems = [
        {
            icon: SparklesIcon,
            title: t("AI Agent 体验"),
            description: t("把复杂能力拆成清晰步骤，让用户知道 Agent 正在想什么、做到哪一步。"),
        },
        {
            icon: WrenchScrewdriverIcon,
            title: t("工具编排"),
            description: t("连接 API、脚本、浏览器和文档系统，让重复劳动变成可复用流程。"),
        },
        {
            icon: CpuChipIcon,
            title: t("人机协作"),
            description: t("在关键节点保留确认、回退和审计，让自动化更稳、更可控。"),
        },
    ];

    useEffect(() => {
        const timer = window.setTimeout(() => setIsLoading(false), 850);
        return () => window.clearTimeout(timer);
    }, []);

    const toggleLang = () => {
        setCurrentLang((previous) => {
            const nextLang = previous === "zh" ? "en" : "zh";
            setLang(nextLang);
            return nextLang;
        });
    };

    return (
        <>
            {isLoading && <LoadingScreen ready={!isLoading} />}

            <div className={`agent-page ${!isLoading ? "ready" : ""}`}>
                <div className="agent-shell heti">
                    <nav className="agent-nav" aria-label="Page language">
                        <span className="brand-mark">
                            <span className="brand-dot" />
                            Ryan
                        </span>
                        <button className="language-switch" type="button" onClick={toggleLang} aria-label="Toggle language">
                            <span className={lang === "en" ? "active" : ""}>EN</span>
                            <span className={lang === "zh" ? "active" : ""}>ZH</span>
                        </button>
                    </nav>

                    <header className="hero-grid">
                        <section className="hero-copy">
                            <p className="eyebrow">{t("AI Agent 工作者")}</p>
                            <h1>Hello, I'm Ryan</h1>
                            <p className="hero-title">{t("AI Agent 构建者与工作流设计者")}</p>
                            <p className="hero-subtitle">
                                {t("把模型、工具、记忆和人类反馈接成能稳定交付的工作流。")}
                            </p>
                        </section>

                        <aside className="portrait-card" aria-label={t("手绘头像")}>
                            <PortraitSketch />
                            <p>{t("从想法到行动的 Agent 工作流")}</p>
                        </aside>
                    </header>

                    <main className="agent-content">
                        <section className="about-panel">
                            <p className="section-kicker">{t("关于我")}</p>
                            <div className="about-copy">
                                <p>{t("我现在把主要精力放在 AI Agent：把大模型能力、工具调用、上下文记忆和人工确认编排成可靠流程。")}</p>
                                <p>{t("我更关心 Agent 能不能被理解、被验证、被放心交给真实任务，而不只是一次漂亮的演示。")}</p>
                            </div>
                        </section>

                        <section className="focus-panel">
                            <p className="section-kicker">{t("Agent 方向")}</p>
                            <div className="focus-list">
                                {focusItems.map(({ icon: Icon, title, description }) => (
                                    <article className="focus-item" key={title}>
                                        <Icon aria-hidden="true" />
                                        <div>
                                            <h2>{title}</h2>
                                            <p>{description}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="sketch-panel">
                            <div>
                                <p className="section-kicker">{t("工作流")}</p>
                                <h2>{t("从想法到行动的 Agent 工作流")}</h2>
                            </div>
                            <AgentSketch />
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
};

export default HomePage;
